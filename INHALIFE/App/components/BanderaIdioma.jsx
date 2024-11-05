import AsyncStorage from "@react-native-async-storage/async-storage";
import React from 'react';
import { useTranslation } from "react-i18next";
import { Image, Pressable, StyleSheet } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';



const BanderaIdioma = ({ props }) => {
    const { bandera, idioma } = props
    const { t, i18n } = useTranslation();

    const changeLanguage = async (idioma) => {
        await AsyncStorage.setItem("language", idioma);
        i18n.changeLanguage(idioma);
    };

    return (
        <Pressable style={styles.contenedorBandera} onPress={() => changeLanguage(idioma)} >
            <Image style={styles.bandera} source={bandera} resizeMode='contain' />
        </Pressable>
    )
}

export default BanderaIdioma

const styles = StyleSheet.create({

    contenedorBandera: {
        // width: wp('7%'),
        // height: hp('7%'),
    },

    bandera: {
        width: wp('12%'),
        height: hp('6%'),
    }

}) 