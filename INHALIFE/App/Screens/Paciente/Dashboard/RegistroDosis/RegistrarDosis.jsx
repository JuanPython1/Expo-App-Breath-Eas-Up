import React, { useState, useEffect, useCallback } from 'react';
import { getDoc, doc, addDoc, collection } from 'firebase/firestore';
import { View, Text, StyleSheet, Pressable, Image, ScrollView, ActivityIndicator } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { FIRESTORE_DB, FIREBASE_AUTH } from '../../../../firebase/config';
import * as Notificaciones from 'expo-notifications';

const RegistrarDosis = ({ navigation, route }) => {
  const { medicamento, TotalDosis, Dosis80Porciento, horaDosisDiaria, cuidadorNombre, cuidadorUID } = route.params;
  const [userData, setUserData] = useState('');
  const DosisInicial = 0;
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    const getUserData = async () => {
      try {
        if (FIREBASE_AUTH.currentUser) {
          const userDoc = await getDoc(doc(FIRESTORE_DB, 'UsuariosPacientes', FIREBASE_AUTH.currentUser.uid));
          if (userDoc.exists()) {
            setUserData(userDoc.data());
          }
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    getUserData();
  }, []);

  const convertTo24Hour = (time) => {
    let [timePart, period] = time.split(' ');
    let [hours, minutes] = timePart.split(':');

    hours = parseInt(hours, 10);
    minutes = parseInt(minutes, 10);


    return { hour: hours, minute: minutes };
  };

  const scheduleDailyNotification = async (hour, minute) => {

    const notificationId = await Notificaciones.scheduleNotificationAsync({
      content: {
        title: "Recordatorio de dosis",
        body: `${userData.nombreUsuario} es hora de tomar tu dosis de ${medicamento}.`,
        sound: true,
        priority: Notificaciones.AndroidNotificationPriority.HIGH,
        sticky: false,
        vibrate: true,
      },
      trigger: {
        hour: hour,
        minute: minute,
        repeats: true,
      },
    });
    return notificationId;
  };

  const registerDose = useCallback(async () => {
    try {
      setLoading(true);
      const user = FIREBASE_AUTH.currentUser;

      // Convertir la horaDosisDiaria al formato de 24 horas
      const { hour, minute } = convertTo24Hour(horaDosisDiaria);

      console.log('hora= ' + hour + ':' + minute)

      // Programar la notificación y obtener el ID de la notificación
      const notificationId = await scheduleDailyNotification(hour, minute);

      // Guardar el recordatorio con el ID de la notificación en Firestore
      const recordatorioDocRef = collection(FIRESTORE_DB, 'RecordatoriosDosis');
      await addDoc(recordatorioDocRef, {
        medicamento,
        TotalDosis,
        Dosis80Porciento,
        horaDosisDiaria,
        cuidadorNombre,
        cuidadorUID,
        nombreUsuario: userData?.nombreUsuario || 'nadie',
        UsuarioId: user ? user.uid : null,
        DosisInicial,
        notificationId // Vincular el ID de la notificación
      });

      navigation.navigate('GraciasPorRegistrar');
    } catch (error) {
      console.error('Error adding document:', error);
    } finally {
      setLoading(false);
    }
  }, [medicamento, TotalDosis, Dosis80Porciento, horaDosisDiaria, cuidadorNombre, userData, DosisInicial, navigation]);

  const cancelRegistration = () => {
    navigation.navigate('DashboardPaciente');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Pressable style={styles.goBackButton} onPress={() => navigation.goBack()}>
          <Image style={styles.goBackIcon} source={require('../../../../../assets/Image/Flechaatras.png')} />
        </Pressable>
      </View>

      <View style={styles.body}>
        <Text style={styles.title}>DATOS REGISTRADOS DE TU DOSIS</Text>

        <Text style={styles.label}>Medicamento:</Text>
        <Text style={styles.text}>{medicamento}</Text>

        <Text style={styles.label}>Dosis Inicial:</Text>
        <Text style={styles.text}>{DosisInicial}</Text>

        <Text style={styles.label}>Dosis al 80%:</Text>
        <Text style={styles.text}>{Dosis80Porciento}</Text>

        <Text style={styles.label}>Total de dosis:</Text>
        <Text style={styles.text}>{TotalDosis}</Text>

        <Text style={styles.label}>Hora de dosis diaria:</Text>
        <Text style={styles.text}>{horaDosisDiaria}</Text>

        <Text style={styles.label}>Usuario:</Text>
        <Text style={styles.text}>{userData.nombreUsuario}</Text>

        <Text style={styles.label}>Cuidador seleccionado:</Text>
        <Text style={styles.text}>{cuidadorNombre}</Text>

        <Pressable style={styles.registerButton} onPress={registerDose} disabled={loading}>
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.registerButtonText}>REGISTRAR</Text>
          )}
        </Pressable>

        <Pressable style={styles.cancelButton} onPress={cancelRegistration} disabled={loading}>
          <Text style={styles.cancelButtonText}>CANCELAR REGISTRO</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default RegistrarDosis;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    height: hp('10%'),
    backgroundColor: '#3498DB',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  goBackButton: {
    position: 'absolute',
    left: wp('5%'),
    padding: wp('2%'),
  },
  goBackIcon: {
    width: wp('10%'),
    height: hp('2.5%'),
  },
  body: {
    padding: wp('5%'),
  },
  title: {
    fontSize: wp('6%'),
    fontWeight: 'bold',
    marginBottom: hp('4%'),
    color: '#333',
    textAlign: 'center',
  },
  label: {
    fontSize: wp('4.5%'),
    fontWeight: 'bold',
    marginBottom: hp('1%'),
    color: '#333',
  },
  text: {
    fontSize: wp('4%'),
    marginBottom: hp('2%'),
    color: '#555',
    backgroundColor: '#fff',
    padding: wp('2%'),
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  registerButton: {
    marginTop: hp('2%'),
    marginHorizontal: wp('5%'),
    height: hp('6%'),
    borderRadius: 5,
    borderWidth: 1,
    padding: hp('1%'),
    backgroundColor: '#00AAE4',
    margin: hp('1%'),
    justifyContent: 'center'
  },
  registerButtonText: {
    textAlign: 'center',
    fontFamily: 'Play-fair-Display',
    fontWeight: 'bold',
    color: 'white',
    fontSize: hp('2%'),
  },
  cancelButton: {
    marginHorizontal: wp('5%'),
    height: hp('6%'),
    borderRadius: 5,
    borderWidth: 1,
    padding: hp('1%'),
    backgroundColor: 'white',
    margin: hp('1%'),
    justifyContent: 'center',
    borderColor: '#555'
  },
  cancelButtonText: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#555',
    fontSize: hp('2%'),
  },
});
