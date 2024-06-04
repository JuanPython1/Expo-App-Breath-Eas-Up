import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, Image, ScrollView, Modal, TouchableOpacity } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import AtributoRecordatorioDosis from '../../../../components/AtributoRecordatorioDosis';
import TablaRecordatorio from '../../../../components/TablaRecordatorio';
import AtributoPuffDosis from '../../../../components/atributoPuffDosis';
import * as Notifications from 'expo-notifications';
import { deleteDoc, doc, getDoc, updateDoc } from 'firebase/firestore';
import * as Notificaciones from 'expo-notifications';
import { FIRESTORE_DB } from '../../../../firebase/config';

const InfoRecordatorioDosisPaciente = ({ navigation, route }) => {
    const { recordatorio } = route.params;
    const [dosisInicial, setDosisInicial] = useState(recordatorio.DosisInicial);
    const [notificacionEnviada80, setNotificacionEnviada80] = useState(false);
    const [notificacionEnviadaTotal, setNotificacionEnviadaTotal] = useState(false);
    const [dosisBackgroundColor, setDosisBackgroundColor] = useState('#45EB1B'); // Color por defecto
    const [mostrarModal, setMostrarModal] = useState(false);
    const [estadoReset, setEstadoReset] = useState(false);

    const actualizarDosisInicial = (nuevaDosis) => {
        setDosisInicial(nuevaDosis);
    };

    const actualizarEstadoReset = (nuevaEstado) => {
        setEstadoReset(nuevaEstado);
    };




    useEffect(() => {
        if (!notificacionEnviada80 && dosisInicial >= recordatorio.Dosis80Porciento && dosisInicial < recordatorio.TotalDosis) {
            sendNotification('¡Recarga tu dosis!', `${recordatorio.nombreUsuario}, ya pasaste al 80% de tu cantidad de dosis. ¡Recargarlo lo antes posible!`);
            setNotificacionEnviada80(true);
        } else if (!notificacionEnviadaTotal && dosisInicial >= recordatorio.TotalDosis) {
            sendNotification('¡Llegaste a tu dosis total!', `${recordatorio.nombreUsuario}, llegaste a tu dosis total, ¡Recarga ya mismo!`);
            setNotificacionEnviadaTotal(true);
            setNotificacionEnviada80(false); // Resetear la notificación del 80% si llega al total
        }

        // Calcular el color gradualmente
        let color;
        if (dosisInicial >= 0 && dosisInicial < recordatorio.Dosis80Porciento) {
            // Interpolar entre verde y amarillo desde 0 hasta el 80%
            const percent = dosisInicial / recordatorio.Dosis80Porciento;
            color = interpolateColor('#45EB1B', '#E7EB1B', percent);
        } else if (dosisInicial >= recordatorio.Dosis80Porciento && dosisInicial < recordatorio.TotalDosis) {
            // Interpolar entre amarillo y rojo entre el 80% y el 100%
            const percent = (dosisInicial - recordatorio.Dosis80Porciento) / (recordatorio.TotalDosis - recordatorio.Dosis80Porciento);
            color = interpolateColor('#E7EB1B', '#F94242', percent);
        } else {
            // Rojo cuando la dosis llega al 100%
            color = '#F94242';
        }
        setDosisBackgroundColor(color);
    }, [dosisInicial]);

    const sendNotification = async (title, body) => {
        await Notifications.scheduleNotificationAsync({
            content: {
                title,
                body,
            },
            trigger: null, // enviar inmediatamente
        });
    };

    // Función para interpolar entre dos colores
    const interpolateColor = (color1, color2, percent) => {
        const color1Value = parseInt(color1.slice(1), 16);
        const color2Value = parseInt(color2.slice(1), 16);

        const r1 = (color1Value >> 16) & 255;
        const g1 = (color1Value >> 8) & 255;
        const b1 = color1Value & 255;

        const r2 = (color2Value >> 16) & 255;
        const g2 = (color2Value >> 8) & 255;
        const b2 = color2Value & 255;

        const r = Math.round(r1 + (r2 - r1) * percent);
        const g = Math.round(g1 + (g2 - g1) * percent);
        const b = Math.round(b1 + (b2 - b1) * percent);

        return `rgb(${r},${g},${b})`;
    };

    const handleReiniciar = async () => {
        setMostrarModal(false);
        setEstadoReset(true);
    };

    const eliminarRecordatorio = async (id) => {
        try {
            const RecordatorioRef = doc(FIRESTORE_DB, 'RecordatoriosDosis', id);
            const RecordatorioDoc = await getDoc(RecordatorioRef);
            if (RecordatorioDoc.exists()) {
                const recordatorioData = RecordatorioDoc.data();
                const notificationId = recordatorioData.notificationId;

                // Cancelar la notificación
                if (notificationId) {
                    await Notificaciones.cancelScheduledNotificationAsync(notificationId);
                }

                // Eliminar el documento de la base de datos
                await deleteDoc(RecordatorioRef);

                // Redirigir a la pantalla anterior
                navigation.goBack();
            } else {
                console.log('El recordatorio no existe.');
            }
        } catch (error) {
            console.error('Error al eliminar el recordatorio:', error);
        }
    };

    const handleEliminar = () => {
        eliminarRecordatorio(recordatorio.id);
        setMostrarModal(false);
    };


    useEffect(() => {
        if (dosisInicial === 200) {
            setMostrarModal(true);
        }
    }, [dosisInicial]);


    return (
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
            <View style={styles.container}>

                <Modal
                    visible={mostrarModal}
                    transparent={true}
                    animationType="fade"
                    onRequestClose={() => setMostrarModal(false)}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalText}>
                                Llegaste a tu límite de medicación. ¿Quieres reiniciar o eliminar el recordatorio?
                            </Text>
                            <View style={styles.modalButtons}>
                                <TouchableOpacity style={styles.modalButtonRojo} onPress={handleEliminar}>
                                    <Text style={styles.modalButtonText}>Eliminar</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.modalButton} onPress={handleReiniciar}>
                                    <Text style={styles.modalButtonText}>Reiniciar</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>


                <View style={styles.header}>
                    <Pressable style={styles.backContainer} onPress={() => { navigation.navigate('RecordatorioDosis') }}>
                        <Image style={styles.backIcon} source={require('../../../../../assets/Image/Flechaatras.png')} />
                    </Pressable>
                </View>

                <View style={styles.body}>

                    <AtributoRecordatorioDosis
                        TituloContenido={'MEDICAMENTO'}
                        contenido={recordatorio.medicamento}
                        tamañoTitulo={7}
                        tamañoContenido={5}
                        colorFondo={'#7CDBFC'}
                    />

                    <View style={styles.dosisRow}>
                        <View style={styles.dosisItem}>
                            <AtributoPuffDosis
                                TituloContenido={'DOSIS ACTUAL'}
                                contenido={dosisInicial} // Utilizando el estado dosisInicial
                                tamañoTitulo={4}
                                tamañoContenido={3}
                                colorFondo={dosisBackgroundColor} // Cambiado al color de fondo dinámico
                            />
                        </View>

                        <View style={styles.dosisItem}>
                            <AtributoPuffDosis
                                TituloContenido={'80%'}
                                contenido={`${recordatorio.Dosis80Porciento} PUFF`}
                                tamañoTitulo={4}
                                tamañoContenido={3}
                                colorFondo={'#E7EB1B'}
                            />
                        </View>

                        <View style={styles.dosisItem}>
                            <AtributoPuffDosis
                                TituloContenido={'TOTAL DOSIS'}
                                contenido={`${recordatorio.TotalDosis} PUFF`}
                                tamañoTitulo={4}
                                tamañoContenido={3}
                                colorFondo={'#F94242'}
                            />
                        </View>
                    </View>

                    <AtributoRecordatorioDosis
                        TituloContenido={'HORA DIARIA DOSIS'}
                        contenido={recordatorio.horaDosisDiaria}
                        tamañoTitulo={6}
                        tamañoContenido={4.5}
                        colorFondo={'#7CDBFC'}
                    />

                    <AtributoRecordatorioDosis
                        TituloContenido={'CUIDADOR'}
                        contenido={recordatorio.cuidadorNombre}
                        tamañoTitulo={6}
                        tamañoContenido={4.5}
                        colorFondo={'#7CDBFC'}
                    />
                    <View style={styles.contenedorTabla}>
                        <TablaRecordatorio
                            recordatorio={recordatorio}
                            actualizarDosisInicial={actualizarDosisInicial}
                            estadoReset={estadoReset}
                            actualizarEstadoReset={actualizarEstadoReset}
                        />
                    </View>
                </View>
            </View>
        </ScrollView>
    );
};

