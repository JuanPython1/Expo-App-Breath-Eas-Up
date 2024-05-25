import { View, Text, StyleSheet, Image } from 'react-native'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { FIREBASE_AUTH, FIRESTORE_DB } from '../../../../Firebase/config'

const BienvenidaPaciente = ({ navigation }) => {
  const [userData, setUserData] = useState('');

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
    const delayTime = 4000; // Tiempo de retraso en milisegundos (2 segundos en este caso)

    const timeout = setTimeout(() => {
      // Navega a la siguiente pantalla después del tiempo de retraso
      navigation.replace('DashboardPaciente');
    }, delayTime);

    // Limpia el temporizador cuando el componente se desmonta
    return () => clearTimeout(timeout);
  }, [navigation]);

  console.log(userData)


  return (
    <View style={styles.contenedor}>
      <View style={styles.ContenedorBienvenida}>
        <Text style={styles.tituloNombre}>{`Bienvenid@\n ${userData.nombreUsuario}`}</Text>
        <Image source={require('../../../../assets/Image/perro.png')} style={styles.imagenPerro} />
      </View>
    </View>
  );
}
export default BienvenidaPaciente

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

})