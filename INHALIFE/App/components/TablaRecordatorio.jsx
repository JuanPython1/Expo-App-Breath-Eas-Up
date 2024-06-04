import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, TextInput, Button, Alert } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { FIRESTORE_DB } from '../firebase/config';
import { doc, updateDoc, arrayUnion, getDoc } from 'firebase/firestore';

const TablaRecordatorio = ({ recordatorio, actualizarDosisInicial, estadoReset, actualizarEstadoReset }) => {
    const [filas, setFilas] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [inputDosis, setInputDosis] = useState('');
    const [filaSeleccionada, setFilaSeleccionada] = useState(null);
    const [totalDosis, setTotalDosis] = useState(recordatorio.DosisInicial);
    const [nuevacantidadTotalTabla, setnuevacantidadTotalTabla] = useState(0);
    const [isInputEmpty, setIsInputEmpty] = useState(true);
    const [diaSeleccionado, setDiaSeleccionado] = useState(null);

    useEffect(() => {
        const cargarDatosIniciales = async () => {
            const RecordatorioRef = doc(FIRESTORE_DB, 'RecordatoriosDosis', recordatorio.id);
            const docSnap = await getDoc(RecordatorioRef);
            if (docSnap.exists()) {
                const data = docSnap.data();
                if (data.registroDosis) {
                    setFilas(data.registroDosis);
                } else {
                    setFilas([{ dia: 1, dosis: recordatorio.DosisInicial }]);
                    await updateDoc(RecordatorioRef, {
                        registroDosis: [{ dia: 1, dosis: recordatorio.DosisInicial }]
                    });
                }
                setTotalDosis(data.DosisInicial);
            } else {
                console.log('No such document!');
            }
        };

        cargarDatosIniciales();
    }, [recordatorio.id]);

    const resetearTabla = async () => {
        // Mantén la primera fila y reinicia su dosis a 0
        const nuevasFilas = [{ dia: 1, dosis: 0 }];
        let nuevaDosisTotal = 0;

        // Actualiza el estado local
        setFilas(nuevasFilas);
        setTotalDosis(nuevaDosisTotal);
        setnuevacantidadTotalTabla(nuevaDosisTotal);
        actualizarDosisInicial(nuevaDosisTotal);

        // Actualiza en Firestore
        const RecordatorioRef = doc(FIRESTORE_DB, 'RecordatoriosDosis', recordatorio.id);
        await updateDoc(RecordatorioRef, {
            registroDosis: nuevasFilas,
            DosisInicial: nuevaDosisTotal
        });
    };


    useEffect(() => {
        if (estadoReset) {
            resetearTabla();
            actualizarEstadoReset(false);
        }
    }, [estadoReset]);

    const DOSE_LIMIT = recordatorio.TotalDosis;

    const handleAgregarDosis = async () => {
        if (inputDosis !== '') {
            const newDosis = parseInt(inputDosis);
            if (filaSeleccionada !== null && filas[filaSeleccionada]) {
                const oldDosis = filas[filaSeleccionada].dosis;

                if (newDosis >= 0) {
                    const diferenciaDosis = newDosis - oldDosis;
                    const nuevaDosisTotal = totalDosis + diferenciaDosis;

                    if (nuevaDosisTotal <= DOSE_LIMIT) {
                        const nuevasFilas = [...filas];
                        nuevasFilas[filaSeleccionada].dosis = newDosis;
                        setFilas(nuevasFilas);

                        setTotalDosis(nuevaDosisTotal);

                        const RecordatorioRef = doc(FIRESTORE_DB, 'RecordatoriosDosis', recordatorio.id);
                        await updateDoc(RecordatorioRef, {
                            DosisInicial: nuevaDosisTotal,
                            registroDosis: nuevasFilas
                        });

                        setModalVisible(false);
                        setInputDosis('');

                        actualizarDosisInicial(nuevaDosisTotal);
                        setnuevacantidadTotalTabla(nuevaDosisTotal);
                    } else {
                        Alert.alert('Error', `La suma total de dosis no puede exceder ${DOSE_LIMIT}`);
                    }
                } else {
                    Alert.alert('Error', 'La dosis no puede ser negativa');
                }
            } else {
                Alert.alert('Error', 'Error seleccionando la fila');
            }
        } else {
            Alert.alert('Error', 'Por favor ingresa una dosis válida');
        }
    };

    const handleAgregarFila = async () => {
        if (nuevacantidadTotalTabla < DOSE_LIMIT) {
            const nuevoDia = filas.length + 1;
            const nuevaFila = { dia: nuevoDia, dosis: 0 };

            setFilas([...filas, nuevaFila]);

            const RecordatorioRef = doc(FIRESTORE_DB, 'RecordatoriosDosis', recordatorio.id);
            await updateDoc(RecordatorioRef, {
                registroDosis: arrayUnion(nuevaFila)
            });
        } else {
            Alert.alert('Error', 'La cantidad total ya alcanzó su límite, no puedes agregar más días :(');
        }
    };

    const handleEliminarUltimaFila = async () => {
        if (filas.length > 1) {
            const nuevasFilas = filas.slice(0, -1);
            const ultimaDosis = filas[filas.length - 1].dosis;
            const nuevaDosisTotal = totalDosis - ultimaDosis;

            setFilas(nuevasFilas);
            setTotalDosis(nuevaDosisTotal);
            setnuevacantidadTotalTabla(nuevaDosisTotal);
            actualizarDosisInicial(nuevaDosisTotal);

            const RecordatorioRef = doc(FIRESTORE_DB, 'RecordatoriosDosis', recordatorio.id);
            await updateDoc(RecordatorioRef, {
                registroDosis: nuevasFilas,
                DosisInicial: nuevaDosisTotal
            });
        } else {
            Alert.alert('Error', 'No se puede eliminar la última fila');
        }
    };

    const handleCancelar = () => {
        setModalVisible(false);
        setInputDosis('');
    };

    useEffect(() => {
        setIsInputEmpty(inputDosis.trim() === '');
    }, [inputDosis]);

    const hasZeroDosis = filas.some(fila => fila.dosis === 0);

    return (
        <View style={styles.tabla}>
            <View style={styles.fila}>
                <View style={styles.celdaTitulo}>
                    <Text style={styles.textoTitulo}>REGISTRO DIAS</Text>
                </View>
            </View>
            <View style={styles.fila}>
                <View style={styles.celda}>
                    <Text style={styles.textoCeldaDias}>DIAS</Text>
                </View>
                <View style={styles.celda}>
                    <Text style={styles.textoCeldaCantidad}>CANTIDAD DOSIS</Text>
                </View>
            </View>

            {filas.map((fila, index) => (
                <View key={index} style={styles.fila}>
                    <View style={styles.celda}>
                        <Text style={styles.textoCelda}>{fila.dia}</Text>
                    </View>
                    <View style={styles.celda}>
                        <TouchableOpacity
                            onPress={() => {
                                setFilaSeleccionada(index);
                                setDiaSeleccionado(fila.dia);
                                setModalVisible(true);
                            }}
                            style={styles.boton}
                            accessibilityLabel="Editar dosis"
                            accessibilityRole="button"
                        >
                            <Text style={styles.textoBoton}>{fila.dosis} PUFF</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            ))}

            <View style={styles.botonContainer}>
                <Button title="Siguiente Día" onPress={handleAgregarFila} disabled={hasZeroDosis} />
            </View>
            <View style={styles.botonContainer}>
                <Button title="Eliminar Último Día" onPress={handleEliminarUltimaFila} />
            </View>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text>{filaSeleccionada !== null && filas[filaSeleccionada]?.dosis === 0 ? "AGREGAR" : "ACTUALIZAR"} TU DOSIS DEL DIA {diaSeleccionado}</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={text => setInputDosis(text)}
                            value={inputDosis}
                            keyboardType="numeric"
                            maxLength={3}
                            accessibilityLabel="Input de dosis"
                        />
                        <View style={styles.botonContainerModal}>
                            <Button
                                title={filaSeleccionada !== null && filas[filaSeleccionada]?.dosis === 0 ? "Agregar" : "Actualizar"}
                                onPress={handleAgregarDosis}
                            />
                            <View style={styles.margin} />
                            <Button title="Cancelar" onPress={handleCancelar} color="#FF6347" />
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    tabla: {
        marginHorizontal: wp('5%'),
        borderWidth: 1,
        borderColor: '#000',
        flexDirection: 'column',
        marginTop: hp('2%'),
        backgroundColor: '#7CDBFC'
    },
    fila: {
        flexDirection: 'row',
    },
    celdaTitulo: {
        borderWidth: 1,
        backgroundColor: '#C8EFFC',
        borderColor: '#000',
        flex: 1,
        padding: 10,
    },
    celda: {
        borderWidth: 1,
        borderColor: '#000',
        flex: 1,
        padding: 10,
        justifyContent: 'center'
    },
    textoCeldaDias: {
        textAlign: 'center',
        fontSize: wp('4%'),
        fontFamily: 'noticia-text'
    },
    textoCeldaCantidad: {
        textAlign: 'center',
        fontSize: wp('4%'),
        fontFamily: 'noticia-text'
    },
    textoTitulo: {
        textAlign: 'center',
        fontSize: wp('5%'),
        fontFamily: 'noticia-text'
    },
    textoCelda: {
        textAlign: 'center',
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        margin: 20
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    input: {
        height: 40,
        width: 200,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
    boton: {
        backgroundColor: '#3498DB',
        padding: 10,
        borderRadius: 5,
    },
    textoBoton: {
        color: '#fff',
        textAlign: 'center',
    },
    botonContainer: {
        borderWidth: 1,
        borderColor: '#000',
        flex: 1,
        padding: 10,
        paddingHorizontal: '25%'
    },
    botonContainerModal: {
        flexDirection: 'row',
        marginTop: 15,
    },
    margin: {
        width: 10,
    },
});

export default TablaRecordatorio;
