import React from 'react';
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

const RegistrarDosis = ({ navigation, route }) => {
  const { medicamento, TotalDosis, Dosis80Porciento, horaDosisDiaria, CuidadorSeleccionado } = route.params;

  // Función para convertir la hora en formato AM/PM
  const convertirAMPM = (hora24) => {
    const [horas, minutos] = hora24.split(':');
    const ampm = horas >= 12 ? 'PM' : 'AM';
    const hora12 = horas % 12 || 12;
    return `${hora12}:${minutos} ${ampm}`;
  };

  const goToDashBoard = () => {
    navigation.navigate('DashboardPaciente')
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable style={styles.goBackButton} onPress={() => navigation.goBack()}>
          <Image style={styles.goBackIcon} source={require('../../../../../assets/Image/Flechaatras.png')} />
        </Pressable>
      </View>

      <View style={styles.body}>
        <Text style={styles.title}>DATOS REGISTRADOS DE TU DOSIS</Text>

        <Text style={styles.label}>Medicamento:</Text>
        <Text style={styles.text}>{medicamento}</Text>

        <Text style={styles.label}>Total de dosis:</Text>
        <Text style={styles.text}>{TotalDosis}</Text>

        <Text style={styles.label}>Dosis al 80%:</Text>
        <Text style={styles.text}>{Dosis80Porciento}</Text>

        <Text style={styles.label}>Hora de dosis diaria:</Text>
        {/* Convertir la hora a formato AM/PM */}
        <Text style={styles.text}>{convertirAMPM(horaDosisDiaria)}</Text>

        <Text style={styles.label}>Cuidador seleccionado:</Text>
        <Text style={styles.text}>{CuidadorSeleccionado}</Text>
      
        <Pressable
          style={styles.BotonEntrar}
          onPress={goToDashBoard}
        >
          <Text style={styles.TextoEntrar}>REGISTRAR</Text>
        </Pressable>
      
      </View>

    </View>
  );
};

export default RegistrarDosis;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    flex: 1,
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
});
