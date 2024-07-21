import { View, Text, SafeAreaView, StyleSheet, Image, StatusBar, ScrollView } from 'react-native'
import React from 'react'

import BotonRol from '../components/BotonRol';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const Rol = ({ navigation }) => {
  //fuentes

  //botones roles
  const botonInfoPaciente = { Titulo: "PACIENTE", colorFondo: '#00AAE4', fuente: 'Play-fair-Display', navegacion: () => navigation.navigate('LoginPaciente') }
  const botonInfoCuidador = { Titulo: "CUIDADOR", colorFondo: '#AADBFF', fuente: 'Play-fair-Display', navegacion: () => navigation.navigate('LoginCuidador') }



  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Image style={styles.niña} source={require('../../assets/Image/Niña.png')} resizeMode='contain' />


        <View style={styles.ContenedorTitulo} >
          <Text style={styles.Titulo}>INHALIFE</Text>
        </View>


        <View style={styles.RolContainer}>
          <Text style={styles.TextoElijeRol}>ELIGE TU ROL</Text>

          <View style={styles.contenedorPaciente}>
            <BotonRol props={botonInfoPaciente} />
          </View>

          <View style={styles.ContenedorO}>
            <Text style={{ fontSize: 30, fontFamily: 'Play-fair-Display' }}>O</Text>
          </View>

          <View style={styles.contenedorCuidador}>
            <BotonRol props={botonInfoCuidador} />
          </View>

        </View>

        <Image style={styles.niño} source={require('../../assets/Image/Niño.png')} resizeMode='contain' />

        {/* <Text style={styles.textoAdmin}> ¿Eres administrador? presiona<Text onPress={() => { navigation.navigate('LoginAdmin') }}> aqui </Text> </Text> */}
        <Text style={styles.textoAdmin}> ¿Eres administrador? presiona <Text style={{ color: 'red' }} onPress={() => { navigation.navigate('LoginAdmin') }}> aqui </Text>  </Text>
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

  niña: {
    left: wp('5%'),
    width: wp('37.5%'),
    height: hp('20%'),
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
    paddingTop: hp('10.67%'),
    alignItems: 'center',
  },

  TextoElijeRol: {
    color: 'rgba(0, 0, 0, 0.8)',
    fontFamily: 'Play-fair-Display',
    fontSize: wp('5%'),
    marginBottom: hp('0.93%')
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
