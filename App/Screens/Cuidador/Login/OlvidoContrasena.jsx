import { sendPasswordResetEmail } from 'firebase/auth';
import React, { useState } from 'react';
import { useTranslation } from "react-i18next";
import { Modal, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { FIREBASE_AUTH } from '../../../firebase/config';

const OlvidoContrasenaCuidador = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [modalVisible, setModalVisible] = useState(false); // Estado para el modal de verificación
  const auth = FIREBASE_AUTH;

  const { t } = useTranslation();

  //recuperar contraseña
  const recuperar = async () => {
    try {
      // Envía un correo de recuperación al email proporcionado
      await sendPasswordResetEmail(auth, email);
      setModalVisible(true); // Mostrar el modal de verificación
    } catch (error) {
      console.error(t("OlvidarContrasena.ErrorAlEnviar"), error.message);
    }
  };

  const gotoLogin = () => {
    navigation.navigate('LoginCuidador')
  }

  return (
    <View style={styles.container}>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{t("OlvidarContrasena.ModalVerificaTuCorreo")}</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <Text style={styles.textStyle}>{t("OlvidarContrasena.Cerrar")}</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <View style={styles.header}>
        <View style={styles.ContenedorTitulo} >
          <Text style={styles.Titulo}>{t("APP")}</Text>
        </View>
      </View>

      <View style={styles.body}>
        <View style={styles.ContenedorTextoDeseas}>
          <Text style={styles.TextoDeseas}>{t("OlvidarContrasena.DeseaRestableceContrasena")}</Text>
        </View>

        <TextInput style={styles.input}
          value={email}
          placeholder={t("OlvidarContrasena.Correo")}
          placeholderTextColor='black'
          autoCapitalize='none'
          onChangeText={(text) => setEmail(text)}
        />

        <Text style={styles.textoEnvia}>{t("OlvidarContrasena.TeEnviaremosUnCorreo")}</Text>


        <Pressable style={styles.BotonEntrar} onPress={recuperar} >
          <Text style={styles.TextoEntrar}>{t("OlvidarContrasena.Enviar")}</Text>
        </Pressable>

        <Text style={styles.textoCuenta}>{t("OlvidarContrasena.RecordasteContrasena")}<Text style={styles.textoRojo} onPress={gotoLogin}>{t("OlvidarContrasena.IniciarSesion")}</Text>.</Text>


      </View>

    </View>
  )
}

export default OlvidoContrasenaCuidador

const styles = StyleSheet.create({
  container: {
    width: wp('100%'),
    height: hp('100%'),
  },
  header: {
    height: hp('25%'),
  },
  ContenedorTitulo: {
    top: hp('14%'),
    height: hp('10%'),
    width: wp('70%'),
    backgroundColor: '#AADBFF',
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
  body: {
    height: hp('80%'),
  },
  ContenedorTextoDeseas: {
    marginVertical: hp('6%'),
    alignSelf: 'center',
  },
  TextoDeseas: {
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
    backgroundColor: '#AADBFF',
    fontFamily: 'Play-fair-Display',
    margin: hp('1%'),
  },
  textoEnvia: {
    marginVertical: hp('4%'),
    alignSelf: 'center',
    fontSize: wp('4%'),
    textAlign: 'center',
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
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalContainer: {
    alignItems: 'center'
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center'
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    backgroundColor: '#FF0000'
  },
  buttonClose: {
    backgroundColor: '#AADBFF',
    marginTop: 10,
  },
})