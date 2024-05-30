import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Image, TextInput } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

const CantidadPuff = ({ navigation, route }) => {
  const { medicamento } = route.params;

  const [TotalDosis, setTotalDosis] = useState(0);
  const [Dosis80Porciento, setDosis80Porciento] = useState(0);
  const [totalDosisOn, setTotalDosisOn] = useState(false);

  const handleInputChange = (text) => {
    if (text.length > 3) {
      // Si se ingresan más de 3 dígitos, truncamos el texto a los primeros 3 dígitos
      text = text.slice(0, 3);
      // Mostrar el aviso de que solo se pueden digitar 3 dígitos
      console.log('Solo se puede digitar 3 digitos :)');
    }
    const numericValue = parseInt(text.replace(/[^0-9]/g, ''), 10);
    setTotalDosis(isNaN(numericValue) ? 0 : numericValue);
    // Calcular el 80% de las dosis ingresadas
    const dosis80 = isNaN(numericValue) ? 0 : numericValue * 0.8;
    // Redondear a 1 decimal si tiene decimales, sino mostrar número entero
    setDosis80Porciento(dosis80 % 1 === 0 ? dosis80 : dosis80.toFixed(1));

    setTotalDosisOn(text !== '');
  };


  const handleInputSiguiente = () => {
    navigation.navigate('FechaDosisDiaria', { medicamento, TotalDosis, Dosis80Porciento })
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable style={styles.contenedorAtras} onPress={() => { navigation.goBack() }}>
          <Image style={styles.iconAtras} source={require('../../../../../assets/Image/Flechaatras.png')} />
        </Pressable>
      </View>

      <View style={styles.body}>
        <Text style={styles.Titulo}>{`DOSIS \n PARA LA INHALACIÓN`}</Text>

        <View style={styles.nombreMedicamentoContenedor}>
          <View style={styles.contenedorMedicamento}>
            <View style={styles.contenedorMedioMedicamento}>
              <Text style={styles.TextMedicamento}> {medicamento}</Text>
            </View>
          </View>
          <View style={styles.contenedorDino}>
            <Image style={styles.dino} source={require('../../../../../assets/Image/dino.png')} />
          </View>
        </View>

        {/* --------------------DATOS DOSIS-------------------- */}

        <View style={styles.ContenedorDatosDosis}>
          <View style={styles.ContenedorHorizontal}>
            <View style={styles.ContenedorTituloTexto}>
              <Text style={styles.textoTitulos}>TOTAL DOSIS (Inhalaciones)</Text>
            </View>
            <View style={styles.ContenedorTotalDosis}>
              <View style={styles.ContenedorInputDosis}>
                <TextInput
                  style={styles.textoTitulos}
                  value={TotalDosis === 0 ? '' : TotalDosis.toString()}
                  onChangeText={handleInputChange}
                  keyboardType="numeric"
                  placeholder="Ingrese Cantidad De Puff"
                />
              </View>
            </View>
          </View>

          <View style={styles.ContenedorHorizontal}>
            <View style={styles.ContenedorTituloTexto}>
              <Text style={styles.textoTitulos}>PUFF AL 80% (Inhalaciones)</Text>
            </View>
            <View style={styles.ContenedorInputDosis}>
              <TextInput
                style={styles.textoTitulos}
                value={Dosis80Porciento === 0 ? '80% de la Dosis Total' : Dosis80Porciento.toString()}
                keyboardType="numeric"
                editable={false}
                placeholderTextColor={'black'}
              />
            </View>
          </View>

        </View>

        <Pressable
          style={[styles.BotonEntrar, { opacity: totalDosisOn ? 1 : 0.5 }]}
          onPress={handleInputSiguiente}
          disabled={!totalDosisOn}
        >
          <Text style={styles.TextoEntrar}>SIGUIENTE</Text>
        </Pressable>

      </View>
    </View>
  );
};

export default CantidadPuff;

const styles = StyleSheet.create({
  container: {
    height: hp('100%'),
  },
  header: {
    flexDirection: 'row',
    height: hp('10%'),
    backgroundColor: '#3498DB',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: wp('5%'),
  },
  contenedorAtras: {
    alignSelf: 'center',
    justifyContent: 'center',
  },
  iconAtras: {
    width: wp('10%'),
    height: hp('2.5%'),
  },
  Titulo: {
    color: 'black',
    fontSize: wp('6%'),
    textAlign: 'center',
    fontWeight: 'bold',
    marginVertical: hp('2%'),
  },
  body: {
    height: hp('90%'),
  },
  nombreMedicamentoContenedor: {
    flexDirection: 'row',
    height: hp('24%'),
    width: wp('84%'),
    alignSelf: 'center',
  },
  contenedorMedioMedicamento: {
    backgroundColor: 'white',
    width: wp('45%'),
    alignSelf: 'center',
    borderRadius: 20,
    borderWidth: 2,
  },
  TextMedicamento: {
    fontSize: wp('5%'),
    textAlign: 'center',
  },
  contenedorMedicamento: {
    width: wp('44%'),
    justifyContent: 'center',
  },
  contenedorDino: {
    width: wp('40%'),
    justifyContent: 'center',
  },
  dino: {
    height: hp('27%'),
    width: wp('35%'),
    alignSelf: 'center',
  },
  ContenedorTituloTexto: {
    width: wp('35%'),
    justifyContent: 'center',
  },
  ContenedorDatosDosis: {
    marginTop: hp('5%'),
    alignSelf: 'center',
  },
  ContenedorHorizontal: {
    flexDirection: 'row',
    height: hp('10%'),
    width: wp('90%'),
    alignSelf: 'center',
  },
  ContenedorTotalDosis: {
    width: wp('55%'),
    justifyContent: 'center',
  },
  ContenedorPuff: {
    width: wp('55%'),
    justifyContent: 'center',
  },
  ContenedorInputDosis: {
    backgroundColor: 'white',
    height: hp('5%'),
    width: wp('55%'),
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    borderWidth: 2,
  },
  textoTitulos: {
    fontSize: wp('4%'),
    textAlign: 'center',
    color: 'black',
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
});
