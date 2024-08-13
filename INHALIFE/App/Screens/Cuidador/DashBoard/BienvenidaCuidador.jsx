import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, Image, Animated } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { doc, getDoc } from 'firebase/firestore';
import { FIREBASE_AUTH, FIRESTORE_DB } from '../../../firebase/config';

import { t } from 'i18next';

const BienvenidaCuidador = ({ navigation }) => {
  const [userData, setUserData] = useState('');
  const fadeAnim = useRef(new Animated.Value(0)).current; // Valor inicial de opacidad 0

  useEffect(() => {
    const getUserData = async () => {
      try {
        if (FIREBASE_AUTH.currentUser) {
          const userDoc = await getDoc(doc(FIRESTORE_DB, 'UsuariosCuidadores', FIREBASE_AUTH.currentUser.uid));
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
      duration: 3000, // Duración de la animación en milisegundos
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  useEffect(() => {
    const delayTime = 4000; // Tiempo de retraso en milisegundos

    const timeout = setTimeout(() => {
      // Navega a la siguiente pantalla después del tiempo de retraso
      navigation.replace('DashboardCuidador');
    }, delayTime);

    // Limpia el temporizador cuando el componente se desmonta
    return () => clearTimeout(timeout);
  }, [navigation]);

  return (
    <View style={styles.contenedor}>
      <View style={styles.ContenedorBienvenida}>
        <Animated.Text style={[styles.tituloNombre, { opacity: fadeAnim }]}>
          {t('Bienvenida')}
          {userData.nombreUsuario}
        </Animated.Text>
        <Image source={require('../../../../assets/Image/dino.png')} style={styles.imagenDino} />
      </View>
    </View>
  );
};

export default BienvenidaCuidador;

const styles = StyleSheet.create({
  contenedor: {
    width: wp('100%'),
    height: hp('100%'),
    backgroundColor: '#AADBFF'
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
  imagenDino: {
    width: wp('55%'),
    height: hp('40%'),
    top: hp('6%'),
    marginVertical: hp('3%')
  }
});