export default InfoRecordatorioDosisPaciente;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#94E4FF',
    },
    header: {
        height: hp('10%'),
        backgroundColor: '#3498DB',
        justifyContent: 'center'
    },
    backContainer: {
        left: wp('5%'),
        height: hp('5%'),
        width: wp('15%'),
        justifyContent: 'center',
    },
    backIcon: {
        width: wp('10%'),
        height: hp('2.5%'),
    },
    body: {
        paddingHorizontal: wp('5%')
    },
    dosisRow: {
        backgroundColor: '#7CDBFC',
        flexDirection: 'row',
        alignSelf: 'center',
        paddingHorizontal: wp('10%'),
        marginTop: hp('1%')
    },
    dosisItem: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    dosisText: {
        fontSize: wp('4%')
    },
    contenedorTabla: {
        marginBottom: hp('3.6%')
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: wp('80%'),
        padding: hp('2%'),
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
    },
    modalText: {
        fontSize: hp('2.5%'),
        marginBottom: hp('2%'),
        textAlign: 'center',
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    modalButton: {
        width: '45%',
        padding: hp('1%'),
        backgroundColor: '#3498DB',
        borderRadius: 5,
        alignItems: 'center',
    },
    modalButtonRojo: {
        width: '45%',
        padding: hp('1%'),
        backgroundColor: 'red',
        borderRadius: 5,
        alignItems: 'center',
    },
    modalButtonText: {
        color: 'white',
        fontSize: hp('2%'),
    },

});
