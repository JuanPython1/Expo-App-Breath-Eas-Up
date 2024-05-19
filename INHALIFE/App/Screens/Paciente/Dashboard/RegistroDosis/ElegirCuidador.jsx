import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Image} from 'react-native';
import { CheckBox } from 'react-native-elements';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

const ElegirCuidador = ({ navigation, route }) => {
  const { medicamento, TotalDosis, Dosis80Porciento, horaDosisDiaria } = route.params;
  const [CuidadorSeleccionado, setCuidadorSeleccionado] = useState(null);

  const cuidadores = ['Cuidador 1', 'Cuidador 2', 'Cuidador 3', 'Cuidador 4',  'Cuidador 5',  'Cuidador 6',  'Cuidador 7',  'Cuidador 8',  'Cuidador 9',  'Cuidador 10']; // Añade más según sea necesario

  const handleInputSiguiente = () => {
    navigation.navigate( 'RegistrarDosis',{ 
      medicamento, 
      TotalDosis, 
      Dosis80Porciento, 
      horaDosisDiaria,
      CuidadorSeleccionado
    })
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
      <Pressable style={styles.contenedorAtras} onPress={() => navigation.goBack()}>
          <Image style={styles.iconAtras} source={require('../../../../../assets/Image/Flechaatras.png')} />
        </Pressable>
      </View>

      <Text style={styles.Titulo}>ELIGE TU CUIDADOR =)</Text>
      <ScrollView style={styles.body}>
        {cuidadores.map((cuidador, index) => (
          <View key={index} style={styles.checkboxContainer}>
            <CheckBox
              title={cuidador}
              checked={CuidadorSeleccionado === cuidador}
              onPress={() => setCuidadorSeleccionado(cuidador)}
              containerStyle={styles.checkbox}
            />
          </View>
        ))}
      </ScrollView>
      <Pressable
          style={[styles.BotonEntrar, { opacity: CuidadorSeleccionado ? 1 : 0.5 }]}
          onPress={handleInputSiguiente}
          disabled={!CuidadorSeleccionado}
        >
          <Text style={styles.TextoEntrar}>SIGUIENTE</Text>
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
  Titulo: {
    color: 'black',
    fontSize: wp('6%'),
    textAlign: 'center',
    fontWeight: 'bold',
    marginVertical: hp('2%'),
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: hp('2%'),
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
  },
  checkbox: {
    width: '100%',
    backgroundColor: 'transparent',
    borderWidth: 0,
  },
  BotonEntrar: {
    backgroundColor: '#3498DB',
    paddingVertical: hp('2%'),
    paddingHorizontal: wp('10%'),
    borderRadius: 5,
    alignItems: 'center',
    margin: hp('2%'),
  },
  TextoEntrar: {
    color: '#FFFFFF',
    fontSize: wp('5%'),
    fontWeight: 'bold',
  },
});
