import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Animated, StyleSheet, Text, TouchableWithoutFeedback } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

const DesplegableIdioma = ({ props }) => {
    const { idiomaDefault } = props;

    const { t } = useTranslation();

    // Creación de valores animados
    const scaleAnim = useRef(new Animated.Value(1)).current; // Para la interacción
    const pulseAnim = useRef(new Animated.Value(1)).current; // Para el pulso continuo

    // Función que ejecuta la animación cuando se presiona el botón
    const handlePressIn = () => {
        Animated.spring(scaleAnim, {
            toValue: 0.9, // Se encoge al 90% de su tamaño original
            useNativeDriver: true,
        }).start();
    };

    const handlePressOut = () => {
        Animated.spring(scaleAnim, {
            toValue: 1, // Vuelve a su tamaño original
            useNativeDriver: true,
        }).start();
    };

    // Efecto "pulse" continuo que invita a presionar el botón
    useEffect(() => {
        const pulseAnimation = Animated.loop(
            Animated.sequence([
                Animated.timing(pulseAnim, {
                    toValue: 1.2, // Agranda el botón
                    duration: 1100,
                    useNativeDriver: true,
                }),
                Animated.timing(pulseAnim, {
                    toValue: 1, // Lo vuelve a su tamaño original
                    duration: 1100,
                    useNativeDriver: true,
                }),
            ])
        );
        pulseAnimation.start();

        return () => pulseAnimation.stop(); // Detiene la animación cuando el componente se desmonta
    }, [pulseAnim]);

    return (
        <TouchableWithoutFeedback
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
        >
            <Animated.View
                style={[
                    styles.containerBoton,
                    { transform: [{ scale: Animated.multiply(scaleAnim, pulseAnim) }] } // Combina ambas animaciones
                ]}
            >
                <Text style={styles.TextIdioma}>{t("Rol.Idioma")}</Text>
                {idiomaDefault}
            </Animated.View>
        </TouchableWithoutFeedback>
    );
};

export default DesplegableIdioma;

const styles = StyleSheet.create({
    TextIdioma: {
        fontFamily: 'Play-fair-Display',
        textAlign: 'center',
    },
    containerBoton: {
        width: wp('25%'),
        height: hp('12%'),
        zIndex: 2,
        borderRadius: 20,
        borderColor: '#94E4FF',
        alignItems: 'center',
        justifyContent: 'center',
    }
});
