import { View, Text, StyleSheet } from 'react-native'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import React from 'react'

const AtributoRecordatorioDosis = ({ TituloContenido, contenido, tamañoTitulo, tamañoContenido, colorFondo }) => {

    const styles = StyleSheet.create({
        ContenedorAtributoRecordatorio: {
            marginVertical: wp('3%'),
            alignSelf: 'center'

        },
        ContenedorContenido: {

            backgroundColor: `${colorFondo}`,
            padding: wp('1.5%'),
            alignSelf: 'center',
            borderRadius: 20,
            paddingHorizontal: wp('5.5%'),
        },
        TituloContenido: {
            alignSelf: 'center',
            fontSize: wp(`${tamañoTitulo}%`),
            fontFamily: 'noticia-text',
            marginBottom: hp('1%')
        },
        TextoContenido: {
            fontSize: wp(`${tamañoContenido}$`),
            fontWeight: '400%'
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

export default AtributoRecordatorioDosis

