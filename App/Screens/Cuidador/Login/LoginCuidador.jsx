import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  ActivityIndicator,
  Image, KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import MaterialIcon from 'react-native-vector-icons/Entypo';
import { FIREBASE_AUTH, FIRESTORE_DB } from '../../../firebase/config';

const LoginCuidador = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [mostrarContraseña, setMostrarContraseña] = useState(false);
  const [loading, setLoading] = useState(false);
  const contraseñaInputRef = useRef(null);

  const { t } = useTranslation();

  const SignIn = async () => {
    setLoading(true);

    try {
      const response = await signInWithEmailAndPassword(FIREBASE_AUTH, email, contraseña);

      let userDoc = await getDoc(doc(FIRESTORE_DB, 'UsuariosCuidadores', response.user.uid));


      // Verifica el rol del usuario
      if (userDoc.exists() && userDoc.data().rol === 'Cuidador') {
        setEmail('');
        setContraseña('');
      }
      else {
        setEmail('');
        setContraseña('');
        await FIREBASE_AUTH.signOut();
        alert(t("ErrorCuidadorLogin.ErrorPermisos"));
      }
    } catch (error) {
      console.log(error);
      alert(t("ErrorCuidadorLogin.ErrorLoginFallido"));
    } finally {
      setLoading(false);
    }
  };


  const goToRecuperarConstraseña = () => {
    navigation.navigate('OlvidoContraseñaCuidador');
  };

  return (
    <SafeAreaView style={styles.container} >
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.keyboardAvoidingView}>
        <ScrollView contentContainerStyle={styles.scrollViewContent} keyboardShouldPersistTaps='handled'>
          <Pressable style={styles.contenedorAtras} onPress={() => { navigation.navigate('Rol') }}>
            <Image style={styles.iconAtras} source={require('../../../../assets/Image/Flechaatras.png')} />
          </Pressable>

          <View style={styles.ContenedorTitulo}>
            <Text style={styles.Titulo}>{t("APP")}</Text>
          </View>

          <View style={styles.ContenedorBienvenida}>
            <Text style={styles.TextBienvenida}>{t("LoginCuidador.Bienvenida")}</Text>
          </View>

          <View style={styles.ContenedorInputs}>
            <TextInput
              style={styles.input}
              value={email}
              placeholder={t("LoginCuidador.Correo")}
              placeholderTextColor={'black'}
              autoCapitalize='none'
              onChangeText={(text) => setEmail(text)}
              returnKeyType="next"
              onSubmitEditing={() => contraseñaInputRef.current.focus()}
              blurOnSubmit={false}
            />

            <View style={styles.ContenedorContraseña}>
              <TextInput
                ref={contraseñaInputRef}
                style={styles.inputContraseña}
                value={contraseña}
                placeholder={t("LoginCuidador.Contrasena")}
                placeholderTextColor={'black'}
                autoCapitalize='none'
                secureTextEntry={!mostrarContraseña}
                onChangeText={(text) => setContraseña(text)}
                returnKeyType="done"
                onSubmitEditing={SignIn}
                blurOnSubmit={false}
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
                  <Text style={styles.TextoEntrar}>{t("LoginCuidador.IniciarSesion")}</Text>
                </Pressable>
              </>
            )}

            <View style={styles.contenedorRegistroYOlvidoContraseña}>
              <Text style={styles.textoRegistrateYOlvidarContraseña}>{t("LoginCuidador.OlvidasteContrasena")}<Text style={styles.textoRojo} onPress={goToRecuperarConstraseña}> {t("LoginCuidador.Recuerdame")}</Text>.</Text>
            </View>
          </View>

          <View style={styles.ContenedorNiños}>
            <Image style={styles.niña} source={require('../../../../assets/Image/Niña.png')} />
            <Image style={styles.niño} source={require('../../../../assets/Image/Niño.png')} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginCuidador;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'F1F1F1',
  },

  keyboardAvoidingView: {
    flex: 1,
  },

  scrollViewContent: {
    flex: 1,
    justifyContent: 'center',
  },

  contenedorAtras: {
    top: hp('3%'),
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
    backgroundColor: '#AADBFF',
    alignSelf: 'center',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
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

  ContenedorBienvenida: {
    height: hp('12%'),
    marginVertical: hp('2%'),
  },

  TextBienvenida: {
    textAlign: 'center',
    color: 'rgba(0, 0, 0, 0.8)',
    fontFamily: 'Play-fair-Display',
    fontSize: hp('3%'),
    top: hp('9%'),
    alignSelf: 'center',
  },
  ContenedorNiños: {
    top: hp('6.3%'),
    marginVertical: hp('6%'),
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
    backgroundColor: '#AADBFF',
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
    backgroundColor: '#AADBFF',
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
    backgroundColor: '#AADBFF',
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
