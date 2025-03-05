import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import React, { useRef, useState } from 'react';
import { useTranslation } from "react-i18next";
import {
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView, StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import MaterialIcon from 'react-native-vector-icons/Entypo';
import { FIREBASE_AUTH, FIRESTORE_DB } from '../../../firebase/config';

const LoginPaciente = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [mostrarContraseña, setMostrarContraseña] = useState(false);
  const [loading, setLoading] = useState(false);
  const contraseñaInputRef = useRef(null);
  const auth = FIREBASE_AUTH;
  const db = FIRESTORE_DB;

  const { t } = useTranslation();

  const SignIn = async () => {
    setLoading(true);
    try {
      const response = await signInWithEmailAndPassword(auth, email, contraseña);

      // Obtén el documento del usuario
      let userDoc = await getDoc(doc(db, 'UsuariosPacientes', response.user.uid));

      if (userDoc.exists() && userDoc.data().rol === 'Paciente' && !response.user.emailVerified) {
        alert(t("ErrorPacientesLogin.ErrorVerificacionCorreo"));
        await FIREBASE_AUTH.signOut();
      }

      // Verifica el rol del usuario
      if (userDoc.exists() && userDoc.data().rol === 'Paciente') {
        setEmail('');
        setContraseña('');
      } else {
        await FIREBASE_AUTH.signOut();
        setEmail('');
        setContraseña('');
        alert(t("ErrorPacientesLogin.ErrorSinPermisos"));
      }
    } catch (error) {
      console.log(error);
      alert(t("ErrorPacientesLogin.ErrorLoginFallido"));
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
          <Text style={styles.Titulo}>{t("APP")}</Text>
        </View>

        <View style={styles.ContenedorBienvenida}>
          <Text style={styles.TextBienvenida}>{t("LoginPaciente.Bienvenida")}</Text>
        </View>


        <TextInput
          style={styles.input}
          value={email}
          placeholder={t("LoginPaciente.Correo")}
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
            placeholder={t("LoginPaciente.Contrasena")}
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
            <Text style={styles.TextoEntrar}>{t("LoginPaciente.IniciarSesion")}</Text>
          </Pressable>
        )}

        <View style={styles.contenedorRegistroYOlvidoContraseña}>
          <Text style={styles.textoRegistrateYOlvidarContraseña}>{t("LoginPaciente.Registro")}<Text style={styles.textoRojo} onPress={goToRegister}>{t("LoginPaciente.Registrarse")}</Text>.</Text>

          <Text style={styles.textoRegistrateYOlvidarContraseña}>{t("LoginPaciente.OlvidasteContrasena")}<Text style={styles.textoRojo} onPress={goToRecuperarConstraseña}>{t("LoginPaciente.Recuerdame")}</Text>.</Text>

        </View>

        <View style={styles.ContenedorNiños}>
          <Image style={styles.niña} source={require('../../../../assets/Image/Nina.png')} resizeMode='contain' />
          <Image style={styles.niño} source={require('../../../../assets/Image/Nino.png')} resizeMode='contain' />
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
    marginBottom: hp('3%'),
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
