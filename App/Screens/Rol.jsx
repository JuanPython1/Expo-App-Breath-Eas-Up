import React, { useEffect, useRef, useState } from "react";
import { Animated, Image, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
// import BotonRol from '../components/BotonRol';

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTranslation } from "react-i18next";

import BanderaIdioma from '../components/BanderaIdioma';
import BotonDesplegableIdioma from '../components/DesplegableIdioma';
import SwitchElegirRol from "../components/SwitchElegirRol";
const Rol = ({ navigation }) => {

  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;
  const [isSwitchOn, setIsSwitchOn] = useState(false);


  useEffect(() => {
    const loadLanguage = async () => {
      const savedLanguage = await AsyncStorage.getItem("language");
      if (savedLanguage) {
        i18n.changeLanguage(savedLanguage);
      }
    };
    loadLanguage();
  }, [i18n]);

  //botones banderas
  const BanderaColombia = { bandera: require('../../assets/Image/español.png'), idioma: 'es-CO' }
  const BanderaIngles = { bandera: require('../../assets/Image/ingles.png'), idioma: 'en-US' }


  //botondesplegable
  const botondesplegable = {
    idiomaDefault: currentLanguage === 'es-CO'
      ? <BanderaIdioma props={BanderaIngles} />
      : <BanderaIdioma props={BanderaColombia} />
  };



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

  //botones roles
  // const botonInfoPaciente = { Titulo: t("Rol.Paciente"), colorFondo: '#00AAE4', fuente: 'Play-fair-Display', navegacion: () => navigation.navigate('LoginPaciente') }
  // const botonInfoCuidador = { Titulo: t("Rol.Cuidador"), colorFondo: '#AADBFF', fuente: 'Play-fair-Display', navegacion: () => navigation.navigate('LoginCuidador') }



  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.ContenedorHeader}>
          <Image style={styles.niña} source={require('../../assets/Image/Niña.png')} resizeMode='contain' />
          <View style={styles.ContenedorBandera}>
            <BotonDesplegableIdioma props={botondesplegable} />
          </View>
        </View>


        <View style={styles.ContenedorTitulo} >
          <Text style={styles.Titulo}>{t("APP")}</Text>
        </View>

        <SwitchElegirRol navigation={navigation} />

        {/* <View style={styles.RolContainer}>

   <View style={styles.contenedorPaciente}>
            <BotonRol props={botonInfoPaciente} />
          </View>

          <View style={styles.ContenedorO}>
            <Text style={{ fontSize: 30, fontFamily: 'Play-fair-Display' }}>{t("Rol.O")}</Text>
          </View>

          <View style={styles.contenedorCuidador}>
            <BotonRol props={botonInfoCuidador} />
          </View>

          </View> */}


        <Image style={styles.niño} source={require('../../assets/Image/Niño.png')} resizeMode='contain' />

        {/* <Text style={styles.textoAdmin}> ¿Eres administrador? presiona<Text onPress={() => { navigation.navigate('LoginAdmin') }}> aqui </Text> </Text> */}
        <Text style={styles.textoAdmin}> {t("Rol.Administrador")} <Text style={{ color: 'red' }} onPress={() => { navigation.navigate('LoginAdmin') }}> {t("Rol.aqui")} </Text>  </Text>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Rol

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'F1F1F1',
    justifyContent: 'center',

  },
  ContenedorHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  niña: {
    left: wp('5%'),
    width: wp('37.5%'),
    height: hp('20%'),
  },
  ContenedorBandera: {
    left: wp('28%'),
  },
  niño: {
    width: wp('37.5%'),
    height: hp('24%'),
    left: wp('60%')
  },

  ContenedorTitulo: {
    top: hp('1%'),
    height: hp('10%'),
    width: wp('70%'),
    backgroundColor: '#00AAE4',
    alignSelf: 'center',
    borderRadius: 30,
    alignItems: 'center', //horizontal
    justifyContent: 'center' //vertical
  },

  Titulo: {
    fontFamily: 'noticia-text',
    fontSize: wp('6.25%'),
    color: '#F5F5F5',
    textShadowColor: 'black',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
    transform: [{ scaleY: 1.2 }],
  },

  RolContainer: {
    marginTop: hp('9.67%'),
    alignItems: 'center',
  },

  contenedorPaciente: {
    width: wp('25%'),
  },

  ContenedorO: {
    width: wp('25%'),
    height: hp('6.67%'),
    alignItems: 'center',
    marginVertical: hp('1.33%'),
  },

  contenedorCuidador: {
    width: wp('25%'),
  },

  textoAdmin: {
    alignSelf: 'center',
    color: 'black',
    fontSize: wp('3%'),
    fontFamily: 'Play-fair-Display',
  }
});
