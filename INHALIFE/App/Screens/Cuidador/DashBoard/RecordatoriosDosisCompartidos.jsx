import { View, Text, StyleSheet, Pressable, Image, ScrollView } from 'react-native'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { collection, deleteDoc, doc, onSnapshot, query, where, getDoc } from 'firebase/firestore';
import React, { useState, useEffect, useRef } from 'react';
import RecordatorioItemCompartido from '../../../components/RecordatorioItemCompartido'
import { FIREBASE_AUTH, FIRESTORE_DB } from '../../../firebase/config';
import * as Notifications from 'expo-notifications'

const RecordatoriosDosisCompartidos = ({ navigation }) => {
  const [recordatoriosCompartidos, setRecordatoriosCompartidos] = useState([]);
  const [notificacionEnviada, setNotificacionEnviada] = useState(false);

  useEffect(() => {
    const user = FIREBASE_AUTH.currentUser;
    const unsubscribe = onSnapshot(
      query(collection(FIRESTORE_DB, 'RecordatoriosDosis'), where('cuidadorUID', '==', user?.uid)), // Filtrar por UID del usuario actual
      (snapshot) => {
        const updatedRecordatorios = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setRecordatoriosCompartidos(updatedRecordatorios);

      }
    );

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    recordatoriosCompartidos.forEach((recordatorio) => {
      if (recordatorio.DosisInicial >= recordatorio.Dosis80Porciento && recordatorio.DosisInicial < recordatorio.TotalDosis && !notificacionEnviada) {
        sendNotification(recordatorio);
        setNotificacionEnviada(true);
      }
    });
  }, [recordatoriosCompartidos]);

  const sendNotification = async (recordatorio) => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: '¡¡¡¡El Paciente debe recargar la dosis!!!!',
        body: `El paciente ${recordatorio.nombreUsuario}, ya paso al 80% de su cantidad de dosis. ¡Debe recargarlo lo antes posible!`,
      },
      trigger: null, // enviar inmediatamente
    });
  };


  return (
    <View style={styles.Container}>
      <View style={styles.header}>
        <Pressable style={styles.contenedorAtras} onPress={() => { navigation.navigate('DashboardCuidador') }}>
          <Image style={styles.iconAtras} source={require('../../../../assets/Image/Flechaatras.png')} />
        </Pressable>
      </View>

      <View style={styles.body}>

        <View style={styles.fondoTitulo}>
          <Text style={styles.TituloRecordatorios}>RECORDATORIOS COMPARTIDOS</Text>
        </View>



        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.RecordatorioContainer}>
            {recordatoriosCompartidos.map((recordatoriosCompartidos) => (
              <RecordatorioItemCompartido
                key={recordatoriosCompartidos.id}
                recordatorioCompartido={recordatoriosCompartidos}
                funcionNav={() => { navigation.navigate('InfoRecordatorioDosisCompartida', { recordatorio: recordatoriosCompartidos }) }} />
            ))}
          </View>
        </ScrollView>

      </View>

    </View>
  )
}

export default RecordatoriosDosisCompartidos

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
    backgroundColor: '#AADBFF',
  },
  fondoTitulo: {
    marginTop: hp('2%'),
    height: hp('14%'),
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
  },
  scrollContainer: {
    flexGrow: 1,
    marginTop: hp('3%')
  },
  RecordatorioContainer: {
    flexDirection: 'column',
    borderRadius: 5,
    marginVertical: '5%',
  },


})