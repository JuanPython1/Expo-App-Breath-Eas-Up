import { View, Text, StyleSheet, Pressable, Image, ScrollView, Modal, TouchableOpacity } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { collection, deleteDoc, doc, onSnapshot, query, where, getDoc } from 'firebase/firestore';
import React, { useState, useEffect } from 'react';
import RecordatorioItem from '../../../../components/RecordatorioItem';
import { FIREBASE_AUTH, FIRESTORE_DB } from '../../../../firebase/config';
import * as Notificaciones from 'expo-notifications';

import { useTranslation } from 'react-i18next';

const RecordatoriosDosis = ({ navigation }) => {
  const [recordatorios, setRecordatorios] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [recordatorioAEliminar, setRecordatorioAEliminar] = useState(null);

  const { t } = useTranslation();

  useEffect(() => {
    const user = FIREBASE_AUTH.currentUser;
    const unsubscribe = onSnapshot(
      query(collection(FIRESTORE_DB, 'RecordatoriosDosis'), where('UsuarioId', '==', user?.uid)), // Filtrar por UID del usuario actual
      (snapshot) => {
        const updatedRecordatorios = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setRecordatorios(updatedRecordatorios);
      }
    );

    return () => unsubscribe();
  }, []);

  const eliminarRecordatorio = async (id) => {
    try {
      const RecordatorioRef = doc(FIRESTORE_DB, 'RecordatoriosDosis', id);
      const RecordatorioDoc = await getDoc(RecordatorioRef);
      if (RecordatorioDoc.exists()) {
        const recordatorioData = RecordatorioDoc.data();
        const notificationId = recordatorioData.notificationId;

        // Cancelar la notificación
        if (notificationId) {
          await Notificaciones.cancelScheduledNotificationAsync(notificationId);
        }

        // Eliminar el documento de la base de datos
        await deleteDoc(RecordatorioRef);

        // Actualizar la lista de recordatorios en el estado local
        const updatedRecordatorios = recordatorios.filter((t) => t.id !== id);
        setRecordatorios(updatedRecordatorios);
      } else {
        console.log('El recordatorio no existe.');
      }
    } catch (error) {
      console.error('Error al eliminar el recordatorio:', error);
    }
  };

  const confirmarEliminacion = (recordatorio) => {
    setRecordatorioAEliminar(recordatorio);
    setModalVisible(true);
  };

  const handleEliminarConfirmado = () => {
    eliminarRecordatorio(recordatorioAEliminar.id);
    setModalVisible(false);
    setRecordatorioAEliminar(null);
  };

  const handleCancelarEliminacion = () => {
    setModalVisible(false);
    setRecordatorioAEliminar(null);
  };

  return (
    <View style={styles.Container}>
      <View style={styles.header}>
        <Pressable style={styles.contenedorAtras} onPress={() => { navigation.navigate('DashboardPaciente'); }}>
          <Image style={styles.iconAtras} source={require('../../../../../assets/Image/Flechaatras.png')} />
        </Pressable>
      </View>

      <View style={styles.body}>
        <View style={styles.fondoTitulo}>
          <Text style={styles.TituloRecordatorios}>{t('Recordatorios.TusRecordatorios.Titulo')}</Text>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.RecordatorioContainer}>
            {recordatorios.length > 0 ? (
              recordatorios.map((recordatorio) => (
                <RecordatorioItem
                  key={recordatorio.id}
                  recordatorio={recordatorio}
                  onEliminarRecordatorio={() => confirmarEliminacion(recordatorio)} // Llama a confirmarEliminacion en lugar de eliminarRecordatorio
                  funcionNav={() => { navigation.navigate('InfoRecordatorioDosisPaciente', { recordatorio: recordatorio }); }}
                />
              ))
            ) : (
              <Text style={styles.noRecordatorios}>
                {t('Recordatorios.TusRecordatorios.NoTienesRecordatorios')}
              </Text>
            )}
          </View>
        </ScrollView>
      </View>

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={handleCancelarEliminacion}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>
              {t('Recordatorios.EliminarRecordatorio.Contexto')} {recordatorioAEliminar?.medicamento}?
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.modalButtonRojo} onPress={handleEliminarConfirmado}>
                <Text style={styles.modalButtonText}>{t("Recordatorios.EliminarRecordatorio.Si")}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalButton} onPress={handleCancelarEliminacion}>
                <Text style={styles.modalButtonText}>{t("Recordatorios.EliminarRecordatorio.No")}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default RecordatoriosDosis;

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
    justifyContent: 'center',
    borderRadius: 20,
  },
  TituloRecordatorios: {
    fontFamily: 'noticia-text',
    fontSize: hp('4%'),
    color: 'black',
    textShadowColor: 'black',
    textShadowRadius: 1,
    transform: [{ scaleX: 0.8 }, { scaleY: 1.2 }],
    textShadowOffset: { width: 1, height: 1 },
    textAlign: 'center'
  },
  scrollContainer: {
    flexGrow: 1,
    marginTop: hp('2%')
  },
  RecordatorioContainer: {
    flexDirection: 'column',
    borderRadius: 5,
    marginVertical: '5%',
  },
  noRecordatorios: {
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: '50%',
    textAlign: 'center',
    fontSize: wp('4%'),
    fontWeight: 'bold'
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: wp('80%'),
    padding: hp('2%'),
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: hp('2%'),
    marginBottom: hp('2%'),
    textAlign: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    width: '45%',
    padding: hp('1%'),
    backgroundColor: '#3498DB',
    borderRadius: 5,
    alignItems: 'center',
  },
  modalButtonRojo: {
    width: '45%',
    padding: hp('1%'),
    backgroundColor: 'red',
    borderRadius: 5,
    alignItems: 'center',
  },
  modalButtonText: {
    color: 'white',
    fontSize: hp('2%'),
  },
});



