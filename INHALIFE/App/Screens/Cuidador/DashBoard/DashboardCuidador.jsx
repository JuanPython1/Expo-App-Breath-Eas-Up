import { View, Text, SafeAreaView, StyleSheet, Pressable, Image, BackHandler } from 'react-native';
import React, { useState, useCallback } from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useFocusEffect } from '@react-navigation/native';
import Menu from 'react-native-vector-icons/MaterialCommunityIcons';
import ModalCerrarCuenta from '../../../components/ModalCerrarCuenta';
import { FIREBASE_AUTH } from '../../../firebase/config';

import { useTranslation } from 'react-i18next';

const DashboardCuidador = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const { t } = useTranslation();

  const handleSignOut = async () => {
    try {
      await FIREBASE_AUTH.signOut();
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      const backAction = () => {
        BackHandler.exitApp(); // Salir de la aplicación
        return true;
      };

      const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

      return () => backHandler.remove();
    }, [])
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* ------------------------HEADER---------------------- */}
      <View style={styles.header}>
        <Pressable style={styles.menu} onPress={() => { setModalVisible(true) }}>
          <Menu name={'menu'} size={60} color={'black'} />
        </Pressable>
      </View>

      {/* ------------------------BODY---------------------- */}
      <View style={styles.body}>
        <View style={styles.ContenedorTitulo}>
          <Text style={styles.Titulo}>INHALIFE</Text>
        </View>

        <View style={styles.fila2}>
          <Pressable style={styles.boton} onPress={() => navigation.navigate('RecordatorioDosisCompartidos')}>
            <Text style={styles.textTitulo}>{t("RecordatoriosCuidador.TituloDashboard")}</Text>
            <Image style={styles.Imagen} source={require('../../../../assets/Image/calendario.png')} />
          </Pressable>
        </View>
      </View>

      {/* ------------------------MODAL---------------------- */}
      <ModalCerrarCuenta
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        cerrarSession={handleSignOut}
        color={'#52B4FA'}
        colorFondo={'#AADBFF'}
      />
    </SafeAreaView>
  );
};

export default DashboardCuidador;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: hp('100%'),
    width: wp('100%'),
    backgroundColor: '#AADBFF',
  },
  header: {
    flexDirection: 'row',
    height: hp('10%'),
    alignItems: 'center',
    alignSelf: 'center'
  },
  contenedorAtras: {
    left: wp('5%'),
    height: hp('5%'),
    width: wp('15%'),
    justifyContent: 'center',
  },
  menu: {
    justifyContent: 'center',
  },
  iconAtras: {
    width: wp('10%'),
    height: hp('2.5%'),
  },
  body: {
    height: hp('90%'),
  },
  ContenedorTitulo: {
    top: hp('1%'),
    height: hp('9%'),
    width: wp('100%'),
    marginBottom: hp('3%'),
    alignSelf: 'center',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  Titulo: {
    fontFamily: 'noticia-text',
    fontSize: hp('4%'),
    color: 'black',
    textShadowColor: 'black',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
    transform: [{ scaleY: 1.2 }],
  },
  fila1: {
    flexDirection: 'row',
    top: hp('6%')
  },
  RegistroDosis: {
    marginHorizontal: wp('4%')
  },
  fila2: {
    top: hp('8%'),
    alignItems: 'center'
  },
  boton: {
    width: wp('54%'),
    height: hp('35%'),
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#52B4FA'
  },
  Imagen: {
    width: wp('40%'),
    height: hp('22%'),
  },
  textTitulo: {
    fontFamily: 'Play-fair-Display',
    fontWeight: 'bold',
    fontSize: wp('4%'),
    marginBottom: '5%',
    textAlign: 'center'
  }
});
