import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Image } from 'react-native';
import CheckBox from 'react-native-check-box';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { FIRESTORE_DB } from '../../../../firebase/config';
import { collection, getDocs } from 'firebase/firestore';

import { useTranslation } from "react-i18next";

const ElegirCuidador = ({ navigation, route }) => {
  const { medicamento, TotalDosis, Dosis80Porciento, horaDosisDiaria } = route.params;
  const [cuidadores, setCuidadores] = useState([]);
  const [cuidadorSeleccionado, setCuidadorSeleccionado] = useState(null);

  const { t } = useTranslation();

  useEffect(() => {
    const obtenerCuidadores = async () => {
      try {
        const cuidadoresSnapshot = await getDocs(collection(FIRESTORE_DB, 'UsuariosCuidadores'));
        const cuidadoresList = cuidadoresSnapshot.docs.map(doc => {
          const data = doc.data();
          const nombreCompleto = `${data.nombre} ${data.apellido}`;
          return {
            uid: doc.id,
            nombreCompleto,
          };
        });
        setCuidadores(cuidadoresList);
      } catch (error) {
        console.error('Error al obtener los cuidadores: ', error);
      }
    };

    obtenerCuidadores();
  }, []);

  const handleInputSiguiente = () => {
    if (cuidadorSeleccionado) {
      console.log(cuidadorSeleccionado);
      navigation.navigate('RegistrarDosis', {
        medicamento,
        TotalDosis,
        Dosis80Porciento,
        horaDosisDiaria,
        cuidadorUID: cuidadorSeleccionado.uid,
        cuidadorNombre: cuidadorSeleccionado.nombreCompleto
      });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable style={styles.contenedorAtras} onPress={() => navigation.goBack()} accessibilityLabel="Volver">
          <Image style={styles.iconAtras} source={require('../../../../../assets/Image/Flechaatras.png')} />
        </Pressable>
      </View>

      <Text style={styles.titulo}>{t("RegistroDosis.EligeCuidador.Titulo")}</Text>
      <ScrollView style={styles.body}>
        {cuidadores.map(cuidador => (
          <View key={cuidador.uid} style={styles.checkboxContainer}>
            <CheckBox
              style={styles.checkbox}
              onClick={() => setCuidadorSeleccionado(cuidador)}
              isChecked={cuidadorSeleccionado?.uid === cuidador.uid}
              leftText={cuidador.nombreCompleto}
              leftTextStyle={styles.checkboxText}
              checkBoxColor="#3498DB"
              accessibilityLabel={`Seleccionar ${cuidador.nombreCompleto}`}
            />
            <Text style={styles.checkboxText}>{cuidador.nombreCompleto}</Text>
          </View>
        ))}
      </ScrollView>
      <Pressable
        style={[styles.BotonEntrar, { opacity: cuidadorSeleccionado ? 1 : 0.5 }]}
        onPress={handleInputSiguiente}
        disabled={!cuidadorSeleccionado}
        accessibilityLabel="Siguiente"
      >
        <Text style={styles.TextoEntrar}>{t("RegistroDosis.EligeCuidador.BotonSiguiente")}</Text>
      </Pressable>
    </View>
  );
};

export default ElegirCuidador;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    height: hp('10%'),
    backgroundColor: '#3498DB',
    alignItems: 'center',
    paddingHorizontal: wp('5%'),
  },
  contenedorAtras: {
    padding: wp('2%'),
  },
  iconAtras: {
    width: wp('10%'),
    height: hp('2.5%'),
  },
  headerText: {
    color: '#FFFFFF',
    fontSize: wp('5%'),
    fontWeight: 'bold',
  },
  body: {
    height: hp('90%'),
    paddingHorizontal: wp('5%'),
  },
  titulo: {
    color: 'black',
    fontSize: wp('6%'),
    textAlign: 'center',
    fontWeight: 'bold',
    marginVertical: hp('2%'),
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: hp('10%'),
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
  },
  checkbox: {
    marginRight: wp('3%'),
  },
  checkboxText: {
    fontSize: wp('4%'),
    color: 'black',
  },
  BotonEntrar: {
    marginTop: hp('4%'),
    marginHorizontal: wp('10%'),
    height: hp('6%'),
    bottom: hp('4%'),
    borderRadius: 5,
    borderWidth: 1,
    padding: hp('1%'),
    backgroundColor: '#00AAE4',
    margin: hp('1%'),
    justifyContent: 'center'
  },
  TextoEntrar: {
    textAlign: 'center',
    fontFamily: 'Play-fair-Display',
    fontWeight: 'bold',
    color: 'white',
    fontSize: hp('2%'),
  },
});
