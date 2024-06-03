// ModalComponent.js
import React from 'react';
import { Modal, View, Text, TouchableHighlight, StyleSheet } from 'react-native';
import Off from 'react-native-vector-icons/AntDesign';
import IconAtras from 'react-native-vector-icons/Ionicons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const ModalCerrarCuenta = ({ modalVisible, setModalVisible, cerrarSession, color, colorFondo }) => {

  const styles = StyleSheet.create({
    modalView: {
      position: 'absolute',
      backgroundColor: `${colorFondo}`,
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
  });


  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <View style={styles.modalView}>
        <Text style={styles.modalText}>CERRAR SESION</Text>

        <TouchableHighlight
          style={{ ...styles.BotonCerrarSesion, backgroundColor: `${color}` }}
          onPress={cerrarSession}
        >
          <Off name={'poweroff'} size={32} color={'black'} />
        </TouchableHighlight>

        <TouchableHighlight
          style={{ ...styles.BotonAtras, backgroundColor: `${color}` }}
          onPress={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <IconAtras name={'return-down-back-outline'} size={32} color={'black'} />
        </TouchableHighlight>
      </View>
    </Modal>
  );
};



export default ModalCerrarCuenta;
