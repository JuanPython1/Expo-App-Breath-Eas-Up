import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Image, Animated, Easing } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import DateTimePicker from '@react-native-community/datetimepicker';

const FechaDosisDiaria = ({ navigation, route }) => {
  const { medicamento, TotalDosis, Dosis80Porciento } = route.params;

  const [horaDosisDiaria, setHoraDosisDiaria] = useState(new Date());
  console.log('Fecha inicial:', horaDosisDiaria);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const spinValue = new Animated.Value(0);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const handleInputChange = (event, selectedDate) => {
    setShowTimePicker(false);
    const currentDate = selectedDate || horaDosisDiaria;
    setHoraDosisDiaria(currentDate);
  };

  const handleShowTimePicker = () => {
    setShowTimePicker(true);
    Animated.timing(spinValue, {
      toValue: 1,
      duration: 300,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(() => {
      spinValue.setValue(0); // Reinicia el valor de la animación después de completarse
    });
  };

  const handleInputSiguiente = () => {
    navigation.navigate('ElegirCuidador', {
      medicamento,
      TotalDosis,
      Dosis80Porciento,
      horaDosisDiaria: horaDosisDiaria.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }) // Enviar solo la hora en formato de cadena en 24 horas
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable style={styles.contenedorAtras} onPress={() => navigation.goBack()}>
          <Image style={styles.iconAtras} source={require('../../../../../assets/Image/Flechaatras.png')} />
        </Pressable>
      </View>

      <View style={styles.body}>
        <Text style={styles.titulo}>HORA DE TOMAR LA DOSIS DIARIA</Text>

        <View style={styles.contenedorHora}>
          <Text style={styles.textoHoraTitulo}>Hora Seleccionada:</Text>
          <Pressable style={styles.contenedorHoraSeleccionada} onPress={handleShowTimePicker}>
            <Animated.Text style={[styles.textoHora, { transform: [{ rotate: spin }] }]}>
              {horaDosisDiaria.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })} {/* Mostrar en 24 horas */}
            </Animated.Text>
            <Image style={styles.iconoCalendario} source={require('../../../../../assets/Image/calendario.png')} />
          </Pressable>
        </View>

        {showTimePicker && (
          <DateTimePicker
            mode='time'
            value={horaDosisDiaria}
            onChange={handleInputChange}
            is24Hour={true} // Usar formato de 24 horas
          />
        )}

        <Pressable style={styles.botonSiguiente} onPress={handleInputSiguiente}>
          <Text style={styles.textoBotonSiguiente}>SIGUIENTE</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default FechaDosisDiaria;

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
  body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: wp('5%'),
  },
  titulo: {
    color: 'black',
    fontSize: wp('6%'),
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: hp('5%'),
  },
  contenedorHora: {
    marginBottom: hp('5%'),
    alignItems: 'center',
  },
  textoHoraTitulo: {
    fontSize: wp('4%'),
    color: 'black',
    marginBottom: hp('2%'),
  },
  contenedorHoraSeleccionada: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 2,
    paddingHorizontal: wp('3%'),
    paddingVertical: hp('1%'),
    width: wp('70%'),
    justifyContent: 'space-between',
  },
  textoHora: {
    fontSize: wp('4%'),
    color: 'black',
  },
  iconoCalendario: {
    width: wp('5%'),
    height: hp('2.5%'),
  },
  botonSiguiente: {
    backgroundColor: '#00AAE4',
    borderRadius: 5,
    borderWidth: 1,
    paddingVertical: hp('1.5%'),
    paddingHorizontal: wp('10%'),
  },
  textoBotonSiguiente: {
    fontFamily: 'Play-fair-Display',
    fontWeight: 'bold',
    color: 'white',
    fontSize: hp('2%'),
    textAlign: 'center',
  },
});
