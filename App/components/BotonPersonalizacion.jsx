import React from 'react';
import { StyleSheet, View, Pressable, Text } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import IconoPersonalizacion from 'react-native-vector-icons/MaterialCommunityIcons';

const BotonPersonalizacion = ({ props }) => {

    const { funcion, estilo } = props;



    return (
        <Pressable style={estilo} onPress={funcion}>
            <IconoPersonalizacion name={'pencil-box-multiple-outline'} size={wp('10%')} color="black" />
        </Pressable>
    );
}


export default BotonPersonalizacion;
