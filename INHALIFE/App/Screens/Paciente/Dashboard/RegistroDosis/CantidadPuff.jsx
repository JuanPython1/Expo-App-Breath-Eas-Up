import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Image, TextInput } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

const CantidadPuff = ({ navigation, route }) => {
  const { medicamento } = route.params;

  const [TotalDosis, setTotalDosis] = useState(0);

  const handleInputChange = (text) => {
    const numericValue = parseInt(text.replace(/[^0-9]/g, ''), 10);
    setTotalDosis(isNaN(numericValue) ? 0 : numericValue);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable style={styles.contenedorAtras} onPress={() => { navigation.navigate('Medicamento') }}>
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
              <Text style={styles.textoTitulos}>TOTAL DOSIS</Text>
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
        </View>
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
    width: wp('40%'),
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
    height: hp('34%'),
    width: wp('84%'),
    marginTop: hp('5%'),
    alignSelf: 'center',
  },
  ContenedorHorizontal: {
    flexDirection: 'row',
    height: hp('14%'),
    width: wp('90%'),
    alignSelf: 'center',
  },
  ContenedorTotalDosis: {
    width: wp('55%'),
    justifyContent: 'center',
  },
  ContenedorInputDosis: {
    backgroundColor: 'white',
    height: hp('5%'),
    width: wp('50%'),
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    borderWidth: 2,
  },
  textoTitulos: {
    fontSize: wp('4%'),
    textAlign: 'center',
  },
});
