import { doc, getDoc, onSnapshot } from 'firebase/firestore';
import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Animated, Image, StyleSheet, View } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { FIREBASE_AUTH, FIRESTORE_DB } from '../../../firebase/config';
import { t } from 'i18next';

const BienvenidaCuidador = ({ navigation }) => {
  const [userData, setUserData] = useState('');
  const fadeAnim = useRef(new Animated.Value(0)).current;

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
      toValue: 1,
      duration: 3000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  useEffect(() => {
    const delayTime = 4000;
    const timeout = setTimeout(() => {
      navigation.replace('DashboardCuidador');
    }, delayTime);
    return () => clearTimeout(timeout);
  }, [navigation]);

  const [imagenBienvenida, setimagenBienvenida] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(FIRESTORE_DB, 'UsuariosCuidadores', FIREBASE_AUTH.currentUser.uid), (doc) => {
      const imagen = doc.data().imagenBienvenida;
      setimagenBienvenida(imagen);
      setIsLoading(false);
    });

    return () => {
      unsubscribe();
      setIsLoading(true);
    };
  }, []);

  return (
    <View style={styles.contenedor}>
      <View style={styles.ContenedorBienvenida}>
        <Animated.Text style={[styles.tituloNombre, { opacity: fadeAnim }]}>
          {t('Bienvenida')}
          {userData.nombreUsuario}
        </Animated.Text>

        {isLoading ? (
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        ) : (
          <View style={styles.contenedorImg}>
            <Image source={{ uri: imagenBienvenida }} style={styles.imagenDino} />
          </View>
        )}
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
  contenedorImg: {
    marginVertical: hp('3%'),
    width: wp('50%'),
    height: wp('50%'),        // igual ancho y alto para círculo
    borderRadius: wp('50%'),
    overflow: 'hidden',
    borderWidth: 10,
    borderColor: '#94E4FF',
    backgroundColor: '#94E4FF',
    justifyContent: 'center',
    alignItems: 'center'
  },
  imagenDino: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover'
  }
});
