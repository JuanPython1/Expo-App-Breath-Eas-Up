import * as ImagePicker from 'expo-image-picker';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, StyleSheet } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import FolderImage from 'react-native-vector-icons/Entypo';
import AnimationComponent from './AnimationComponent';

const BotonPersonalizar = ({ setImageElegida }) => {

    const elegirImagen = async () => {
        let res = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            aspect: [2, 3],
            allowsEditing: true,

        })

        console.log(res.assets[0].uri);

        if (!res.canceled) {
            setImageElegida(res.assets[0].uri);
        }
    }

    const { t } = useTranslation();


    const styles = StyleSheet.create({
        container: {
            height: hp('7%'),
            width: wp('14%'),
            alignContent: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            borderColor: 'black',
            borderWidth: 1,
            backgroundColor: 'white',
            borderRadius: 15
        },
    })

    return (
        <AnimationComponent>
            <Pressable style={styles.container} onPress={elegirImagen}>
                <FolderImage name='folder-images' size={20} color='black' />
            </Pressable>
        </AnimationComponent>
    )
}

export default BotonPersonalizar