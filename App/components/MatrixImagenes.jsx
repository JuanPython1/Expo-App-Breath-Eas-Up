import React from "react";
import { useTranslation } from "react-i18next";
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import BotonPersonalizarLocal from "../components/BotonPersonalizarLocal";
import BotonImagenPersonalizada from "./botonImagenPersonalizada";


const { t } = useTranslation();

const MatrixImagenes = ({ setImagen }) => {

    const componentsArray = [
        <BotonPersonalizarLocal setImageElegida={setImagen} />,

        <BotonImagenPersonalizada imagen={require('../../assets/Image/perro.png')} functionImagen={setImagen} />,

        <BotonImagenPersonalizada imagen={require('../../assets/Image/dino.png')} functionImagen={setImagen} />,

        <BotonImagenPersonalizada imagen={require('../../assets/Image/imagenesMatrix/woody.png')} functionImagen={setImagen} />,

        <BotonImagenPersonalizada imagen={require('../../assets/Image/imagenesMatrix/goku.jpeg')} functionImagen={setImagen} />,

        <BotonImagenPersonalizada imagen={require('../../assets/Image/imagenesMatrix/mona.jpeg')} functionImagen={setImagen} />,

        <BotonImagenPersonalizada imagen={require('../../assets/Image/imagenesMatrix/paisaje.jpg')} functionImagen={setImagen} />,

        <BotonImagenPersonalizada imagen={require('../../assets/Image/imagenesMatrix/maria.jpg')} functionImagen={setImagen} />,

    ];


    const renderItem = ({ item }) => (
        <View style={styles.matrix}>
            {item}
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.textTitulo}>{t("Personalizar.TituloMatrix")}</Text>
            <View style={styles.matrix}>

                <FlatList
                    data={componentsArray}
                    renderItem={renderItem}
                    contentContainerStyle={{ paddingBottom: hp('1%') }}
                    horizontal={true}
                    persistentScrollbar={true}
                    keyExtractor={(item, index) => index.toString()}
                    scrollEnabled={true}
                    scrollEventThrottle={16}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        alignItems: 'center',
        gap: 20,
        borderColor: 'black',
        borderWidth: 1,
        backgroundColor: 'white',
        borderRadius: 10,
    },
    textTitulo: {
        textAlign: 'center',
        top: wp('3%'),
        fontFamily: 'Play-fair-Display',
        marginBottom: '1%',
        fontSize: wp('5%'),
    },
    matrix: {
        flexDirection: "row",
        marginHorizontal: wp('1.5%'),
        marginVertical: wp('2%'),
    },
    column: {
        flex: 1,
        padding: 10,
        borderWidth: 1,
        borderColor: "#000"
    },
});

export default MatrixImagenes;
