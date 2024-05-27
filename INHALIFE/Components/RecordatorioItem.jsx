import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Animated, Easing, Pressable } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/FontAwesome';

const RecordatorioItem = ({ colorFondo, nombreMedicamento, hora, dosisActual, dosisLimite, funcionNav }) => {
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
        outputRange: [textWidth * 0.2, -textWidth, textWidth * 2.2, textWidth * 0.2],
    });

    const styles = StyleSheet.create({
        contenedorItemRecordatorio: {
            flexDirection: 'row',
            height: hp('15%'),
            marginHorizontal: wp('10%'),
            borderRadius: 10,
            backgroundColor: '#94E4FF',
        },
        ContenedorIzq: {
            width: '85%',
            height: '100%',
            borderTopStartRadius: 10,
            borderBottomStartRadius: 10,
            left: '3%',
        },
        letrasSuperior: {
            height: '61%',
            padding: '2%',
            borderTopStartRadius: 10,
            overflow: 'hidden',
            justifyContent: 'center',
        },
        letrasInferior: {
            flexDirection: 'row',
            height: '40%',
            borderBottomStartRadius: 10,
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: '2%',
        },
        ContenedorDer: {
            width: '15%',
            backgroundColor: 'orange',
            borderTopEndRadius: 10,
            borderBottomEndRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
        },
        nombreMedicamento: {
            fontSize: wp('6%'),
            whiteSpace: 'nowrap', // Evita que el texto salte de línea
        },
        hora: {
            fontSize: wp('5%'),
        },
        dosis: {
            fontSize: wp('5%'),
        },
        iconoBasura: {
            color: 'red',
            fontSize: wp('8%'),
        }
    });

    return (
        <View style={styles.contenedorItemRecordatorio}>
            <Pressable style={styles.ContenedorIzq} onPress={funcionNav} onLayout={handleContainerLayout}>
                <View style={styles.letrasSuperior}>
                    <Animated.Text
                        style={[styles.nombreMedicamento, { transform: [{ translateX }, { scaleX: 1.4 }, { scaleY: 1.7 }] }]}
                        onLayout={handleTextLayout}
                    >
                        Salbutamol
                    </Animated.Text>
                </View>
                <View style={styles.letrasInferior}>
                    <Text style={styles.hora}>hora</Text>
                    <Text style={styles.dosis}>0% - 200%</Text>
                </View>
            </Pressable>
            <View style={styles.ContenedorDer}>
                <Icon name="trash" style={styles.iconoBasura} />
            </View>
        </View>
    );
};

export default RecordatorioItem;
