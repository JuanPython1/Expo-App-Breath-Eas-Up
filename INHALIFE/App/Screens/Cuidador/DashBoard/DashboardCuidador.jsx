import { View, Text, SafeAreaView, StyleSheet, Pressable, Image } from 'react-native'
import React, {useState} from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import  Menu  from 'react-native-vector-icons/MaterialCommunityIcons';
import ModalCerrarCuenta from '../../../../Components/ModalCerrarCuenta';

const DashboardCuidador = ({navigation}) => {

  const [modalVisible, setModalVisible] = useState(false);

  return (
      <SafeAreaView style={styles.container}> 

      {/* ------------------------HEADER---------------------- */}
      <View style={styles.header}>
      <Pressable style={styles.contenedorAtras} onPress={() => { navigation.navigate('LoginCuidador') }}>
        <Image style={styles.iconAtras} source={require('../../../../assets/Image/Flechaatras.png')} />
      </Pressable>

      <Pressable style={styles.menu} onPress={() => { setModalVisible(true) }}>
        <Menu name={'menu'} size={60} color={'black'}/>
      </Pressable>

      </View>

      {/* ------------------------BODY---------------------- */}

      <View style={styles.body}>

      <View style={styles.ContenedorTitulo}>
        <Text style={styles.Titulo}>INHALIFE</Text>
      </View>



      <View style={styles.fila2}>
      <Pressable style={styles.boton} onPress={()=> navigation.navigate('RecordatorioDosisCompartidos')}>
      <Text style={styles.textTitulo}>RECORDATORIOS DOSIS COMPARTIDOS</Text>
      <Image style={styles.Imagen} source={require('../../../../assets/Image/calendario.png')}/>
      </Pressable>

      </View>

      </View>

      {/* ------------------------MODAL---------------------- */}
      <ModalCerrarCuenta 
      modalVisible={modalVisible} 
      setModalVisible={setModalVisible}
      color={'#FB666F'}
      />

      </SafeAreaView>
  )
}

export default DashboardCuidador

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: hp('100%'),
    width: wp('100%'),
    backgroundColor: '#FF9595',
  },
  header:{
    flexDirection: 'row',
    height: hp('10%'),
    alignItems: 'center',
  },
  contenedorAtras: {
    left: wp('5%'),
    height: hp('5%'),
    width: wp('15%'),

    justifyContent: 'center',
  },

  menu:{
    left: wp('27%'),
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
    backgroundColor: '#F94242',
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
  fila1:{
    flexDirection: 'row',
    top: hp('6%')
  },
  RegistroDosis:{
    marginHorizontal: wp('4%')
  },
  fila2:{
    top: hp('8%'),
    alignItems: 'center'
  },
  boton: {
    width: wp('54%'),
    height: hp('35%'),
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F94242'
    },  
    Imagen: {
      width: wp('40%'),
      height: hp('22'),
    },
    textTitulo:{
      fontFamily: 'Play-fair-Display',
      fontWeight: 'bold',
      fontSize: wp('4%'),
      marginBottom: '5%',
      textAlign: 'center'
}
})