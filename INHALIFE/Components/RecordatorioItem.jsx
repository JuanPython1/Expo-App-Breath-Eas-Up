import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Animated, Easing, Pressable } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/FontAwesome';

const RecordatorioItem = ({ colorFondo, recordatorio, onEliminarRecordatorio, funcionNav }) => {
    const scrollX = useRef(new Animated.Value(0)).current;
    const [textWidth, setTextWidth] = useState(0);
    const [containerWidth, setContainerWidth] = useState(0);

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

    // Helper function to format time to HH:mm AM/PM
    const formatTime = (timeString) => {
        const [hours, minutes] = timeString.split(':');
        let hour = parseInt(hours, 10);

        hour = hour % 12;
        hour = hour ? hour : 12; // the hour '0' should be '12'
        return `${hour}:${minutes} `;
    };

    const styles = StyleSheet.create({
        contenedorItemRecordatorio: {
            flexDirection: 'row',
            height: hp('13%'),
            marginHorizontal: wp('10%'),
            marginBottom: hp('5%'),
            borderRadius: 10,
            backgroundColor: '#F0F0F0', // Cambio de color a un tono más sobrio
            borderWidth: 1, // Añadir borde
            borderColor: '#E0E0E0', // Color del borde
            paddingHorizontal: wp('3%'), // Espaciado interno
            alignItems: 'center', // Alinear elementos verticalmente
        },
        ContenedorIzq: {
            flex: 1, // Expandir el contenido
        },
        letrasSuperior: {
            paddingVertical: hp('1%'), // Ajustar espaciado superior e inferior
            borderBottomWidth: 1, // Añadir línea divisoria inferior
            borderColor: '#CCCCCC', // Color de la línea divisoria
            overflow: 'hidden',
        },
        letrasInferior: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingVertical: hp('1%'), // Ajustar espaciado superior e inferior
        },
        ContenedorDer: {
            marginLeft: wp('3%'), // Añadir espacio a la izquierda
            borderLeftWidth: 1, // Añadir borde izquierdo
            borderColor: '#CCCCCC', // Color del borde izquierdo
            paddingHorizontal: wp('3%'), // Espaciado interno
        },
        nombreMedicamento: {
            fontSize: wp('5%'),
            whiteSpace: 'nowrap',
        },
        hora: {
            fontSize: wp('4%'), // Reducir tamaño de fuente
            color: '#666666', // Cambiar color de texto
        },
        dosis: {
            fontSize: wp('4%'), // Reducir tamaño de fuente
            color: '#666666', // Cambiar color de texto
        },
        iconoBasura: {
            color: 'red',
            fontSize: wp('6%'), // Ajustar tamaño de icono
        }
    });

    return (
        <View style={styles.contenedorItemRecordatorio}>
            <Pressable style={styles.ContenedorIzq} onPress={funcionNav} onLayout={handleContainerLayout}>
                <View style={styles.letrasSuperior}>
                    <Animated.Text
                        style={[styles.nombreMedicamento, { transform: [{ translateX }] }]}
                        onLayout={handleTextLayout}
                    >
                        {recordatorio.medicamento}
                    </Animated.Text>
                </View>
                <View style={styles.letrasInferior}>
                    <Text style={styles.hora}>{recordatorio.horaDosisDiaria}</Text>
                    <Text style={styles.dosis}>{recordatorio.DosisInicial} - {recordatorio.TotalDosis} PUFF</Text>
                </View>
            </Pressable>

            <Pressable style={styles.ContenedorDer} onLongPress={() => onEliminarRecordatorio(recordatorio.id)}>
                <Icon name="trash" style={styles.iconoBasura} />
            </Pressable>
        </View>
    );
};

export default RecordatorioItem;
