import { Asset } from 'expo-asset';
import React from 'react';
import { Image, Pressable, StyleSheet } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import AnimationComponent from './AnimationComponent';

const BotonImagenPersonalizada = ({ imagen, functionImagen }) => {
    const handleImagen = () => {
        const imagenSeleccionada = Asset.fromModule(imagen);
        imagenSeleccionada.downloadAsync();
        const imagenUri = imagenSeleccionada.uri;
        functionImagen(imagenUri);

    }

    return (
        <AnimationComponent>
            <Pressable onPress={handleImagen} style={styles.botonCaja} >
                <Image style={{ height: '90%', width: '90%', }} resizeMode='contain' source={imagen} />
            </Pressable>
        </AnimationComponent>
    );
}

const styles = StyleSheet.create({
    botonCaja: {
        height: hp('7%'),
        width: wp('14%'),
        borderColor: 'black',
        borderWidth: 1,
        backgroundColor: 'white',
        borderRadius: 10,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default BotonImagenPersonalizada;
