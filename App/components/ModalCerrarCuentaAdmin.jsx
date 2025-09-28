// ModalComponent.js
import React from 'react';
import { Modal, View, Text, TouchableHighlight, StyleSheet, Pressable, Image } from 'react-native';
import Off from 'react-native-vector-icons/AntDesign';
import IconAtras from 'react-native-vector-icons/Ionicons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useTranslation } from 'react-i18next';

const ModalCerrarCuenta = ({ modalVisible, setModalVisible, cerrarSession, color, colorFondo }) => {

  const { t } = useTranslation();


  const styles = StyleSheet.create({
    modalView: {
      position: 'relative',
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
    imgAtras : {
      width: wp('14%'),
      height: hp('5%'),
    },
    BotonEditar: {
      position: 'absolute',
      top: hp('3.5%'), // Ajusta la distancia desde la parte superior
      right: wp('6%'), // Ajusta la distancia desde la derecha
      borderRadius: 5,
    }
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

        <Text style={styles.modalText}>{t("CerrarSesion")}</Text>

        <Pressable
          onPress={cerrarSession}
          style={({ pressed }) => [
            styles.BotonCerrarSesion,
            { backgroundColor: pressed ? "#ffffffff" : color } // cambia de color al presionar
          ]}
        >
          <Off name={'poweroff'} size={32} color={'black'} />
        </Pressable>

       <Pressable
          onPress={() => setModalVisible(!modalVisible)}
          style={({ pressed }) => [
            styles.BotonAtras,
            { backgroundColor: pressed ? "#ffffffff" : color }
          ]}
        >
          <Image style={styles.imgAtras} source={require('../../assets/Image/manoAtras.png')} />
        </Pressable>
      </View>
    </Modal>
  );
};



export default ModalCerrarCuenta;
