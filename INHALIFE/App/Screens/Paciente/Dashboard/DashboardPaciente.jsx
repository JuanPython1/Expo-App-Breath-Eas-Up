import {
  View, Text, SafeAreaView, StyleSheet,
  Pressable, Image, Modal, TouchableHighlight
} from 'react-native'
import React, { useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Menu from 'react-native-vector-icons/MaterialCommunityIcons';
import BotonDashBoardPaciente from '../../../../Components/BotonDashBoardPaciente';
import ModalCerrarCuenta from '../../../../Components/ModalCerrarCuenta';
import { FIREBASE_AUTH } from '../../../../Firebase/config'

const DashboardPaciente = ({ navigation }) => {

  const [modalVisible, setModalVisible] = useState(false);

  const botonRegistrarDosis = {
    titulo: 'REGISTRO DE DOSIS',
    imagen: require('../../../../assets/Image/inhalador.png'),
    funcion: () => { navigation.navigate('BienvenidaRegistroDosis') }
  }

  const botonRecordatorioDosis = {
    titulo: 'RECORDATORIO DOSIS',
    imagen: require('../../../../assets/Image/calendario.png'),
    funcion: () => { navigation.navigate('RecordatorioDosis') }
  }

  const botonVideosTutoriales = {
    titulo: 'VIDEO TUTORIAL',
    imagen: require('../../../../assets/Image/videotutorial.png'),
    funcion: () => { navigation.navigate('VideoTutoriales') }
  }

  const handleSignOut = async () => {
    try {
      await FIREBASE_AUTH.signOut();
      navigation.navigate('Rol'); // Redirige a la pantalla de inicio de sesión del cuidador
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

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


        <View style={styles.fila1}>
          <View style={styles.RegistroDosis}>
            <BotonDashBoardPaciente props={botonRegistrarDosis} />
          </View>

          <View style={styles.RecordatorioDosis}>
            <BotonDashBoardPaciente props={botonRecordatorioDosis} />
          </View>
        </View>

        <View style={styles.fila2}>
          <BotonDashBoardPaciente props={botonVideosTutoriales} />

        </View>

      </View>

      {/* ------------------------MODAL---------------------- */}
      <ModalCerrarCuenta
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        cerrarSession={handleSignOut}
        color={'#94E4FF'}
        colorFondo={'#3498DB'}
      />

    </SafeAreaView>
  )
}

export default DashboardPaciente

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: hp('100%'),
    width: wp('100%'),
    backgroundColor: '#3498DB',
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
    height: hp('90'),
  },
  ContenedorTitulo: {
    top: hp('1%'),
    height: hp('9%'),
    width: wp('100%'),
    marginBottom: hp('3%'),
    backgroundColor: '#94E4FF',
    alignSelf: 'center',
    borderRadius: 20,
    alignItems: 'center', //horizontal
    justifyContent: 'center', //vertical
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
  modalView: {
    position: 'absolute',
    backgroundColor: "#D0D0D0",
    alignItems: "center",
    shadowColor: "#000",
    height: wp('210%'),
    width: wp('100%'),
    justifyContent: 'center',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalText: {
    marginBottom: hp('2%'),
    textAlign: "center",
    fontSize: wp('6%'),
    fontFamily: 'Play-fair-Display'
  },
  BotonCerrarSesion: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    width: wp('80%'),
    alignItems: 'center',
    padding: 10,
    elevation: 50,
    marginBottom: hp('2%'),
  },
  BotonAtras: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    width: wp('15%'),
    alignItems: 'center',
    padding: 10,
    elevation: 50
  },

})
