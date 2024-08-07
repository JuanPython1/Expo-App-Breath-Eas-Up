import React, { useState, useEffect, useRef } from 'react';
import { View, Text, ScrollView, StyleSheet, TextInput, ActivityIndicator, Pressable, KeyboardAvoidingView, Modal, Platform } from 'react-native';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { collection, doc, getDocs, setDoc } from 'firebase/firestore';
import { FIREBASE_AUTH, FIRESTORE_DB } from '../../../firebase/config';
import { MaterialIcons } from '@expo/vector-icons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const RegistroPaciente = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [email, setEmail] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [confirmarContraseña, setConfirmarContraseña] = useState('');
  const [loading, setLoading] = useState(false);
  const [modalVisibleRegistro, setModalVisibleRegistro] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [isModalClosedRegistro, setIsModalClosedRegistro] = useState(false);
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [secureConfirmEntry, setSecureConfirmEntry] = useState(true);

  const nombreRef = useRef(null);
  const apellidoRef = useRef(null);
  const emailRef = useRef(null);
  const contraseñaRef = useRef(null);
  const confirmarContraseñaRef = useRef(null);

  const auth = FIREBASE_AUTH;
  const firestore = FIRESTORE_DB;

  const goToLogin = () => {
    navigation.navigate('LoginPaciente');
  };

  const ValidacionesYRegistro = async () => {
    if (loading) return; // No permitir autenticaciones múltiples mientras loading es true

    if (!username || !nombre || !apellido) {
      alert('Por favor, completa todos los campos requeridos.');
      return;
    }

    if (!email) {
      alert('Por favor, llena el correo electronico.');
      return;
    }

    if (!contraseña || !confirmarContraseña) {
      alert('Por favor, completa el ingreso de las contraseñas.');
      return;
    }

    if (contraseña !== confirmarContraseña) {
      alert('Las contraseñas no coinciden. Por favor, ingrésalas de nuevo.');
      return;
    }

    const usernameExists = await checkUsernameExists(username);
    if (usernameExists) {
      setModalVisible(true);
    } else {
      await signUp();
    }
  };

  const checkUsernameExists = async (username) => {
    const querySnapshot = await getDocs(collection(firestore, 'UsuariosPacientes'));
    const usernames = querySnapshot.docs.map(doc => doc.data().nombreUsuario);
    return usernames.includes(username);
  };

  const signUp = async () => {
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, contraseña);
      await sendEmailVerification(auth.currentUser);
      const userUID = auth.currentUser.uid;
      const userRef = doc(firestore, 'UsuariosPacientes', userUID);
      await setDoc(userRef, { nombreUsuario: username, email: email, nombre: nombre, apellido: apellido, rol: 'Paciente' });
      setModalVisibleRegistro(true);
    } catch (error) {
      console.log(error);
      switch (error.code) {
        case 'auth/email-already-in-use':
          alert('El correo electrónico ya está en uso por otro usuario.');
          break;
        case 'auth/invalid-email':
          alert('El correo electrónico no es válido.');
          break;
        case 'auth/operation-not-allowed':
          alert('La autenticación por correo electrónico y contraseña no está habilitada.');
          break;
        case 'auth/weak-password':
          alert('La contraseña no es lo suficientemente segura.');
          break;
        default:
          alert('Ocurrió un error inesperado.');
      }
    } finally {
      setLoading(false); // Asegurarse de que loading se apague en todos los casos
    }
  };

  const handleModalClose = () => {
    setModalVisible(false);
  };

  const handleModalCloseRegistro = () => {
    setModalVisibleRegistro(false);
    setIsModalClosedRegistro(true);
  };

  useEffect(() => {
    if (isModalClosedRegistro) {
      alert('El Paciente debe verificar su correo para poder iniciar sesión');
      navigation.navigate('LoginPaciente');
    }
  }, [isModalClosedRegistro, navigation]);

  return (
    <KeyboardAvoidingView behavior="height" keyboardVerticalOffset={Platform.select({ ios: 0, android: 35 })}>
      <ScrollView keyboardShouldPersistTaps='handled'>
        <View style={styles.ContenedorTitulo}>
          <Text style={styles.Titulo}>INHALIFE</Text>
        </View>
        <View style={styles.ContenedorInputs}>
          <TextInput
            style={styles.input}
            value={username}
            placeholder='Nombre de Usuario:'
            placeholderTextColor={'black'}
            autoCapitalize='none'
            onChangeText={setUsername}
            returnKeyType='next'
            onSubmitEditing={() => { nombreRef.current.focus(); }}
            blurOnSubmit={false}
          />
          <TextInput
            ref={nombreRef}
            style={styles.input}
            value={nombre}
            placeholder='Nombres:'
            placeholderTextColor={'black'}
            autoCapitalize='none'
            onChangeText={setNombre}
            returnKeyType='next'
            onSubmitEditing={() => { apellidoRef.current.focus(); }}
            blurOnSubmit={false}
          />
          <TextInput
            ref={apellidoRef}
            style={styles.input}
            value={apellido}
            placeholder='Apellidos:'
            placeholderTextColor={'black'}
            autoCapitalize='none'
            onChangeText={setApellido}
            returnKeyType='next'
            onSubmitEditing={() => { emailRef.current.focus(); }}
            blurOnSubmit={false}
          />
          <TextInput
            ref={emailRef}
            style={styles.input}
            value={email}
            placeholder='Correo Electronico:'
            placeholderTextColor={'black'}
            autoCapitalize='none'
            onChangeText={setEmail}
            returnKeyType='next'
            onSubmitEditing={() => { contraseñaRef.current.focus(); }}
            blurOnSubmit={false}
          />
          <View style={styles.passwordContainer}>
            <TextInput
              ref={contraseñaRef}
              style={styles.inputPassword}
              value={contraseña}
              placeholder='Contraseña:'
              placeholderTextColor={'black'}
              autoCapitalize='none'
              secureTextEntry={secureTextEntry}
              onChangeText={setContraseña}
              returnKeyType='next'
              onSubmitEditing={() => { confirmarContraseñaRef.current.focus(); }}
              blurOnSubmit={false}
            />
            <Pressable onPress={() => setSecureTextEntry(!secureTextEntry)}>
              <MaterialIcons name={secureTextEntry ? 'visibility-off' : 'visibility'} size={24} color="black" />
            </Pressable>
          </View>
          <View style={styles.passwordContainer}>
            <TextInput
              ref={confirmarContraseñaRef}
              style={styles.inputPassword}
              value={confirmarContraseña}
              placeholder='Confirmar Contraseña:'
              placeholderTextColor={'black'}
              autoCapitalize='none'
              secureTextEntry={secureConfirmEntry}
              onChangeText={setConfirmarContraseña}
              returnKeyType='done'
              onSubmitEditing={ValidacionesYRegistro}
            />
            <Pressable onPress={() => setSecureConfirmEntry(!secureConfirmEntry)}>
              <MaterialIcons name={secureConfirmEntry ? 'visibility-off' : 'visibility'} size={24} color="black" />
            </Pressable>
          </View>
        </View>
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size={'large'} color={'#00AAE4'} />
          </View>
        ) : (
          <Pressable style={styles.ContenedorBotonRegistro} onPress={ValidacionesYRegistro}>
            <Text style={styles.TextoRegistrarse}>REGISTRARSE</Text>
          </Pressable>
        )}
        <Text style={styles.textoIngresa}>¿Ya tienes cuenta? <Text style={styles.textoRojo} onPress={goToLogin}>Ingresa</Text>.</Text>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={handleModalClose}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={styles.modalContainer}>
                <Text style={styles.modalText}>Este usuario ya está registrado. Por favor, ingresa otro nombre de usuario.</Text>
                <Pressable style={[styles.button, styles.buttonClose]} onPress={handleModalClose}>
                  <Text style={styles.textStyle}>Cerrar</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisibleRegistro}
          onRequestClose={handleModalCloseRegistro}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={styles.modalContainer}>
                <Text style={styles.modalText}>¡¡¡Te registraste Correctamente!!!</Text>
                <Pressable style={[styles.button, styles.buttonClose]} onPress={handleModalCloseRegistro}>
                  <Text style={styles.textStyle}>Cerrar</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default RegistroPaciente;

const styles = StyleSheet.create({
  container: {
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
    // padding: hp('1%'),
    fontFamily: 'Play-fair-Display',
    margin: hp('1%'),
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: hp('1.3%'),
    marginHorizontal: wp('2%'),
    borderBottomWidth: 1,
    paddingBottom: hp('1%'),
  },
  inputPassword: {
    flex: 1,
    fontSize: hp('1.7%'),
    fontFamily: 'Play-fair-Display',
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
  loadingContainer: {
    marginTop: hp('12%'),
    alignItems: 'center',
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
    backgroundColor: '#00AAE4'
  },
  buttonClose: {
    backgroundColor: '#00AAE4',
    marginTop: 10,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center'
  },
});
