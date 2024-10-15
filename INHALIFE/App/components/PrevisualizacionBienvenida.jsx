import { View, Text, StyleSheet, Image } from 'react-native'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import React from 'react'

const PrevisualizacionBienvenida = ({ props }) => {

    const imagen = props;

    return (
        <View style={styles.container}>

            <Text style={styles.tituloNombre}>{"Bienvenid@ \n *Nombre*"}</Text>

            <Image source={imagen} style={styles.imagenBienvenida} />
        </View>
    )
}

export default PrevisualizacionBienvenida

const styles = StyleSheet.create({

    container: {
        borderWidth: 1,
        width: wp('72%'),
        height: hp('53%'),
        backgroundColor: '#3498DB',
        alignItems: 'center',
    },
    tituloNombre: {
        marginTop: hp('7%'),
        textAlign: 'center',
        fontSize: wp('4.2%'),
        fontFamily: 'noticia-text'
    },
    imagenBienvenida: {
        marginTop: hp('4%'),
        width: '45%',
        height: '48%',
    }
})