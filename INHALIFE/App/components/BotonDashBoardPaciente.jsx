import { View, Text, Image, StyleSheet, Pressable } from 'react-native'
import React from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const BotonDashBoardPaciente = ({ props }) => {

  const { titulo, imagen, funcion } = props;

  return (
    <Pressable style={styles.boton} onPress={funcion}>
      <Text style={styles.textTitulo}>{titulo}</Text>
      <Image style={styles.Imagen} source={imagen} />
    </Pressable>
  )
}
export default BotonDashBoardPaciente

const styles = StyleSheet.create({
  boton: {
    width: wp('44%'),
    height: hp('25%'),
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#94E4FF'
  },
  Imagen: {
    width: 160,
    height: 150,
  },
  textTitulo: {
    fontFamily: 'Play-fair-Display',
    fontWeight: 'bold',
    marginBottom: '5%'
  }
})