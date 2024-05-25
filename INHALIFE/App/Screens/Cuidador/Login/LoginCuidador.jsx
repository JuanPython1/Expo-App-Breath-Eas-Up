import React, { useState } from 'react';
import {
  View, Text, SafeAreaView, StyleSheet, StatusBar, Image, KeyboardAvoidingView, Pressable,
  TextInput, Dimensions, TouchableOpacity, ActivityIndicator
} from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { FIREBASE_AUTH, FIRESTORE_DB } from '../../../../Firebase/config';
import MaterialIcon from 'react-native-vector-icons/Entypo';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const LoginCuidador = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [mostrarContraseña, setMostrarContraseña] = useState(false);
  const [loading, setLoading] = useState(false);

  const SignIn = async () => {
    setLoading(true);
    try {
      const response = await signInWithEmailAndPassword(FIREBASE_AUTH, email, contraseña);

      let userDoc = await getDoc(doc(FIRESTORE_DB, 'UsuariosCuidadores', response.user.uid));
      if (!userDoc.exists()) {
        userDoc = await getDoc(doc(FIRESTORE_DB, 'UsuariosPacientes', response.user.uid));

      }

      // Verifica el rol del usuario
      if (userDoc.exists() && userDoc.data().rol === 'Cuidador') {
        goToDashBoardCuidador();
      }
      else {
        await FIREBASE_AUTH.signOut();
        alert('No tienes permiso para acceder al dashboard de pacientes');
      }
    } catch (error) {
      console.log(error);
      alert('--Iniciar Sesión Fallido-- Verifica si el correo electronico o contraseña este bien escrito o ¡Registrate!');
    } finally {
      setLoading(false);
    }
  };

  const goToDashBoardCuidador = () => {
    navigation.navigate('BienvenidaCuidador')
  };

  const goToRecuperarConstraseña = () => {
    navigation.navigate('OlvidoContraseñaCuidador');
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
        <Text style={styles.TextBienvenida}>{`BIENVENIDO\nCUIDADOR`}</Text>
      </View>

      <KeyboardAvoidingView behavior="height" >
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


          {loading ? (
            <ActivityIndicator size={'large'} color={'#F94242'} />
          ) : (
            <>
              <Pressable style={styles.BotonEntrar} onPress={SignIn}>
                <Text style={styles.TextoEntrar}>ENTRAR</Text>
              </Pressable>
            </>
          )}

          <View style={styles.contenedorRegistroYOlvidoContraseña}>
            <Text style={styles.textoRegistrateYOlvidarContraseña}>¿Olvidaste tu contraseña? <Text style={styles.textoRojo} onPress={goToRecuperarConstraseña}>Recuerdame</Text>.</Text>
          </View>
        </View>

      </KeyboardAvoidingView>


      <View style={styles.ContenedorNiños}>
        <Image style={styles.niña} source={require('../../../../assets/Image/Niña.png')} />
        <Image style={styles.niño} source={require('../../../../assets/Image/Niño.png')} />
      </View>

    </SafeAreaView>
  );
};

export default LoginCuidador;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: hp('100%'),
    width: wp('100%'),
    backgroundColor: 'F1F1F1',
  },

  contenedorAtras: {
    top: hp('2%'),
    left: wp('5%'),
    height: hp('5%'),
    width: wp('15%'),
    alignItems: 'center',
    justifyContent: 'center',
  },

  iconAtras: {
    width: wp('10%'),
    height: hp('2.5%'),
  },

  ContenedorTitulo: {
    top: hp('10%'),
    height: hp('10%'),
    width: wp('70%'),
    marginBottom: hp('3%'),
    backgroundColor: '#F94242',
    alignSelf: 'center',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
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

  ContenedorBienvenida: {
    height: hp('12%'),
    width: 'auto',
    marginVertical: hp('2%'),
  },

  TextBienvenida: {
    textAlign: 'center',
    color: 'rgba(0, 0, 0, 0.8)',
    fontFamily: 'Play-fair-Display',
    fontSize: hp('3%'),
    top: hp('9%'),
    alignSelf: 'center'
  },
  ContenedorNiños: {
    marginVertical: hp('10%'),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  niña: {
    right: wp('20%')
  },
  niño: {
    left: wp('20%')
  },

  ContenedorInputs: {
    top: hp('12%'),
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
    backgroundColor: '#F94242',
    fontFamily: 'Play-fair-Display',
    margin: hp('1%'),
  },
  ContenedorContraseña: {
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    width: wp('70%')
  },
  inputContraseña: {
    marginVertical: hp('1%'),
    marginHorizontal: wp('15%'),
    fontFamily: 'Play-fair-Display',
    fontSize: hp('1.5%'),
    width: '100%',
    height: hp('6%'),
    borderWidth: 0,
    borderRadius: 25,
    padding: hp('1%'),
    backgroundColor: '#F94242',
    textAlign: 'center',
    justifyContent: 'center'
  },
  OjoContainer: {
    position: 'absolute',
    right: wp('5%'),
  },

  contenedorRegistroYOlvidoContraseña: {
    marginVertical: hp('3%'),
    alignSelf: 'center',
    textAlign: 'center'
  },

  BotonEntrar: {
    marginVertical: hp('1%'),
    marginHorizontal: wp('15%'),
    height: hp('6%'),
    borderWidth: 1,
    padding: hp('1%'),
    backgroundColor: '#F94242',
    margin: hp('1%'),
    justifyContent: 'center'
  },

  TextoEntrar: {
    textAlign: 'center',
    fontFamily: 'Play-fair-Display',
    fontWeight: 'bold',
    fontSize: hp('2%'),
  },

  textoRegistrateYOlvidarContraseña: {
    marginVertical: hp('0.5%'),
    fontSize: hp('1.7%'),
    textAlign: 'center',
    fontFamily: 'Play-fair-Display',
  },

  textoRojo: {
    fontFamily: 'Play-fair-Display',
    color: '#FF0000',
  },

});
