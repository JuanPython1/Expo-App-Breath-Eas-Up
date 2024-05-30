import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, Image, ScrollView } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import AtributoRecordatorioDosis from '../../../../Components/AtributoRecordatorioDosis';
import TablaRecordatorioCompartido from '../../../../Components/TablaRecordatorioCompartido';
import AtributoPuffDosis from '../../../../Components/atributoPuffDosis';
import * as Notifications from 'expo-notifications'

const InfoRecordatorioDosisCompartida = ({ navigation, route }) => {
    const { recordatorio } = route.params;





    return (
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Pressable style={styles.backContainer} onPress={() => { navigation.navigate('RecordatorioDosisCompartidos') }}>
                        <Image style={styles.backIcon} source={require('../../../../assets/Image/Flechaatras.png')} />
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
                                contenido={recordatorio.DosisInicial} // Utilizando el estado dosisInicial
                                tamañoTitulo={4}
                                tamañoContenido={3}
                                colorFondo={'#45EB1B'}
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
                        TituloContenido={'PACIENTE'}
                        contenido={recordatorio.nombreUsuario}
                        tamañoTitulo={6}
                        tamañoContenido={4.5}
                        colorFondo={'#7CDBFC'}
                    />
                    <View style={styles.contenedorTabla}>
                        <TablaRecordatorioCompartido recordatorio={recordatorio} />
                    </View>
                </View>
            </View>
        </ScrollView>
    );
};

export default InfoRecordatorioDosisCompartida;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#AADBFF',
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
        marginBottom: hp('6%')
    }
});
