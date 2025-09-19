import React from 'react';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AnimationComponent from './AnimationComponent';

const BotonDashBoardPaciente = ({ props }) => {
  const { titulo, imagen, funcion } = props;

  return (
    <AnimationComponent>
      <Pressable style={styles.boton} onPress={funcion}>
        <Text style={styles.textTitulo}>{titulo}</Text>
        <Image style={styles.Imagen} source={imagen} resizeMode='contain' />
      </Pressable>
    </AnimationComponent>
  );
};

export default BotonDashBoardPaciente;

const styles = StyleSheet.create({
  boton: {
    width: wp('44%'),
    height: hp('25%'),
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#94E4FF',
    borderWidth: 1,
  },
  Imagen: {
    width: '70%',
    height: '70%',
  },
  textTitulo: {
    textAlign: 'center',
    fontFamily: 'Play-fair-Display',
    fontWeight: 'bold',
    marginBottom: '5%',
  },
});
