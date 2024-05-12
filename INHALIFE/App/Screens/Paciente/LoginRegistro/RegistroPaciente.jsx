import { View, Text, SafeAreaView, StyleSheet, TextInput, 
  ActivityIndicator, Pressable, KeyboardAvoidingView } from 'react-native'
import React, { useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const RegistroPaciente = ({navigation}) => {
  const [usuario, setUsuario] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [email, setEmail] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [confirmarContraseña, setConfirmarContraseña] = useState('');
  const [loading, setLoading] = useState(false);

  const goToLogin = () => {
    navigation.navigate('LoginPaciente')
  }

  return (
    <SafeAreaView style={styles.container}>
   <KeyboardAvoidingView behavior="position" >
      <View style={styles.ContenedorTitulo}>
        <Text style={styles.Titulo}>INHALIFE</Text>
      </View>


 
      <View style={styles.ContenedorInputs}>
        <TextInput 
          style={styles.input}
          value={usuario}
          placeholder='Usuario:'
          placeholderTextColor={'black'}
          autoCapitalize='none'
          onChangeText={(text) => setUsuario(text)}
        />

        <TextInput 
          style={styles.input}
          value={nombre}
          placeholder='Nombres:'
          placeholderTextColor={'black'}
          autoCapitalize='none'
          onChangeText={(text) => setNombre(text)}
        />

        <TextInput 
          style={styles.input}
          value={apellido}
          placeholder='Apellidos:'
          placeholderTextColor={'black'}
          autoCapitalize='none'
          onChangeText={(text) => setApellido(text)}
        />

        <TextInput 
          style={styles.input}
          value={email}
          placeholder='Correo Electronico:'
          placeholderTextColor={'black'}
          autoCapitalize='none'
          onChangeText={(text) => setEmail(text)}
        />

        <TextInput 
          style={styles.input}
          value={contraseña}
          placeholder='Contraseña:'
          placeholderTextColor={'black'}
          autoCapitalize='none'
          onChangeText={(text) => setContraseña(text)}
        />

        <TextInput 
          style={styles.input}
          value={confirmarContraseña}
          placeholder=' Confirmar Contraseña:'
          placeholderTextColor={'black'}
          autoCapitalize='none'
          onChangeText={(text) => setConfirmarContraseña(text)}
        />

      </View>

      

      {loading ? 
      (<ActivityIndicator size={'large'} color={'#0000'}/>): 
      (<>  
      <Pressable style={styles.ContenedorBotonRegistro}>
          <Text style={styles.TextoRegistrarse}>REGISTRARSE</Text>
      </Pressable>    
       </>)
    }


    <Text style={styles.textoIngresa}>¿Ya tienes cuenta? <Text style={styles.textoRojo} onPress={goToLogin}>Ingresa</Text>.</Text>
   
    </KeyboardAvoidingView>

    </SafeAreaView>
  )
}

export default RegistroPaciente;

const styles = StyleSheet.create({
  container:{
    flex: 1,
    height: hp('100%'),
    width: wp('100%'),
    backgroundColor: '#F1F1F1',
  },
  ContenedorTitulo: {
    top: hp('10%'),
    height: hp('10%'),
    width: wp('70%'),
    marginBottom: hp('3%'),
    backgroundColor: '#00AAE4',
    alignSelf: 'center',
    borderRadius: 30,
    alignItems: 'center', //horizontal
    justifyContent: 'center', //vertical
  },
  Titulo: {
    fontFamily: 'noticia-text',
    fontSize: hp('3%'),
    color: '#F5F5F5',
    textShadowColor: 'black',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
    transform: [{ scaleY: 1.2 }],
  },
  ContenedorInputs: {
    top: hp('12%'),
    marginHorizontal: wp('13%'),
    paddingVertical: hp('2%'),

  },
  input: {
    marginVertical: hp('1.3%'),
    marginHorizontal: wp('2%'),
    height: hp('6%'),
    borderBottomWidth: 1,
    fontSize: hp('1.7%'),
    padding: hp('1%'),
    fontFamily: 'Play-fair-Display',
    margin: hp('1%'),
  },

  ContenedorBotonRegistro: {
    marginTop: hp('12%'),
    marginHorizontal: wp('15%'),
    height: hp('6%'),
    borderWidth: 1,
    padding: hp('1%'),
    backgroundColor: '#00AAE4',
    margin: hp('1%'),
    justifyContent: 'center'
  },
  TextoRegistrarse: {
    textAlign: 'center',
    fontFamily: 'Play-fair-Display',
    fontWeight: 'bold',
    fontSize: hp('2%'),
  },
  textoIngresa: {
    top: hp('0.5'),
    fontSize: hp('1.7%'),
    textAlign: 'center',
    fontFamily: 'Play-fair-Display',
  },
  textoRojo: {
    fontFamily: 'Play-fair-Display',
    color: '#FF0000',
  },
});
