import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, Image, Animated } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { doc, getDoc } from 'firebase/firestore';
import { FIREBASE_AUTH, FIRESTORE_DB } from '../../../../Firebase/config';

const BienvenidaPaciente = ({ navigation }) => {
  const [userData, setUserData] = useState('');
  const fadeAnim = useRef(new Animated.Value(0)).current; // Valor inicial de opacidad 0

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

  console.log(userData);

  return (
    <View style={styles.contenedor}>
      <View style={styles.ContenedorBienvenida}>
        <Animated.Text style={[styles.tituloNombre, { opacity: fadeAnim }]}>
          {`Bienvenid@\n ${userData.nombreUsuario}`}
        </Animated.Text>
        <Image source={require('../../../../assets/Image/perro.png')} style={styles.imagenPerro} />
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
    height: hp('40%'),
    top: hp('6%'),
    left: wp('18%'),
    marginVertical: hp('3%')
  }
});
