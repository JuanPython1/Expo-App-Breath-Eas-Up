import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, TextInput, Alert } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { doc, updateDoc, arrayUnion, getDoc } from 'firebase/firestore';
import { FIRESTORE_DB } from '../firebase/config';

const TablaRecordatorio = ({ recordatorio, actualizarDosisInicial, estadoReset, actualizarEstadoReset }) => {
    const [filas, setFilas] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [inputDosis, setInputDosis] = useState('');
    const [filaSeleccionada, setFilaSeleccionada] = useState(null);
    const [totalDosis, setTotalDosis] = useState(recordatorio.DosisInicial);
    const [nuevacantidadTotalTabla, setnuevacantidadTotalTabla] = useState(0);
    const [isInputEmpty, setIsInputEmpty] = useState(true);
    const [diaSeleccionado, setDiaSeleccionado] = useState(null);
    const [isButtonEnabled, setIsButtonEnabled] = useState(false);
    const [dosisRegistradaHoy, setDosisRegistradaHoy] = useState(false);
    const [puedeEditar, setPuedeEditar] = useState(false);

    const hora = recordatorio.horaDosisDiaria;

    useEffect(() => {
        const cargarDatosIniciales = async () => {
            const RecordatorioRef = doc(FIRESTORE_DB, 'RecordatoriosDosis', recordatorio.id);
            const docSnap = await getDoc(RecordatorioRef);
            if (docSnap.exists()) {
                const data = docSnap.data();
                if (data.registroDosis) {
                    setFilas(data.registroDosis);
                    const today = new Date();
                    const formattedDate = `${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()}`;
                    const registroHoy = data.registroDosis.find(item => item.fecha === formattedDate);
                    if (registroHoy) {
                        setDosisRegistradaHoy(true);
                    }
                    const lastEntry = data.registroDosis[data.registroDosis.length - 1];
                    setDiaSeleccionado(lastEntry.fecha);
                } else {
                    setFilas([{ dia: 1, dosis: recordatorio.DosisInicial, fecha: `${new Date().getDate()}-${new Date().getMonth() + 1}-${new Date().getFullYear()}` }]);
                    await updateDoc(RecordatorioRef, {
                        registroDosis: [{ dia: 1, dosis: recordatorio.DosisInicial, fecha: `${new Date().getDate()}-${new Date().getMonth() + 1}-${new Date().getFullYear()}` }]
                    });
                }
                setTotalDosis(data.DosisInicial);
            } else {
                console.log('No such document!');
            }
        };

        cargarDatosIniciales();
    }, [recordatorio.id]);

    useEffect(() => {
        const interval = setInterval(() => {
            const today = new Date();
            const formattedDate = `${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()}`;

            const lastDateArray = diaSeleccionado ? diaSeleccionado.split('-') : [];
            const lastDate = lastDateArray.length === 3 ? new Date(lastDateArray[2], lastDateArray[1] - 1, lastDateArray[0]) : new Date();
            const timeDifference = today.getTime() - lastDate.getTime();
            const dayDifference = Math.floor(timeDifference / (1000 * 3600 * 24));

            if (dayDifference >= 1 && !dosisRegistradaHoy) {
                setIsButtonEnabled(true);
                setPuedeEditar(true);
            } else {
                setIsButtonEnabled(false);
                setPuedeEditar(false);
                const registroHoy = filas.find(item => item.fecha === formattedDate);
                if (registroHoy) {
                    setDosisRegistradaHoy(true);
                } else {
                    setDosisRegistradaHoy(false);
                }
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [hora, filas, diaSeleccionado, dosisRegistradaHoy]);

    const resetearTabla = async () => {
        const nuevasFilas = [{ dia: 1, dosis: 0 }];
        let nuevaDosisTotal = 0;

        setFilas(nuevasFilas);
        setTotalDosis(nuevaDosisTotal);
        setnuevacantidadTotalTabla(nuevaDosisTotal);
        actualizarDosisInicial(nuevaDosisTotal);

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
                    if (oldDosis === 0) {  // Verificar que la dosis actual sea 0
                        const diferenciaDosis = newDosis - oldDosis;
                        const nuevaDosisTotal = totalDosis + diferenciaDosis;

                        if (nuevaDosisTotal <= DOSE_LIMIT) {
                            const nuevasFilas = [...filas];
                            nuevasFilas[filaSeleccionada].dosis = newDosis;
                            nuevasFilas[filaSeleccionada].fecha = `${new Date().getDate()}-${new Date().getMonth() + 1}-${new Date().getFullYear()}`;

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
                        Alert.alert('Error', 'No se puede cambiar una dosis ya agregada');
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
        const today = new Date();
        const formattedDate = `${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()}`;

        const ultimaFila = filas[filas.length - 1];
        const lastDateArray = ultimaFila.fecha.split('-');
        const lastDate = new Date(lastDateArray[2], lastDateArray[1] - 1, lastDateArray[0]);

        // Calcula la diferencia en días entre la fecha actual y la última fecha registrada
        const timeDifference = today.getTime() - lastDate.getTime();
        const dayDifference = Math.floor(timeDifference / (1000 * 3600 * 24));

        // Verifica si ha pasado al menos un día desde el último registro y no se ha registrado una dosis hoy
        if (dayDifference >= 1 && !dosisRegistradaHoy) {
            if (nuevacantidadTotalTabla < DOSE_LIMIT) {
                const nuevoDia = filas.length + 1;
                const nuevaFila = { dia: nuevoDia, dosis: 0, fecha: formattedDate };

                setFilas([...filas, nuevaFila]);

                const RecordatorioRef = doc(FIRESTORE_DB, 'RecordatoriosDosis', recordatorio.id);
                await updateDoc(RecordatorioRef, {
                    registroDosis: arrayUnion(nuevaFila)
                });
                setDiaSeleccionado(formattedDate);
            } else {
                Alert.alert('Error', 'La cantidad total ya alcanzó su límite, no puedes agregar más días :(');
            }
        } else {
            Alert.alert('Error', 'Solo puedes agregar una fila si ha pasado al menos un día desde el último registro y no se ha registrado una dosis hoy.');
        }
    };

    const handleEliminarUltimaFila = async () => {
        if (filas.length > 1) {
            const ultimaFila = filas[filas.length - 1];
            const nuevasFilas = filas.slice(0, -1);
            const nuevaDosisTotal = totalDosis - ultimaFila.dosis;

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
            Alert.alert('Error', 'No puedes eliminar todas las filas');
        }
    };

    const abrirModal = (index) => {
        setFilaSeleccionada(index);
        setInputDosis(filas[index].dosis.toString());
        setModalVisible(true);
    };

    const cerrarModal = () => {
        setModalVisible(false);
        setInputDosis('');
        setFilaSeleccionada(null);
    };

    const isToday = (date) => {
        const today = new Date();
        const [day, month, year] = date.split('-');
        return today.getDate() === parseInt(day) && (today.getMonth() + 1) === parseInt(month) && today.getFullYear() === parseInt(year);
    };

    return (
        <View>
            <View style={styles.tablaContainer}>
                <View style={styles.header}>
                    <Text style={styles.headerTitulo}>REGISTRO DE LA DOSIS DEL PACIENTE</Text>
                </View>
                <View style={styles.headerContainer}>
                    <Text style={[styles.headerText, styles.bordeDerecho]}>Día</Text>
                    <Text style={[styles.headerText, styles.bordeDerecho]}>Dosis</Text>
                    <Text style={styles.headerText}>Fecha</Text>
                </View>
                {filas.map((fila, index) => (
                    <TouchableOpacity
                        key={index}
                        style={[styles.filaContainer, fila.dosis > 0 && styles.filaAzulOscuro]}
                        onPress={() => fila.dosis === 0 && abrirModal(index)}
                        disabled={fila.dosis > 0}
                    >
                        <Text style={[styles.headerText, styles.bordeDerecho]}>{fila.dia}</Text>
                        <Text style={[styles.headerText, styles.bordeDerecho]}>{fila.dosis}</Text>
                        <Text style={[styles.headerText]}>{fila.fecha}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            <Modal visible={modalVisible} animationType="slide">
                <View style={styles.modalContainer}>
                    <Text style={styles.modalTitle}>Agregar Dosis</Text>
                    <TextInput
                        style={styles.modalInput}
                        keyboardType="numeric"
                        value={inputDosis}
                        onChangeText={text => {
                            setInputDosis(text);
                            setIsInputEmpty(text === '');
                        }}
                    />
                    <View style={styles.modalButtonContainer}>
                        <TouchableOpacity
                            style={[styles.modalButton, isInputEmpty && styles.modalButtonDisabled]}
                            onPress={handleAgregarDosis}
                            disabled={isInputEmpty}
                        >
                            <Text style={styles.modalButtonText}>Guardar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.modalButton} onPress={cerrarModal}>
                            <Text style={styles.modalButtonText}>Cancelar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            {filas.some(fila => fila.dosis > 1) && !puedeEditar && (
                <Text style={styles.errorText}>Te espero para que registres tu próxima dosis diaria o si no INHALIFE te recordará ;)</Text>
            )}

            <TouchableOpacity
                style={[styles.botonAgregar, { backgroundColor: puedeEditar ? 'blue' : 'grey' }]}
                onPress={handleAgregarFila}
                disabled={!puedeEditar}
            >
                <Text style={styles.textoBoton}>Siguiente Día</Text>
            </TouchableOpacity>
        </View>
    );
};


const styles = StyleSheet.create({
    tablaContainer: {
        borderWidth: 1,
        borderColor: 'black',
        margin: 10,
        marginTop: hp('4%')
    },
    header: {
        backgroundColor: 'lightgrey',
        borderBottomWidth: 1,
    },
    headerTitulo: {
        flex: 1,
        textAlign: 'center',
        fontFamily: 'noticia-text',
        padding: 10,
        fontSize: 14
    },
    headerContainer: {
        flexDirection: 'row',
        // backgroundColor: 'lightgrey',
    },
    headerText: {
        flex: 1,
        textAlign: 'center',
        fontFamily: 'noticia-text',
        padding: 10,
    },
    filaContainer: {
        flexDirection: 'row',
        borderTopWidth: 1,
        borderColor: 'black',

    },
    filaAzulOscuro: {
        backgroundColor: '#3498DB',
    },
    textoFila: {
        flex: 1,
        textAlign: 'center',
        padding: 10,
    },
    bordeDerecho: {
        borderRightWidth: 1,
        borderRightColor: 'black',
    },
    botonAgregar: {
        backgroundColor: 'blue',
        padding: 10,
        margin: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: hp('5.7%')
    },
    botonEliminar: {
        backgroundColor: 'red',
        padding: 10,
        margin: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    errorText: {
        color: 'red',
        textAlign: 'center',
        marginBottom: 10,
        fontFamily: 'Play-fair-Display',
    },
    textoBoton: {
        color: 'white',
        fontWeight: 'bold',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    modalInput: {
        width: '80%',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 10,
    },
    modalButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%',
    },
    modalButton: {
        flex: 1,
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#007BFF',
        marginHorizontal: 10,
        borderRadius: 5,
    },
    modalButtonDisabled: {
        backgroundColor: 'gray',
    },
    modalButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default TablaRecordatorio;
