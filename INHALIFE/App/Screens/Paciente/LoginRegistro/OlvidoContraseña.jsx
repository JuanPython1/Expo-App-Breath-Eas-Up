import { View, Text, StyleSheet, Pressable, TextInput } from 'react-native'
import React, { useState } from 'react'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'

const OlvidoContraseñaPaciente = ({navigation}) => {
  const [correo, setCorreo] = useState('');
  const {loading,setLoading} = useState(false)

  const gotoLogin = () => {
    navigation.navigate('LoginPaciente')
  }

  return (
    <View style={styles.container}>

    <View style={styles.header}>
      <View style={styles.ContenedorTitulo} >
        <Text style={styles.Titulo}>INHALIFE</Text>
      </View>
    </View>

    <View style={styles.body}>
      <View style={styles.ContenedorTextoDeseas}>
        <Text style={styles.TextoDeseas}>¿Deseas restablecer tu contraseña?</Text>
      </View>

      <TextInput style={styles.input}  
      value={correo}
      placeholder='CORREO ELECTRONICO'
      placeholderTextColor='black'
      autoCapitalize='none'
      onChangeText={(text) => setCorreo(text)}
      />

      <Text style={styles.textoEnvia}>{`Envia y te enviaremos un correo \n para restablecer tu contraseña.`}</Text>


      <Pressable style={styles.BotonEntrar} >
                    <Text style={styles.TextoEntrar}>ENVIAR</Text>
      </Pressable>

      <Text style={styles.textoCuenta}>¿No tiene una cuenta? <Text style={styles.textoRojo} onPress={gotoLogin}>Registrate</Text>.</Text>


    </View>

    </View>
  )
}

export default OlvidoContraseñaPaciente

const styles = StyleSheet.create({
    container: {
      width: wp('100%'),
      height: hp('100%'),
    }, 
    header:{
      height: hp('25%'),
    },  
    ContenedorTitulo:{
      top: hp('14%'),
      height: hp('10%'),
      width: wp('70%'),
      backgroundColor: '#00AAE4',
      alignSelf: 'center',
      borderRadius: 30,
      alignItems: 'center', //horizontal
      justifyContent: 'center' //vertical
    }, 
  
    Titulo:{
        fontFamily: 'noticia-text',
        fontSize: wp('6.25%'),
        color: '#F5F5F5',
        textShadowColor: 'black',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 1,
        transform: [{ scaleY: 1.2}],
    }, 
    body:{
      height: hp('80%'),
    },
    ContenedorTextoDeseas:{
      marginVertical: hp('6%'), 
      alignSelf: 'center',
    },
    TextoDeseas:{
      fontSize: wp('5.4%'),
      fontFamily: 'Play-fair-Display',
    },
    input: {
      marginVertical: hp('1%'),
      marginHorizontal: wp('15%'),
      height: hp('6%'),
      borderWidth: 0,
      fontSize: hp('1.5%'),
      borderRadius: 25,
      padding: hp('1%'),
      textAlign: 'center',
      backgroundColor: '#00AAE4',
      fontFamily: 'Play-fair-Display',
      margin: hp('1%'),
    },
    textoEnvia: {
      marginVertical: hp('4%'),
      alignSelf: 'center',
      fontSize: wp('4%'),
    },
    BotonEntrar:{
      marginVertical: hp('1%'),
      marginHorizontal: wp('15%'),
      height: hp('6%'),
      borderWidth: 1,
      padding: hp('1%'),
      backgroundColor: '#00AAE4',
      margin: hp('1%'),
      justifyContent: 'center'
    },
    TextoEntrar: {
      textAlign: 'center',
      fontFamily: 'Play-fair-Display',
      fontWeight: 'bold',
      fontSize: hp('2%'),
    },
    textoCuenta: {
      marginVertical: hp('3%'),
      fontSize: hp('2%'),
      textAlign: 'center',
      fontFamily: 'Play-fair-Display',
    },
    textoRojo: {
      fontFamily: 'Play-fair-Display',
      color: '#FF0000',
    },
})