import React from "react";
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import BotonPersonalizarLocal from "../components/BotonPersonalizarLocal";
import BotonImagenPersonalizada from "./botonImagenPersonalizada";

const NUM_COLUMNS = 5;

const MatrixImagenes = ({ setImagen }) => {

    const componentsArray = [
        <BotonPersonalizarLocal setImageElegida={setImagen} />,

        <BotonImagenPersonalizada imagen={require('../../assets/Image/perro.png')} functionImagen={setImagen} />,

        <BotonImagenPersonalizada imagen={require('../../assets/Image/dino.png')} functionImagen={setImagen} />,

        <BotonImagenPersonalizada imagen={require('../../assets/Image/imagenesMatrix/woody.png')} functionImagen={setImagen} />,

        <BotonImagenPersonalizada imagen={require('../../assets/Image/imagenesMatrix/goku.jpeg')} functionImagen={setImagen} />,

        <BotonImagenPersonalizada imagen={require('../../assets/Image/imagenesMatrix/paisaje.jpg')} functionImagen={setImagen} />,

        <BotonImagenPersonalizada imagen={require('../../assets/Image/imagenesMatrix/mona.jpeg')} functionImagen={setImagen} />,

    ];


    const renderItem = ({ item }) => (
        <View style={styles.matrix}>
            {item}
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.textTitulo}>{`Selecciona una imagen \n de bienvenida`}</Text>
            <View style={styles.matrix}>
                <FlatList
                    data={componentsArray}
                    renderItem={renderItem}
                    numColumns={NUM_COLUMNS}
                    keyExtractor={(item, index) => index.toString()}
                    scrollEnabled={false}
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
