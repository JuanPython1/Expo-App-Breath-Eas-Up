import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const DesplegableIdioma = ({ props }) => {
    const { idiomaDefault } = props;


    return (
        <View style={styles.containerBoton}>
            {idiomaDefault}
        </View>
    )
}

export default DesplegableIdioma

const styles = StyleSheet.create({
    containerBoton: {
        width: wp('18%'),
        height: hp('7%'),
        zIndex: 2,
        borderRadius: 20,
        borderColor: '#94E4FF',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#94E4FF'
    }


})