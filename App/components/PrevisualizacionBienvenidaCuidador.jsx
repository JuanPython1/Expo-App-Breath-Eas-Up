import { doc, onSnapshot } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, Image, StyleSheet, Text, View } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { FIREBASE_AUTH, FIRESTORE_DB } from '../firebase/config';

const PrevisualizacionBienvenidaCuidador = ({ imagen, condicion }) => {
    const { t } = useTranslation();

    const [userData, setUserData] = useState('');

    useEffect(() => {
        const getUserData = onSnapshot(
            doc(FIRESTORE_DB, 'UsuariosCuidadores', FIREBASE_AUTH.currentUser.uid), 
            (doc) => setUserData(doc.data())
        );

        return () => getUserData();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.tituloNombre}>
                {`${t("Personalizar.Bienvenid@")} \n ${userData.nombreUsuario}`}
            </Text>

            {condicion ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            ) : (
                <View style={styles.containerImg}>
                    <Image source={imagen} style={styles.imagenBienvenida} />
                </View>
            )}
        </View>
    );
}

export default PrevisualizacionBienvenidaCuidador;

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        width: wp('72%'),
        height: hp('53%'),
        backgroundColor: '#AADBFF',
        alignItems: 'center',
    },
    tituloNombre: {
        marginTop: hp('7%'),
        textAlign: 'center',
        fontSize: wp('4.2%'),
        fontFamily: 'noticia-text',
    },
    containerImg: {
        marginTop: hp('4%'),
        width: wp('50%'),          // ancho
        height: wp('50%'),         // alto igual al ancho para círculo perfecto
        borderRadius: wp('50%'),   // borde completamente redondeado
        overflow: 'hidden',        // asegura que la imagen se recorte
        borderWidth: 10,
        borderColor: '#94E4FF',
        backgroundColor: '#94E4FF',
        justifyContent: 'center',
        alignItems: 'center',
    },
    imagenBienvenida: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    loadingContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '30%',
    },
});
