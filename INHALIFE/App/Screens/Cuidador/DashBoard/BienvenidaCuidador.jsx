import { View, Text, StyleSheet, Image } from 'react-native'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import React, {useEffect} from 'react'

const BienvenidaCuidador = ({navigation}) => {
  useEffect(() => {
    const delayTime = 4000; // Tiempo de retraso en milisegundos (2 segundos en este caso)

    const timeout = setTimeout(() => {
      // Navega a la siguiente pantalla después del tiempo de retraso
      navigation.replace('DashboardCuidador');
    }, delayTime);

    // Limpia el temporizador cuando el componente se desmonta
    return () => clearTimeout(timeout);
  }, [navigation]);

  return (
    <View style={styles.contenedor}>
      <View style={styles.ContenedorBienvenida}>
        <Text style={styles.tituloNombre}>{`Bienvenida \n [nombre del usuario]`}</Text>
        <Image source={require('../../../../assets/Image/dino.png')} style={styles.imagenDino}/>
      </View>
    </View>
  );
}
export default BienvenidaCuidador

const styles = StyleSheet.create({
  contenedor: {
    width: wp('100%'),
    height: hp('100%'),
    backgroundColor: '#F94242'
  },

  ContenedorBienvenida:{
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
  imagenDino:{
    width: wp('55%'),
    height: hp('40%'),
    top: hp('6%'),
    marginVertical: hp('3%')
  }

})