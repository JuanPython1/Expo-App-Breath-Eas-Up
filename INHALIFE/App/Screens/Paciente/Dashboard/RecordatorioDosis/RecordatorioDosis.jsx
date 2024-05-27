import { View, Text, StyleSheet, Pressable, Image } from 'react-native'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import React from 'react'
import RecordatorioItem from '../../../../../Components/RecordatorioItem'

const RecordatoriosDosis = ({ navigation }) => {
  return (
    <View style={styles.Container}>
      <View style={styles.header}>
        <Pressable style={styles.contenedorAtras} onPress={() => { navigation.navigate('DashboardPaciente') }}>
          <Image style={styles.iconAtras} source={require('../../../../../assets/Image/Flechaatras.png')} />
        </Pressable>
      </View>

      <View style={styles.body}>

        <View style={styles.fondoTitulo}>
          <Text style={styles.TituloRecordatorios}>TUS RECORDATORIOS</Text>
        </View>

        <RecordatorioItem funcionNav={() => { navigation.navigate('InfoRecordatorioDosisPaciente') }} />


      </View>

    </View>
  )
}

export default RecordatoriosDosis

const styles = StyleSheet.create({
  Container: {
    height: hp('100%')
  },
  header: {
    height: hp('10%'),
    backgroundColor: '#3498DB',
    justifyContent: 'center'
  },
  contenedorAtras: {
    left: wp('5%'),
    height: hp('5%'),
    width: wp('15%'),
    justifyContent: 'center',
  },
  iconAtras: {
    width: wp('10%'),
    height: hp('2.5%'),
  },
  body: {
    height: hp('90'),
    backgroundColor: '#3498DB',
  },
  fondoTitulo: {
    backgroundColor: '#94E4FF',
    height: hp('9%'),
    marginBottom: hp('5%'),
    justifyContent: 'center',


  },
  TituloRecordatorios: {
    fontFamily: 'noticia-text',
    fontSize: hp('4%'),
    color: 'black',
    textShadowColor: 'black',
    textShadowRadius: 1,
    transform: [{ scaleX: 0.8 }, { scaleY: 1.2 }],
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
    textAlign: 'center'
  }


})