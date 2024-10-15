import { View, Text, Pressable, StyleSheet } from 'react-native'
import React from 'react'
import FolderImage from 'react-native-vector-icons/Entypo'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AnimationComponent from '../components/AnimationComponent';
import { useTranslation } from 'react-i18next';

const BotonPersonalizar = ({ props }) => {

    const { t } = useTranslation();

    const { funcion } = props;

    const styles = StyleSheet.create({
        container: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: 10,
            height: hp('6%'),
            width: wp('80%'),
            borderColor: 'black',
            borderWidth: 1,
            backgroundColor: 'white',
            borderRadius: 15
        },
    })

    return (
        <AnimationComponent>
            <Pressable style={styles.container} onPress={funcion}>
                <Text style={styles.text}>{t("PersonalizarPaciente.BotonCambiarImagenBienvenida")}</Text>
                <FolderImage name='folder-images' size={20} color='black' />
            </Pressable>
        </AnimationComponent>
    )
}

export default BotonPersonalizar