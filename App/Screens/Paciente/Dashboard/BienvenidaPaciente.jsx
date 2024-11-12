import { doc, getDoc, onSnapshot } from 'firebase/firestore';
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Animated, BackHandler, Image, StyleSheet, View } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { FIREBASE_AUTH, FIRESTORE_DB } from '../../../firebase/config';

const BienvenidaPaciente = ({ navigation }) => {
  const [userData, setUserData] = useState('');
  const fadeAnim = useRef(new Animated.Value(0)).current; // Valor inicial de opacidad 0

  const { t } = useTranslation();

  useEffect(() => {
    const getUserData = async () => {
      try {
        if (FIREBASE_AUTH.currentUser) {
          const userDoc = await getDoc(doc(FIRESTORE_DB, 'UsuariosPacientes', FIREBASE_AUTH.currentUser.uid));
          if (userDoc.exists()) {
            setUserData(userDoc.data());
          }
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    getUserData();
  }, [FIRESTORE_DB]);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1, // Valor final de opacidad 1
      duration: 2000, // Duración de la animación en milisegundos
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  useEffect(() => {
    const delayTime = 4000; // Tiempo de retraso en milisegundos

    const timeout = setTimeout(() => {
      // Navega a la siguiente pantalla después del tiempo de retraso
      navigation.replace('DashboardPaciente');
    }, delayTime);

    // Limpia el temporizador cuando el componente se desmonta
    return () => clearTimeout(timeout);
  }, [navigation]);

  useEffect(() => {
    const onBackPress = () => {
      if (navigation.isFocused()) {
        BackHandler.exitApp();
        return true;
      }
      return false;
    };

    BackHandler.addEventListener('hardwareBackPress', onBackPress);

    return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
  }, [navigation]);

  const [imagenBienvenida, setimagenBienvenida] = useState(null);

  useEffect(() => {

    const unsubscribe = onSnapshot(doc(FIRESTORE_DB, 'UsuariosPacientes', FIREBASE_AUTH.currentUser.uid), (doc) => {
      const imagen = doc.data().imagenBienvenida;
      setimagenBienvenida(imagen);
    });

    return () => {
      unsubscribe();
    };

  }, [])

  console.log(userData);

  return (
    <View style={styles.contenedor}>
      <View style={styles.ContenedorBienvenida}>
        <Animated.Text style={[styles.tituloNombre, { opacity: fadeAnim }]}>
          {t('Bienvenida')}
          {`${userData.nombreUsuario}`}
        </Animated.Text>

        <Image source={{ uri: imagenBienvenida }} style={styles.imagenPerro} />
      </View>
    </View>
  );
};

export default BienvenidaPaciente;

const styles = StyleSheet.create({
  contenedor: {
    width: wp('100%'),
    height: hp('100%'),
    backgroundColor: '#3498DB'
  },
  ContenedorBienvenida: {
    height: hp('70%'),
    marginVertical: hp('13%'),
    alignItems: 'center',
    justifyContent: 'center'
  },
  tituloNombre: {
    textAlign: 'center',
    fontSize: wp('7%'),
    fontFamily: 'noticia-text'
  },
  imagenPerro: {
    width: wp('55%'),
    height: hp('42%'),
    top: hp('6%'),
    marginVertical: hp('3%')
  }
});
