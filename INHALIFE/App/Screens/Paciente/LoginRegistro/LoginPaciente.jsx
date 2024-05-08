import React, { useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet, StatusBar, Image, KeyboardAvoidingView, Pressable,
   TextInput, Dimensions, TouchableOpacity, ActivityIndicator } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { FIREBASE_AUTH } from '../../../../Firebase/config';
import MaterialIcon from 'react-native-vector-icons/Entypo';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const { height, width } = Dimensions.get('window');

const LoginPaciente = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [mostrarContraseña, setMostrarContraseña] = useState(false);
  const [loading, setLoading] = useState(false);

  const SignIn = async () => {
    setLoading(true);
    try {
      const response = await signInWithEmailAndPassword(FIREBASE_AUTH, email, contraseña);
      console.log(response);
    } catch (error) {
      console.log(error);
      alert('Iniciar Sesión Fallido' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const goToRecuperarConstraseña = () => {
    navigation.navigate('OlvidoContraseñaPaciente');
  };

  const goToRegister = () => {
    navigation.navigate('RegistroPaciente');
  };

  return (
    <SafeAreaView style={styles.container}>

      <StatusBar style="auto" backgroundColor="#00AAE4" />

      <Pressable style={styles.contenedorAtras} onPress={() => { navigation.navigate('Rol') }}>
        <Image style={styles.iconAtras} source={require('../../../../assets/Image/Flechaatras.png')} />
      </Pressable>

      <View style={styles.ContenedorTitulo}>
        <Text style={styles.Titulo}>INHALIFE</Text>
      </View>

      <View style={styles.ContenedorBienvenida}>
        <Text style={styles.TextBienvenida}>{`BIENVENIDO\nPACIENTE`}</Text>
      </View>

      <KeyboardAvoidingView behavior="padding" >
        <View style={styles.ContenedorInputs}>

          <TextInput style={styles.input}
            value={email}
            placeholder='CORREO ELECTRONICO'
            placeholderTextColor={'black'}
            autoCapitalize='none'
            onChangeText={(text) => setEmail(text)}
          />

          <View style={styles.ContenedorContraseña}>
            <TextInput
              style={styles.inputContraseña}
              value={contraseña}
              placeholder='CONTRASEÑA'
              placeholderTextColor={'black'}
              autoCapitalize='none'
              secureTextEntry={!mostrarContraseña}
              onChangeText={(text) => setContraseña(text)}
            />
            <Pressable onPress={() => setMostrarContraseña(!mostrarContraseña)} style={styles.OjoContainer}>
              <MaterialIcon
                name={mostrarContraseña ? 'eye' : 'eye-with-line'}
                size={20}
                color="#000000"
              />
            </Pressable>
          </View>

          { loading ? (
            <ActivityIndicator size="large" color="#0000" />
        ) : (
            <>
                <Pressable style={styles.BotonEntrar} onPress={SignIn}>
                    <Text style={styles.TextoEntrar}>ENTRAR</Text>
                </Pressable>
            </>
        )}

        <View style={styles.contenedorRegistroYOlvidoContraseña}>
        <Text style={styles.textoRegistrateYOlvidarContraseña}>¿No tiene una cuenta? <Text style={styles.textoRojo} onPress={goToRegister}>Registrate</Text>.</Text>
        <Text style={styles.textoRegistrateYOlvidarContraseña}>¿Olvidaste tu contraseña? <Text style={styles.textoRojo} onPress={goToRecuperarConstraseña}>Recuerdame</Text>.</Text>
        </View>    
        </View>
      </KeyboardAvoidingView>

      <View style={styles.ContenedorNiños}>
        <Image style={styles.niña} source={require('../../../../assets/Image/Niña.png')}/>
        <Image style={styles.niño} source={require('../../../../assets/Image/Niño.png')}/>
      </View>

    </SafeAreaView>
  );
};

export default LoginPaciente;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: hp(100),
    width: wp(100),
    backgroundColor: 'F1F1F1',

  },

  contenedorAtras: {
    top: 20,
    left: '5%',
    height: 50,
    width: 70,
    alignItems: 'center',
    justifyContent: 'center',
  },

  iconAtras: {
    width: 45,
    height: 25,
  },


  ContenedorTitulo: {
    top: '10%',
    height: '10%',
    width: '70%',
    marginBottom: '3%',
    backgroundColor: '#00AAE4',
    alignSelf: 'center',
    borderRadius: 30,
    alignItems: 'center', //horizontal
    justifyContent: 'center', //vertical
  },

  Titulo: {
    fontFamily: 'noticia-text',
    fontSize: 25,
    color: '#F5F5F5',
    textShadowColor: 'black',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
    transform: [{ scaleY: 1.2 }],
  },

  ContenedorBienvenida: {
    height: 120,
    width: 'auto',
    marginVertical: 20,
  },

  TextBienvenida: {
    textAlign: 'center',
    color: 'rgba(0, 0, 0, 0.8)',
    fontFamily: 'Play-fair-Display',
    fontSize: 20,
    top: 90,
    alignSelf: 'center'
  },
  ContenedorNiños:{
      marginVertical: '10%',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
  },

  niña: {
      right: '20%'
  },
  niño: {
    left: '20%'
  },

  ContenedorInputs: {
    top: '15%',
  },
  input: {
    marginVertical: 10,
    marginHorizontal: 65,
    height: 60,
    borderWidth: 0,
    fontSize: 15,
    borderRadius: 25,
    padding: 10,
    textAlign: 'center',
    backgroundColor: '#00AAE4',
    fontFamily: 'Play-fair-Display',
    margin: '10%',
  },
  ContenedorContraseña: {
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    width: '70%'

  },
  inputContraseña:{
    marginVertical: 10,
    marginHorizontal: 65,
    fontFamily: 'Play-fair-Display',
    fontSize: 15,
    width: '100%',
    height: 60,
    borderWidth: 0,
    borderRadius: 25,
    padding: 10,
    backgroundColor: '#00AAE4',
    textAlign: 'center',
    justifyContent: 'center'
  },
  OjoContainer: {
    position: 'absolute',
    right: 20,
  },

  contenedorRegistroYOlvidoContraseña:{
    marginVertical: 9,
    alignSelf: 'center',
    textAlign: 'center'
  },

  BotonEntrar:{
    marginVertical: 10,
    marginHorizontal: 65,
    height: 60,
    borderWidth: 1,
    padding: 10,
    backgroundColor: '#00AAE4',
    margin: '10%',
    justifyContent: 'center'
  },

  TextoEntrar: {
    textAlign: 'center',
    fontFamily: 'Play-fair-Display',
    fontWeight: 'bold',
    fontSize: 20,
  },


  textoRegistrateYOlvidarContraseña: {
    marginVertical: 4,
    fontSize: 17,
    textAlign: 'center',
    fontFamily: 'Play-fair-Display',
  },

  textoRojo: {
    fontFamily: 'Play-fair-Display',
    color: '#FF0000',
  },


});
