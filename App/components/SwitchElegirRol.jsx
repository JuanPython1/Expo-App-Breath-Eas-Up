import React, { useRef, useState } from "react";
import { Animated, Pressable, StyleSheet, Switch, Text, View } from 'react-native';

import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

import { useTranslation } from "react-i18next";


export default function SwitchElegirRol({ navigation }) {

    const { t, i18n } = useTranslation();
    const [isSwitchOn, setIsSwitchOn] = useState(false);

    const handleNav = () => {

        if (isSwitchOn) {
            return () => navigation.navigate('LoginCuidador')
        }
        if (!isSwitchOn) {
            return () => navigation.navigate('LoginPaciente')
        }
    }

    const scaleAnim = useRef(new Animated.Value(1)).current;

    const animatePressIn = () => {
        Animated.spring(scaleAnim, {
            toValue: 0.9, // Tamaño más grande
            useNativeDriver: true,
        }).start();
    };

    const animatePressOut = () => {
        Animated.spring(scaleAnim, {
            toValue: 1, // Tamaño original
            useNativeDriver: true,
        }).start();
    };


    return (
        <View style={styles.RolContainer}>

            <View style={styles.ContenedorFondoSwitch}>
                <Text style={styles.TextoElijeRol}>{t("Rol.EligeRol")}</Text>
                <View style={styles.ContenedorSwitch}>
                    <View style={styles.ContenedorSwitchPaciente}>
                        <Text style={isSwitchOn ? styles.TextoSwitchPaciente : styles.TextoSwitchPacienteActivo}>{t("Rol.Paciente")}</Text>
                    </View>
                    <Switch
                        value={isSwitchOn}
                        onValueChange={(value) => setIsSwitchOn(value)}
                        trackColor={{ false: "#AADBFF", true: "#00AAE4" }}
                        thumbColor={'#ffffff'}
                        ios_backgroundColor="#00A3E0"
                        style={styles.Switch}
                    />
                    <View style={styles.ContenedorSwitchCuidador}>
                        <Text style={isSwitchOn ? styles.TextoSwitchCuidadorActivo : styles.TextoSwitchCuidador}>{t("Rol.Cuidador")}</Text>
                    </View>
                </View>
            </View>

            <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
                <Pressable style={styles.BotonEntrar}
                    onPress={handleNav()}
                    onPressIn={animatePressIn}
                    onPressOut={animatePressOut}
                >
                    <Text style={styles.TextoEntrar}>{t("Rol.Vamos")}</Text>
                </Pressable>
            </Animated.View>

        </View>
    )
}

const styles = StyleSheet.create({

    RolContainer: {
        marginTop: hp('9.67%'),
        alignItems: 'center',
    },

    ContenedorFondoSwitch: {
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#F5F9FF',
        width: wp('78%'),
        height: hp('17%'),
        gap: wp('5%'),
        borderRadius: 12,
        marginBottom: hp('1.33%'),
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 2,
    },

    TextoElijeRol: {
        marginTop: hp('2%'),
        color: 'rgba(0, 0, 0, 0.8)',
        fontFamily: 'Play-fair-Display',
        fontSize: wp('6%'),
        marginBottom: hp('0.93%')
    },

    ContenedorSwitch: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: wp('1%'),
        backgroundColor: '#E1F0FF',
        width: '85%',
        borderRadius: 12,
        height: hp('5.67%'),
    },

    ContenedorSwitchPaciente: {
        height: hp('5.67%'),
        width: wp('25%'),
        alignItems: 'center',
        justifyContent: 'center',
    },



    ContenedorSwitchCuidador: {
        height: hp('5.67%'),
        width: wp('25%'),
        alignItems: 'center',
        justifyContent: 'center',
    },

    TextoSwitchPaciente: {
        fontSize: wp('4%'),
        fontFamily: 'Play-fair-Display',
    },

    TextoSwitchPacienteActivo: {
        fontSize: wp('4%'),
        fontFamily: 'Play-fair-Display',
        color: '#00AAE4',
    },

    TextoSwitchCuidador: {
        fontSize: wp('4%'),
        fontFamily: 'Play-fair-Display',
    },

    TextoSwitchCuidadorActivo: {
        fontSize: wp('4%'),
        fontFamily: 'Play-fair-Display',
        color: '#00AAE4',
    },

    BotonEntrar: {
        width: wp('22%'),
        height: hp('5%'),
        borderRadius: 15,
        padding: hp('1%'),
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 2,
        backgroundColor: '#E1F0FF',
        margin: hp('1%'),
        justifyContent: 'center',
        alignItems: 'center',
    },

    TextoEntrar: {
        textAlign: 'center',
        fontFamily: 'Play-fair-Display',
        fontWeight: '600',
        color: '#00AAE4',
        fontSize: hp('1.8%'),
    },

})