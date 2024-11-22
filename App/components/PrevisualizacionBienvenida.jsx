import { doc, onSnapshot } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, Image, StyleSheet, Text, View } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { FIREBASE_AUTH, FIRESTORE_DB } from '../firebase/config';

const PrevisualizacionBienvenida = ({ imagen, condicion }) => {
    const { t } = useTranslation();


    const [userData, setUserData] = useState('');

    useEffect(() => {

        const getUserData = onSnapshot(doc(FIRESTORE_DB, 'UsuariosPacientes', FIREBASE_AUTH.currentUser.uid), (doc) => {
            setUserData(doc.data());
        });

        return () => {
            getUserData();
        };

    }, [])


    return (
        <View style={styles.container}>

            <Text style={styles.tituloNombre}>{`${t("Personalizar.Bienvenid@")} \n ${userData.nombreUsuario}`}</Text>

            {condicion ? (<View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>) :
                (

                    <Image source={imagen} style={styles.imagenBienvenida} />
                )
            }
        </View>
    )
}

export default PrevisualizacionBienvenida

const styles = StyleSheet.create({

    container: {
        borderWidth: 1,
        width: wp('72%'),
        height: hp('53%'),
        backgroundColor: '#3498DB',
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
    },
    loadingContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '30%',
    },
    loadingText: {
        marginTop: hp('2%'),
        fontSize: hp('2.5%'),
        color: '#000',
    },
})