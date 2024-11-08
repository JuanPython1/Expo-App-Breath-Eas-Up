import { View, Text, StyleSheet, Image } from 'react-native'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { FIRESTORE_DB, FIREBASE_AUTH } from '../firebase/config';
import { getDoc, doc, onSnapshot } from 'firebase/firestore';
import { use } from 'i18next';

const PrevisualizacionBienvenidaCuidador = ({ props }) => {
    const { t } = useTranslation();
    const imagen = props;

    const [userData, setUserData] = useState('');

    useEffect(() => {

        const getUserData = onSnapshot(doc(FIRESTORE_DB, 'UsuariosCuidadores', FIREBASE_AUTH.currentUser.uid), (doc) => {
            setUserData(doc.data());
        });

        return () => {
            getUserData();
        };

    }, [])


    return (
        <View style={styles.container}>

            <Text style={styles.tituloNombre}>{`${t("Personalizar.Bienvenid@")} \n ${userData.nombreUsuario}`}</Text>

            <Image source={imagen} style={styles.imagenBienvenida} />
        </View>
    )
}

export default PrevisualizacionBienvenidaCuidador

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
        fontFamily: 'noticia-text'
    },
    imagenBienvenida: {
        marginTop: hp('4%'),
        width: '45%',
        height: '48%',
    }
})