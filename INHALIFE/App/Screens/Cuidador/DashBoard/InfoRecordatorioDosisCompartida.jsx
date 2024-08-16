import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, Image, ScrollView } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import AtributoRecordatorioDosis from '../../../components/AtributoRecordatorioDosis';
import TablaRecordatorioCompartido from '../../../components/TablaRecordatorioCompartido';
import AtributoPuffDosis from '../../../components/atributoPuffDosis';
import * as Notifications from 'expo-notifications'

import { useTranslation } from 'react-i18next';

const InfoRecordatorioDosisCompartida = ({ navigation, route }) => {
    const { recordatorio } = route.params;
    const [dosisBackgroundColor, setDosisBackgroundColor] = useState('#45EB1B'); // Color por defecto

    const { t } = useTranslation();

    useEffect(() => {
        // Calcular el color gradualmente
        let color;
        if (recordatorio.DosisInicial >= 0 && recordatorio.DosisInicial < recordatorio.Dosis80Porciento) {
            // Interpolar entre verde y amarillo desde 0 hasta el 80%
            const percent = recordatorio.DosisInicial / recordatorio.Dosis80Porciento;
            color = interpolateColor('#45EB1B', '#E7EB1B', percent);
        } else if (recordatorio.DosisInicial >= recordatorio.Dosis80Porciento && recordatorio.DosisInicial < recordatorio.TotalDosis) {
            // Interpolar entre amarillo y rojo entre el 80% y el 100%
            const percent = (recordatorio.DosisInicial - recordatorio.Dosis80Porciento) / (recordatorio.TotalDosis - recordatorio.Dosis80Porciento);
            color = interpolateColor('#E7EB1B', '#F94242', percent);
        } else {
            // Rojo cuando la dosis llega al 200%
            color = '#F94242';
        }
        setDosisBackgroundColor(color);
    }, [recordatorio.DosisInicial]);

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
                        TituloContenido={t("InfoRecordatorioCompartido.Medicamento")}
                        contenido={recordatorio.medicamento}
                        tamañoTitulo={7}
                        tamañoContenido={5}
                        colorFondo={'#7CDBFC'}
                    />

                    <View style={styles.dosisRow}>
                        <View style={styles.dosisItem}>
                            <AtributoPuffDosis
                                TituloContenido={t("InfoRecordatorioCompartido.DosisActual")}
                                contenido={recordatorio.DosisInicial} // Utilizando el estado dosisInicial
                                tamañoTitulo={4}
                                tamañoContenido={3}
                                colorFondo={dosisBackgroundColor} // Cambiado al color de fondo dinámico
                            />
                        </View>

                        <View style={styles.dosisItem}>
                            <AtributoPuffDosis
                                TituloContenido={t("InfoRecordatorioCompartido.80%")}
                                contenido={`${recordatorio.Dosis80Porciento} PUFF`}
                                tamañoTitulo={4}
                                tamañoContenido={3}
                                colorFondo={'#E7EB1B'}
                            />
                        </View>

                        <View style={styles.dosisItem}>
                            <AtributoPuffDosis
                                TituloContenido={t("InfoRecordatorioCompartido.TotalDosis")}
                                contenido={`${recordatorio.TotalDosis} PUFF`}
                                tamañoTitulo={4}
                                tamañoContenido={3}
                                colorFondo={'#F94242'}
                            />
                        </View>
                    </View>

                    <AtributoRecordatorioDosis
                        TituloContenido={t("InfoRecordatorioCompartido.HoraDosis")}
                        contenido={recordatorio.horaDosisDiaria}
                        tamañoTitulo={6}
                        tamañoContenido={4.5}
                        colorFondo={'#7CDBFC'}
                    />

                    <AtributoRecordatorioDosis
                        TituloContenido={t("InfoRecordatorioCompartido.Paciente")}
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
        marginBottom: hp('13.3%')
    }
});
