import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Image, TextInput } from 'react-native';
import CheckBox from 'react-native-check-box';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { FIRESTORE_DB } from '../../../../firebase/config';
import { collection, getDocs } from 'firebase/firestore';

import { useTranslation } from "react-i18next";

const ElegirCuidador = ({ navigation, route }) => {
  const { medicamento, TotalDosis, Dosis80Porciento, horaDosisDiaria } = route.params;

  // Estado para almacenar la lista de cuidadores
  const [cuidadores, setCuidadores] = useState([]);

  // Estado para almacenar el cuidador seleccionado
  const [cuidadorSeleccionado, setCuidadorSeleccionado] = useState(null);

  // Estado para almacenar el texto ingresado en la barra de búsqueda
  const [busqueda, setBusqueda] = useState('');

  // Estado para almacenar la lista de cuidadores filtrados
  const [cuidadoresFiltrados, setCuidadoresFiltrados] = useState([]);

  const { t } = useTranslation();

  useEffect(() => {
    const obtenerCuidadores = async () => {
      try {
        const cuidadoresSnapshot = await getDocs(collection(FIRESTORE_DB, 'UsuariosCuidadores'));
        const listaCuidadores = cuidadoresSnapshot.docs.map(doc => {
          const data = doc.data();
          const nombreCompleto = `${data.nombre} ${data.apellido}`;
          const nombreUsuario = data.nombreUsuario;
          return {
            uid: doc.id,
            nombreCompleto,
            nombreUsuario
          };
        });
        setCuidadores(listaCuidadores);
        setCuidadoresFiltrados(listaCuidadores); // Mostrar todos los cuidadores inicialmente
      } catch (error) {
        console.error('Error al obtener los cuidadores: ', error);
      }
    };

    obtenerCuidadores();
  }, []);

  // Filtra la lista de cuidadores cada vez que cambia el texto de búsqueda
  useEffect(() => {
    const queryMinuscula = busqueda.toLowerCase();
    const filtrados = cuidadores.filter(cuidador =>
      cuidador.nombreCompleto.toLowerCase().includes(queryMinuscula) ||
      cuidador.nombreUsuario.toLowerCase().includes(queryMinuscula)
    );

    setCuidadoresFiltrados(filtrados);

  }, [busqueda, cuidadores]);

  const manejarSiguiente = () => {
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
    <View style={styles.contenedor}>
      <View style={styles.encabezado}>
        <Pressable style={styles.contenedorAtras} onPress={() => navigation.goBack()} accessibilityLabel="Volver">
          <Image style={styles.iconoAtras} source={require('../../../../../assets/Image/Flechaatras.png')} />
        </Pressable>
      </View>

      <Text style={styles.titulo}>{t("RegistroDosis.EligeCuidador.Titulo")}</Text>

      <TextInput
        style={styles.inputBusqueda}
        placeholder={t("RegistroDosis.EligeCuidador.TextoBuscarCuidador")}
        value={busqueda}
        onChangeText={(texto) => setBusqueda(texto)}
      />

      <ScrollView style={styles.cuerpo} keyboardShouldPersistTaps="handled">
        {
          (cuidadoresFiltrados.length > 0) ? (cuidadoresFiltrados.map(cuidador => (
            <View key={cuidador.uid} style={styles.contenedorCheckbox}>
              <CheckBox
                style={styles.checkbox}
                onClick={() => setCuidadorSeleccionado(cuidador)}
                isChecked={cuidadorSeleccionado?.uid === cuidador.uid}
                leftText={cuidador.nombreCompleto}
                leftTextStyle={styles.textoCheckbox}
                checkBoxColor="#3498DB"
                accessibilityLabel={`Seleccionar ${cuidador.nombreCompleto}`}
              />
              <Text style={styles.textoCheckbox}>{cuidador.nombreCompleto} - {cuidador.nombreUsuario}</Text>
            </View>
          ))
          ) : (<Text style={styles.cuidadorNoEncontrado}>{t("RegistroDosis.EligeCuidador.NoCuidador")}</Text>)
        }
      </ScrollView>
      <Pressable
        style={[styles.botonEntrar, { opacity: cuidadorSeleccionado ? 1 : 0.5 }]}
        onPress={manejarSiguiente}
        disabled={!cuidadorSeleccionado}
        accessibilityLabel="Siguiente"
      >
        <Text style={styles.textoEntrar}>{t("RegistroDosis.EligeCuidador.BotonSiguiente")}</Text>
      </Pressable>
    </View>
  );
};

export default ElegirCuidador;

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
  },
  encabezado: {
    flexDirection: 'row',
    height: hp('10%'),
    backgroundColor: '#3498DB',
    alignItems: 'center',
    paddingHorizontal: wp('5%'),
  },
  contenedorAtras: {
    padding: wp('2%'),
  },
  iconoAtras: {
    width: wp('10%'),
    height: hp('2.5%'),
  },
  titulo: {
    color: 'black',
    fontSize: wp('6%'),
    textAlign: 'center',
    fontWeight: 'bold',
    marginVertical: hp('2%'),
  },
  inputBusqueda: {
    height: hp('6%'),
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: wp('4%'),
    marginHorizontal: wp('5%'),
    marginBottom: hp('2%'),
    borderRadius: 4,
  },
  cuidadorNoEncontrado: {
    // alignSelf: 'center',
    // justifyContent: 'center',
    marginTop: '15%',
    textAlign: 'center',
    fontSize: wp('3.5%'),
    fontWeight: 'bold'
  },

  cuerpo: {
    height: hp('90%'),
    paddingHorizontal: wp('5%'),
  },
  contenedorCheckbox: {
    flexDirection: 'row',
    alignItems: 'center',
    height: hp('10%'),
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
  },
  checkbox: {
    marginRight: wp('3%'),
  },
  textoCheckbox: {
    fontSize: wp('4%'),
    color: 'black',
  },
  botonEntrar: {
    marginTop: hp('4%'),
    marginHorizontal: wp('10%'),
    height: hp('6%'),
    bottom: hp('2%'),
    borderRadius: 5,
    borderWidth: 1,
    padding: hp('1%'),
    backgroundColor: '#00AAE4',
    margin: hp('1%'),
    justifyContent: 'center'
  },
  textoEntrar: {
    textAlign: 'center',
    fontFamily: 'Play-fair-Display',
    fontWeight: 'bold',
    color: 'white',
    fontSize: hp('2%'),
  },
});
