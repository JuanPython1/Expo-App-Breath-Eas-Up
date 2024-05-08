import { View, Text, SafeAreaView , StyleSheet, Image, StatusBar} from 'react-native'
import React from 'react'
import { useFonts } from 'expo-font';
import BotonRol from '../../Components/BotonRol';

const Rol = ({navigation}) => {
  //fuentes
  const [loaded] = useFonts({
    'noticia-text': require('../../assets/fonts/NoticiaText-Regular.ttf'),
    'Play-fair-Display': require('../../assets/fonts/PlayfairDisplay-VariableFont_wght.ttf'),
  });

  if (!loaded) {
    return null;
  }


  //botones roles
  const botonInfoPaciente = {Titulo: "PACIENTE", colorFondo: '#00AAE4', fuente: 'Play-fair-Display', navegacion: () => navigation.navigate('LoginPaciente') }
  const botonInfoCuidador = {Titulo: "CUIDADOR", colorFondo: '#F94242', fuente: 'Play-fair-Display', navegacion: () => navigation.navigate('LoginCuidador')}

  

  return (
    <SafeAreaView style={styles.container}>
    <StatusBar style="auto" backgroundColor="#00AAE4" />
    <Image style={styles.niña} source={require('../../assets/Image/Niña.png')} />
    

    <View style={styles.ContenedorTitulo} >
      <Text style={styles.Titulo}>INHALIFE</Text>
    </View>


    <View style={styles.RolContainer}>
      <Text style={styles.TextoElijeRol}>ELIJE TU ROL</Text>

      <View style={styles.contenedorPaciente}>
      <BotonRol props={botonInfoPaciente}/>
      </View>

      <View style={styles.ContenedorO}>
      <Text style={{fontSize: 30, fontFamily: 'Play-fair-Display'}}>O</Text>
      </View>

      <View style={styles.contenedorCuidador}>
      <BotonRol props={botonInfoCuidador}/>
      </View>

    </View>


    <Image style={styles.niño} source={require('../../assets/Image/Niño.png')} />

    </SafeAreaView>
  )
}

export default Rol

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'F1F1F1',
    justifyContent: 'flex-start', 
    paddingTop: 30, 
  },
 
  niña: {
    left: '5%',
    width: 150,
    height: 150,
  },
  niño: {
    width: 150,
    height: 180,
    top: '15%',
    left: '60%'
  },

  ContenedorTitulo:{
    top: '1%',
    height: '10%',
    width: '70%',
    backgroundColor: '#00AAE4',
    alignSelf: 'center',
    borderRadius: 30,
    alignItems: 'center', //horizontal
    justifyContent: 'center' //vertical
  }, 

  Titulo:{
      fontFamily: 'noticia-text',
      fontSize: 25,
      color: '#F5F5F5',
      textShadowColor: 'black',
      textShadowOffset: { width: 1, height: 1 },
      textShadowRadius: 1,
      transform: [{ scaleY: 1.2}],
  },

  RolContainer: {
    paddingTop: 80,
    alignItems: 'center',
  },

  TextoElijeRol: {
      color: 'rgba(0, 0, 0, 0.8)',
      fontFamily: 'Play-fair-Display',
      fontSize: 20,
      marginBottom:'7%'
  },

  contenedorPaciente: {
    width: '25%',

  },

  ContenedorO: {
      width: '25%',
      height: 50,
      alignItems: 'center',
      marginVertical: 10,
  },  

  contenedorCuidador: {
    width: '25%',
  },


});
