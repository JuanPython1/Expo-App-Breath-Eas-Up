import { View, Text, StyleSheet } from 'react-native'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import React from 'react'

const AtributoPuffDosis = ({ TituloContenido, contenido, tamañoTitulo, tamañoContenido, colorFondo }) => {

    const styles = StyleSheet.create({
        ContenedorAtributoRecordatorio: {
            marginVertical: wp('3%'),
            alignSelf: 'center',
            marginHorizontal: wp('1.5%')
        },
        ContenedorContenido: {
            alignSelf: 'center',
            backgroundColor: `${colorFondo}`,
            padding: wp('1%'),
            width: wp('25%'),
            borderRadius: 20,

        },
        TituloContenido: {
            alignSelf: 'center',
            fontSize: wp(`${tamañoTitulo}%`),
            fontFamily: 'noticia-text',
            marginBottom: hp('1%')
        },
        TextoContenido: {
            fontSize: wp(`${tamañoContenido}$`),
            fontWeight: '400',
            alignSelf: 'center'
        }
    })


    return (
        <View style={styles.ContenedorAtributoRecordatorio}>
            <Text style={styles.TituloContenido}>{TituloContenido}</Text>
            <View style={styles.ContenedorContenido}>
                <Text style={styles.TextoContenido}>{contenido}</Text>
            </View>
        </View>
    )
}

export default AtributoPuffDosis

