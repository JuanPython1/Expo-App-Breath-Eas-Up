import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Image, ScrollView, Pressable } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { CheckBox } from 'react-native-btr';

const Medicamento = ({ navigation }) => {
  const [medicamento, setMedicamento] = useState('');
  const [otroMedicamento, setOtroMedicamento] = useState('');
  const [isNextEnabled, setIsNextEnabled] = useState(false); // Estado para habilitar/deshabilitar el botón "SIGUIENTE"

  const handleMedicamentoChange = (option) => {
    setMedicamento(option);
    if (option !== 'OTRO') {
      setOtroMedicamento('');
    }
    // Habilitar el botón si se ha seleccionado un medicamento
    setIsNextEnabled(option !== '' && option !== 'OTRO');
  };

  const handleOtroMedicamentoChange = (text) => {
    setOtroMedicamento(text);
    // Habilitar el botón si se ha ingresado texto en "OTRO"
    setIsNextEnabled(text !== '');
  };

  const goToCantidadPuff = () => {
    const selectedMedicamento = medicamento === 'OTRO' ? otroMedicamento : medicamento;
    navigation.navigate('CantidadPuff', { medicamento: selectedMedicamento });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.buscador}>
        <Pressable style={styles.contenedorAtras} onPress={() => { navigation.navigate('DashboardPaciente') }}>
          <Image style={styles.iconAtras} source={require('../../../../../assets/Image/Flechaatras.png')} />
        </Pressable>
      </View>
      <View style={styles.body}>
        <Text style={styles.TituloMedicamento}>ELIGE TU MEDICAMENTO</Text>
        <Image style={styles.imgInhalador} source={require('../../../../../assets/Image/imgMedicamento-removebg-preview.png')} />
        <View style={styles.checkboxContainer}>
          <View style={styles.checkboxItem}>
            <CheckBox
              checked={medicamento === 'Salbutamol'}
              color="#3498DB"
              borderWidth={7}
              onPress={() => handleMedicamentoChange('Salbutamol')}
              style={styles.checkbox}
            />
            <Text style={styles.checkboxText}>Salbutamol</Text>
          </View>

          <View style={styles.checkboxItem}>
            <CheckBox
              checked={medicamento === 'Bromuro de ipratropio'}
              borderWidth={7}
              color="#3498DB"
              onPress={() => handleMedicamentoChange('Bromuro de ipratropio')}
              style={styles.checkbox}
            />
            <Text style={styles.checkboxText}>Bromuro de ipratropio</Text>
          </View>

          <View style={styles.checkboxItem}>
            <CheckBox
              checked={medicamento === 'Beclometasona'}
              borderWidth={7}
              color="#3498DB"
              onPress={() => handleMedicamentoChange('Beclometasona')}
              style={styles.checkbox}
            />
            <Text style={styles.checkboxText}>Beclometasona</Text>
          </View>

          <View style={styles.checkboxItem}>
            <CheckBox
              checked={medicamento === 'OTRO'}
              borderWidth={7}
              color="#ff6700"
              onPress={() => handleMedicamentoChange('OTRO')}
              style={styles.checkbox}
            />
            <Text style={styles.checkboxText}>OTRO</Text>
          </View>

          {medicamento === 'OTRO' && (
            <TextInput
              style={styles.input}
              placeholder="Escribe el nombre del medicamento"
              value={otroMedicamento}
              onChangeText={handleOtroMedicamentoChange}
              maxLength={50}
            />
          )}
        </View>
        <Pressable
          style={[styles.BotonEntrar, { opacity: isNextEnabled ? 1 : 0.5 }]}
          onPress={goToCantidadPuff}
          disabled={!isNextEnabled}
        >
          <Text style={styles.TextoEntrar}>SIGUIENTE</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default Medicamento;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff', // Fondo blanco para el ScrollView
  },
  buscador: {
    height: hp('10%'),
    backgroundColor: '#3498DB',
    justifyContent: 'center'
  },
  body: {
    flex: 1,
  },
  imgInhalador: {
    alignSelf: 'center'
  },
  checkboxContainer: {
    marginTop: hp('4%'),
    marginHorizontal: wp('10%'),
    borderRadius: 15,
    paddingVertical: hp('2%'),
    paddingHorizontal: wp('5%'),
    backgroundColor: '#3498DB'
  },
  checkboxItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: hp('2%'),
    backgroundColor: 'white',
    borderRadius: 10,
    padding: wp('3%')
  },
  checkbox: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#ccc',
    marginRight: wp('2%'),
  },
  checkboxText: {
    color: '#000',
    fontSize: wp('5%'),
    marginLeft: wp('2%')
  },

  TituloMedicamento: {
    color: 'black',
    fontSize: wp('6%'),
    textAlign: 'center',
    fontWeight: 'bold',
    marginVertical: hp('2%'),
  },
  input: {
    height: wp('10%'),
    borderColor: '#ff6700',
    fontSize: wp('3.6%'),
    fontWeight: 'bold',
    borderWidth: 3,
    paddingHorizontal: wp('2%'),
    borderRadius: 10,
    backgroundColor: 'white',
    marginTop: hp('1%'),
  },
  BotonEntrar: {
    marginTop: hp('4%'),
    marginHorizontal: wp('10%'),
    height: hp('6%'),
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
});
