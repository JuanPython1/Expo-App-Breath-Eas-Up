import React from "react";
import { useTranslation } from "react-i18next";
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import BotonPersonalizarLocal from "../components/BotonPersonalizarLocal";
import BotonImagenPersonalizada from "./botonImagenPersonalizada";

// import dino from '../../assets/Image/dino.png';
// import goku from '../../assets/Image/imagenesMatrix/goku.jpeg';
// import mona from '../../assets/Image/imagenesMatrix/mona.jpeg';
// import paisaje from '../../assets/Image/imagenesMatrix/paisaje.jpg';
// import woody from '../../assets/Image/imagenesMatrix/woody.png';
// import perro from '../../assets/Image/perro.png';

const arrayUri = [
    {
        uriPerro: 'https://firebasestorage.googleapis.com/v0/b/inhalapp.appspot.com/o/imagenesPredeterminadas%2Fdino.png?alt=media&token=bb24863e-1b72-4749-86ce-9485118164ef',
        uriDino: 'https://firebasestorage.googleapis.com/v0/b/inhalapp.appspot.com/o/imagenesPredeterminadas%2Fdino.png?alt=media&token=6cfd784c-2042-41fd-8d78-851627c3d5cc',
        uriAvatar0: 'https://firebasestorage.googleapis.com/v0/b/inhalapp.appspot.com/o/imagenesPredeterminadas%2FAvatar0.png?alt=media&token=88459e05-a3e9-4c6c-80fa-353b1f3cfc06',
        uriAvatar1: 'https://firebasestorage.googleapis.com/v0/b/inhalapp.appspot.com/o/imagenesPredeterminadas%2FAvatar1.png?alt=media&token=1b1d1a5a-8f3c-4b1f-9b9a-9d1f3a5a8f3c',
        uriAvatar4: 'https://firebasestorage.googleapis.com/v0/b/inhalapp.appspot.com/o/imagenesPredeterminadas%2FAvatar4.png?alt=media&token=1b1d1a5a-8f3c-4b1f-9b9a-9d1f3a5a8f3c',
        uriAvatar5: 'https://firebasestorage.googleapis.com/v0/b/inhalapp.appspot.com/o/imagenesPredeterminadas%2FAvatar5.png?alt=media&token=1b1d1a5a-8f3c-4b1f-9b9a-9d1f3a5a8f3c',
        uriAvatar6: 'https://firebasestorage.googleapis.com/v0/b/inhalapp.appspot.com/o/imagenesPredeterminadas%2FAvatar6.png?alt=media&token=1b1d1a5a-8f3c-4b1f-9b9a-9d1f3a5a8f3c',
        uriAvatar7: 'https://firebasestorage.googleapis.com/v0/b/inhalapp.appspot.com/o/imagenesPredeterminadas%2FAvatar7.png?alt=media&token=1b1d1a5a-8f3c-4b1f-9b9a-9d1f3a5a8f3c',
        uriAvatar8: 'https://firebasestorage.googleapis.com/v0/b/inhalapp.appspot.com/o/imagenesPredeterminadas%2FAvatar8.png?alt=media&token=1b1d1a5a-8f3c-4b1f-9b9a-9d1f3a5a8f3c',

        uriGoku: 'https://firebasestorage.googleapis.com/v0/b/inhalapp.appspot.com/o/imagenesPredeterminadas%2Fgoku.jpeg?alt=media&token=37114074-00be-4887-aef3-ac979b1c21ab',
        uriBulma:'https://firebasestorage.googleapis.com/v0/b/inhalapp.appspot.com/o/imagenesPredeterminadas%2Fbulma.jpeg?alt=media&token=526b27aa-31b2-49b8-bc3a-1d6a599ff4e6',
        uriMaria: 'https://firebasestorage.googleapis.com/v0/b/inhalapp.appspot.com/o/imagenesPredeterminadas%2Fmaria.jpg?alt=media&token=ded3564b-b7bf-49d0-84ed-2b37297edb78',
        uriMona: 'https://firebasestorage.googleapis.com/v0/b/inhalapp.appspot.com/o/imagenesPredeterminadas%2Fmona.jpeg?alt=media&token=deed3d7a-58b9-4b3c-8cc7-b3798994eb42',
        uriPaisaje: 'https://firebasestorage.googleapis.com/v0/b/inhalapp.appspot.com/o/imagenesPredeterminadas%2Fpaisaje.jpg?alt=media&token=53df3100-c850-4348-8239-99ffd2713fc0',
        uriPerro: 'https://firebasestorage.googleapis.com/v0/b/inhalapp.appspot.com/o/imagenesPredeterminadas%2Fperro.png?alt=media&token=c92ccbb3-62fc-44b2-b359-cdf747096825',
        uriWoody: 'https://firebasestorage.googleapis.com/v0/b/inhalapp.appspot.com/o/imagenesPredeterminadas%2Fwoody.png?alt=media&token=8bd4809f-51d2-4546-be02-ae42b752e1f2'
    }

]


const NUM_COLUMNS = 5;

const MatrixImagenes = ({ setImagen }) => {

    const { t } = useTranslation();


    const componentsArray = [
        <BotonPersonalizarLocal setImageElegida={setImagen} />,

        <BotonImagenPersonalizada imagen={arrayUri[0].uriPerro} functionImagen={setImagen} />,

        <BotonImagenPersonalizada imagen={arrayUri[0].uriDino} functionImagen={setImagen} />,

        <BotonImagenPersonalizada imagen={arrayUri[0].uriAvatar0} functionImagen={setImagen} />,

        <BotonImagenPersonalizada imagen={arrayUri[0].uriAvatar1} functionImagen={setImagen} />,

        <BotonImagenPersonalizada imagen={arrayUri[0].uriAvatar4} functionImagen={setImagen} />,

        <BotonImagenPersonalizada imagen={arrayUri[0].uriAvatar5} functionImagen={setImagen} />,

        <BotonImagenPersonalizada imagen={arrayUri[0].uriAvatar6} functionImagen={setImagen} />,

        <BotonImagenPersonalizada imagen={arrayUri[0].uriAvatar7} functionImagen={setImagen} />,

        <BotonImagenPersonalizada imagen={arrayUri[0].uriAvatar8} functionImagen={setImagen} />,

        // <BotonImagenPersonalizada imagen={arrayUri[0].uriWoody} functionImagen={setImagen} />,

        <BotonImagenPersonalizada imagen={arrayUri[0].uriGoku} functionImagen={setImagen} />,

        <BotonImagenPersonalizada imagen={arrayUri[0].uriBulma} functionImagen={setImagen} />,

        <BotonImagenPersonalizada imagen={arrayUri[0].uriMona} functionImagen={setImagen} />,

        <BotonImagenPersonalizada imagen={arrayUri[0].uriMaria} functionImagen={setImagen} />,

        <BotonImagenPersonalizada imagen={arrayUri[0].uriPaisaje} functionImagen={setImagen} />,

    ];


    const renderItem = ({ item }) => (
        <View style={styles.matrix}>
            {item}
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.textTitulo}>{t('Personalizar.TituloMatrix')}</Text>
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
