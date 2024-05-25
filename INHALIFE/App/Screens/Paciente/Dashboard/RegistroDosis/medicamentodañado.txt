import { View, Text, StyleSheet, TextInput, Image, ScrollView, Pressable } from 'react-native';
import React, { useState } from 'react';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { CheckBox } from 'react-native-elements';

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
        <Text style={styles.TituloMedicamento}>ELIJE TU MEDICAMENTO</Text>
        <Image style={styles.imgInhalador} source={require('../../../../../assets/Image/imgMedicamento-removebg-preview.png')} />
        <View style={styles.checkboxContainer}>
          <CheckBox
            title="Salbutamol"
            checked={medicamento === 'Salbutamol'}
            onPress={() => handleMedicamentoChange('Salbutamol')}
            size={wp('9%')}
            containerStyle={styles.checkbox}
            textStyle={styles.checkboxText}
            checkedColor='#3498DB'
            uncheckedColor='#94E4FF'
          />
          <CheckBox
            title="Bromuro de ipratropio"
            checked={medicamento === 'Bromuro de ipratropio'}
            size={wp('9%')}
            onPress={() => handleMedicamentoChange('Bromuro de ipratropio')}
            containerStyle={styles.checkbox}
            textStyle={styles.checkboxText}
            checkedColor='#3498DB'
            uncheckedColor='#94E4FF'
          />
          <CheckBox
            title="Beclometasona"
            checked={medicamento === 'Beclometasona'}
            size={wp('9%')}
            onPress={() => handleMedicamentoChange('Beclometasona')}
            containerStyle={styles.checkbox}
            textStyle={styles.checkboxText}
            checkedColor='#3498DB'
            uncheckedColor='#94E4FF'
          />
          <CheckBox
            title="OTRO"
            checked={medicamento === 'OTRO'}
            size={wp('9%')}
            onPress={() => handleMedicamentoChange('OTRO')}
            containerStyle={styles.checkbox}
            textStyle={styles.checkboxText}
            checkedColor='#ff6700'
            uncheckedColor='#ff6700'
          />
          {medicamento === 'OTRO' && (
            <TextInput
              style={styles.input}
              placeholder="Escribe el nombre del medicamento"
              value={otroMedicamento}
              onChangeText={handleOtroMedicamentoChange}
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
  imgInhalador:{
    alignSelf: 'center'
  },  
  checkboxContainer: {
    marginTop: hp('4%'),
    marginHorizontal: wp('10%'),
    borderRadius: 15,
    paddingVertical: hp('2%'),
    paddingHorizontal: wp('2%'),
    backgroundColor: '#3498DB'
  },
  checkbox: {
    backgroundColor: '#ffffff',
    borderWidth: 0,
    marginVertical: hp('2%'), // Esto agrega margen vertical entre los checkbox
  },
  checkboxText: {
    color: '#000',
    fontSize: wp('4%')
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
    fontSize: wp('4%'),
    fontWeight: 'bold',
    borderWidth: 3,
    marginTop: hp('1%'),
    paddingHorizontal: wp('2%'),
    borderRadius: 10,
    backgroundColor: 'white'
  },
  BotonEntrar:{
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
