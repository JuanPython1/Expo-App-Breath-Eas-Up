import React, { useState, useRef } from 'react';
import {
  View, Text, SafeAreaView, StyleSheet, Image,
  KeyboardAvoidingView, Pressable, TextInput, ActivityIndicator, Platform, ScrollView
} from 'react-native';
import { doc, getDoc } from 'firebase/firestore';
import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { FIREBASE_AUTH, FIRESTORE_DB } from '../../../firebase/config';
import MaterialIcon from 'react-native-vector-icons/Entypo';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import DashboardPaciente from '../Dashboard/DashboardPaciente';

const LoginPaciente = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [mostrarContraseña, setMostrarContraseña] = useState(false);
  const [loading, setLoading] = useState(false);
  const contraseñaInputRef = useRef(null);
  const auth = FIREBASE_AUTH;
  const db = FIRESTORE_DB

  const SignIn = async () => {
    setLoading(true);
    try {
      const response = await signInWithEmailAndPassword(auth, email, contraseña);

      // Obtén el documento del usuario
      let userDoc = await getDoc(doc(db, 'UsuariosPacientes', response.user.uid));
      if (!userDoc.exists()) {
        userDoc = await getDoc(doc(db, 'UsuariosCuidadores', response.user.uid));
      }

      // Verifica el rol del usuario
      if (userDoc.exists() && userDoc.data().rol === 'Paciente') {
        setEmail('');
        setContraseña('');
      } else {
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



  const goToRecuperarConstraseña = () => {
    navigation.navigate('OlvidoContraseñaPaciente');
  };

  const goToRegister = () => {
    navigation.navigate('RegistroPaciente');
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
      >
        <Pressable style={styles.contenedorAtras} onPress={() => { navigation.navigate('Rol') }}>
          <Image style={styles.iconAtras} source={require('../../../../assets/Image/Flechaatras.png')} />
        </Pressable>

        <View style={styles.ContenedorTitulo}>
          <Text style={styles.Titulo}>INHALIFE</Text>
        </View>

        <View style={styles.ContenedorBienvenida}>
          <Text style={styles.TextBienvenida}>{`BIENVENIDO\nPACIENTE`}</Text>
        </View>


        <TextInput
          style={styles.input}
          value={email}
          placeholder='CORREO ELECTRONICO'
          placeholderTextColor={'black'}
          autoCapitalize='none'
          onChangeText={(text) => setEmail(text)}
          returnKeyType="next" // Cambia el botón de retorno del teclado a "Siguiente"
          onSubmitEditing={() => contraseñaInputRef.current.focus()} // Enfoca el siguiente campo al presionar "Siguiente"
          blurOnSubmit={false} // Evita que el teclado se cierre al presionar "Siguiente"
        />
        <View style={styles.ContenedorContraseña}>
          <TextInput
            ref={contraseñaInputRef} // Establece la referencia
            style={styles.inputContraseña}
            value={contraseña}
            placeholder='CONTRASEÑA'
            placeholderTextColor={'black'}
            autoCapitalize='none'
            secureTextEntry={!mostrarContraseña}
            onChangeText={(text) => setContraseña(text)}
            returnKeyType="done" // Cambia el botón de retorno del teclado a "Hecho"
            onSubmitEditing={SignIn} // Llama a la función SignIn al presionar "Hecho"
            blurOnSubmit={false} // Evita que el teclado se cierre al presionar "Hecho"
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
          <View style={styles.loadingContainer}>
            <ActivityIndicator size={'large'} color={'#00AAE4'} />
          </View>
        ) : (
          <Pressable style={styles.BotonEntrar} onPress={SignIn}>
            <Text style={styles.TextoEntrar}>ENTRAR</Text>
          </Pressable>
        )}

        <View style={styles.contenedorRegistroYOlvidoContraseña}>
          <Text style={styles.textoRegistrateYOlvidarContraseña}>¿No tiene una cuenta? <Text style={styles.textoRojo} onPress={goToRegister}>Registrate</Text>.</Text>
          <Text style={styles.textoRegistrateYOlvidarContraseña}>¿Olvidaste tu contraseña? <Text style={styles.textoRojo} onPress={goToRecuperarConstraseña}>Recuerdame</Text>.</Text>
        </View>

        <View style={styles.ContenedorNiños}>
          <Image style={styles.niña} source={require('../../../../assets/Image/Niña.png')} />
          <Image style={styles.niño} source={require('../../../../assets/Image/Niño.png')} />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginPaciente;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1F1F1',
  },

  keyboardAvoidingView: {
    flex: 1,
    justifyContent: 'center',
  },


  contenedorAtras: {
    marginTop: hp('3%'),
    marginLeft: wp('5%'),
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
    marginTop: hp('9%'),
    height: hp('10%'),
    width: wp('70%'),
    marginBottom: hp('3%'),
    backgroundColor: '#00AAE4',
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
    marginBottom: hp('5%'),
  },

  TextBienvenida: {
    textAlign: 'center',
    color: 'rgba(0, 0, 0, 0.8)',
    fontFamily: 'Play-fair-Display',
    fontSize: hp('3%'),
    alignSelf: 'center'
  },

  ContenedorNiños: {

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



  input: {
    marginVertical: hp('1%'),
    marginHorizontal: wp('15%'),
    height: hp('6%'),
    fontSize: hp('1.5%'),
    borderRadius: 25,
    padding: hp('1%'),
    textAlign: 'center',
    backgroundColor: '#00AAE4',
    fontFamily: 'Play-fair-Display',
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
    fontFamily: 'Play-fair-Display',
    fontSize: hp('1.5%'),
    width: '100%',
    height: hp('6%'),
    borderRadius: 25,
    padding: hp('1%'),
    backgroundColor: '#00AAE4',
    textAlign: 'center',
    justifyContent: 'center'
  },

  OjoContainer: {
    position: 'absolute',
    right: wp('5%'),
  },

  contenedorRegistroYOlvidoContraseña: {
    marginVertical: hp('1%'),
    alignSelf: 'center',
    textAlign: 'center'
  },

  BotonEntrar: {
    marginVertical: hp('1%'),
    marginHorizontal: wp('15%'),
    height: hp('6%'),
    borderWidth: 1,
    padding: hp('1%'),
    backgroundColor: '#00AAE4',
    justifyContent: 'center'
  },

  TextoEntrar: {
    textAlign: 'center',
    fontFamily: 'Play-fair-Display',
    fontSize: hp('2%'),
    fontWeight: 'bold'
  },

  textoRegistrateYOlvidarContraseña: {
    marginVertical: hp('0.5%'),
    fontSize: hp('1.7%'),
    textAlign: 'center',
    fontFamily: 'Play-fair-Display',
  },

  loadingContainer: {
    alignItems: 'center',
  },

  textoRojo: {
    fontFamily: 'Play-fair-Display',
    color: '#FF0000',
  },
});
