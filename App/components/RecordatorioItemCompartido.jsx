import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Animated, Easing, Pressable } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/FontAwesome';

import { useTranslation } from 'react-i18next';

// Definición de estilos fuera del componente
const styles = StyleSheet.create({
    contenedorItemRecordatorio: {
        flexDirection: 'row',
        height: hp('15%'),
        marginHorizontal: wp('10%'),
        marginBottom: hp('5%'),
        borderRadius: 10,
        backgroundColor: '#F0F0F0', // Cambio de color a un tono más sobrio
        borderWidth: 1, // Añadir borde
        borderColor: '#E0E0E0', // Color del borde
        paddingHorizontal: wp('3%'), // Espaciado interno
        alignItems: 'center', // Alinear elementos verticalmente
    },
    Contenedor: {
        width: '100%',
        height: '100%',
        borderTopStartRadius: 10,
        borderBottomStartRadius: 10,
    },
    letrasSuperior: {
        height: '45%',
        padding: '2%',
        borderTopStartRadius: 10,
        overflow: 'hidden',
        justifyContent: 'center',
    },
    letrasMedio: {
        height: '25%',
        justifyContent: 'center',
        paddingHorizontal: '2%',
        borderBottomWidth: 1, // Añadir línea divisoria inferior
        borderColor: '#CCCCCC', // Color de la línea divisoria
    },
    nombrePacienteTexto: {
        fontSize: wp('4.5%'),
        color: '#666666', // Cambiar color de texto
    },
    letrasInferior: {
        flexDirection: 'row',
        height: '30%',
        borderBottomStartRadius: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: '2%',
    },
    nombreMedicamento: {
        fontSize: wp('6%'),
        whiteSpace: 'nowrap', // Evita que el texto salte de línea
    },
    hora: {
        fontSize: wp('4.5%'),
        color: '#666666', // Cambiar color de texto
    },
    dosis: {
        fontSize: wp('4.5%'),
        color: '#666666', // Cambiar color de texto
    },
});

const RecordatorioItemCompartido = ({ recordatorioCompartido, funcionNav }) => {
    const scrollX = useRef(new Animated.Value(0)).current;
    const [textWidth, setTextWidth] = useState(0);
    const [containerWidth, setContainerWidth] = useState(0);

    const { t } = useTranslation();

    useEffect(() => {
        const animation = Animated.loop(
            Animated.sequence([
                Animated.delay(5000), // Espera 5 segundos
                Animated.timing(scrollX, {
                    toValue: 1,
                    duration: 2000,
                    easing: Easing.linear,
                    useNativeDriver: true,
                }),
                Animated.timing(scrollX, {
                    toValue: 2,
                    duration: 0,
                    easing: Easing.linear,
                    useNativeDriver: true,
                }),
                Animated.timing(scrollX, {
                    toValue: 3,
                    duration: 0,
                    easing: Easing.linear,
                    useNativeDriver: true,
                }),
                Animated.timing(scrollX, {
                    toValue: 4,
                    duration: 2000,
                    easing: Easing.linear,
                    useNativeDriver: true,
                }),
            ])
        );
        animation.start();
        return () => animation.stop(); // Detener la animación si el componente se desmonta
    }, [scrollX]);

    const handleTextLayout = (event) => {
        const { width } = event.nativeEvent.layout;
        setTextWidth(width);
    };

    const handleContainerLayout = (event) => {
        const { width } = event.nativeEvent.layout;
        setContainerWidth(width);
    };

    const translateX = scrollX.interpolate({
        inputRange: [0, 1, 2, 4],
        outputRange: [textWidth * 0, -textWidth, textWidth * 2.2, textWidth * 0],
    });

    return (
        <View style={styles.contenedorItemRecordatorio}>
            <Pressable style={styles.Contenedor} onPress={funcionNav} onLayout={handleContainerLayout}>
                <View style={styles.letrasSuperior}>
                    <Animated.Text
                        style={[styles.nombreMedicamento, { transform: [{ translateX }] }]}
                        onLayout={handleTextLayout}
                    >
                        {recordatorioCompartido.medicamento}
                    </Animated.Text>
                </View>

                <View style={styles.letrasMedio}>
                    <Text style={styles.nombrePacienteTexto}>{t("RecordatoriosCuidador.Paciente")} {recordatorioCompartido.nombreUsuario}</Text>
                </View>

                <View style={styles.letrasInferior}>
                    <Text style={styles.hora}>{recordatorioCompartido.horaDosisDiaria}</Text>
                    <Text style={styles.dosis}>{recordatorioCompartido.DosisInicial}% - {recordatorioCompartido.TotalDosis}%</Text>
                </View>
            </Pressable>
        </View>
    );
};

export default RecordatorioItemCompartido;
