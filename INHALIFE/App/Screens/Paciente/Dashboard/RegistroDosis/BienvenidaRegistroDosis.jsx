import { View, Text, StyleSheet, Image } from 'react-native'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import React, { useEffect } from 'react'


const BienvenidaRegistroDosis = ({ navigation }) => {
  useEffect(() => {
    const delayTime = 5000; // Tiempo de retraso en milisegundos (2 segundos en este caso)

    const timeout = setTimeout(() => {
      // Navega a la siguiente pantalla después del tiempo de retraso
      navigation.replace('Medicamento');
    }, delayTime);

    // Limpia el temporizador cuando el componente se desmonta
    return () => clearTimeout(timeout);
  }, [navigation]);

  return (
    <View style={styles.contenedor}>
      <View style={styles.ContenedorBienvenida}>
        <Text style={styles.tituloNombre}>{`Bienvenid@ Al Registro\n Llena el registro de la Dosis recomendada por tu cuidador`}</Text>
        <Image source={require('../../../../../assets/Image/inhalador.png')} style={styles.imagenInhalador} />
      </View>
    </View>
  );
}
export default BienvenidaRegistroDosis

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
  imagenInhalador: {
    width: wp('52%'),
    height: hp('25%'),
    top: hp('6%'),
    left: wp('10%'),
    marginVertical: hp('3%')
  }

})