import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet, Pressable, Image, ScrollView } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { collection, doc, getDocs, deleteDoc } from 'firebase/firestore';
import { FIREBASE_AUTH, FIRESTORE_DB } from '../../firebase/config';
import { getAuth, deleteUser } from 'firebase/auth';

import { useTranslation } from 'react-i18next';

const ListaCuidadores = ({ navigation }) => {
    const [listaCuidadores, setListaCuidadores] = useState([]);

    const { t } = useTranslation();

    useEffect(() => {
        const obtenerCuidadores = async () => {
            try {
                const cuidadoresSnapshot = await getDocs(collection(FIRESTORE_DB, 'UsuariosCuidadores'));
                const cuidadoresLista = cuidadoresSnapshot.docs.map(doc => {
                    const data = doc.data();
                    const nombreCuidador = `${data.nombre} ${data.apellido}`;
                    return {
                        uid: doc.id,
                        nombreCuidador,
                        authUid: data.authUid // Suponiendo que tienes el UID de Auth almacenado en el documento
                    };
                });
                setListaCuidadores(cuidadoresLista);
            } catch (error) {
                console.error('Error al obtener los cuidadores:', error);
            }
        };

        obtenerCuidadores();
    }, []);

    // const EliminarCuidador = async (uid) => {
    //     try {
    //         // Eliminar documento de Firestore
    //         await deleteDoc(doc(FIRESTORE_DB, 'UsuariosCuidadores', uid));


    //         // Actualizar la lista de cuidadores
    //         setListaCuidadores(prevState => prevState.filter(cuidador => cuidador.uid !== uid));
    //     } catch (error) {
    //         console.error('Error al eliminar el cuidador:', error);
    //     }
    // };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Pressable style={styles.contenedorAtras} onPress={() => navigation.goBack()}>
                    <Image style={styles.iconAtras} source={require('../../../assets/Image/Flechaatras.png')} />
                </Pressable>
            </View>

            <Text style={styles.titulo}>{t("ListaCuidadores.Titulo")}</Text>

            <ScrollView style={styles.body}>
                {listaCuidadores.length === 0 ? (
                    <Text style={styles.noCuidadoresTexto}>{t("ListaCuidadores.NoCuidadores")}</Text>
                ) : (
                    listaCuidadores.map(cuidador => (
                        <View key={cuidador.uid} style={styles.checkboxContainer}>
                            <Text>{cuidador.nombreCuidador}</Text>
                            {/* <Pressable onPress={() => EliminarCuidador(cuidador.uid)}>
                                <Text style={styles.eliminarTexto}>Eliminar</Text>
                               </Pressable> */}
                        </View>
                    ))
                )}
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F1F1F1',
    },
    header: {
        height: hp('10%'),
        backgroundColor: '#AADBFF',
        justifyContent: 'center',
    },
    contenedorAtras: {
        left: wp('5%'),
        height: hp('5%'),
        width: wp('15%'),
        justifyContent: 'center',
    },
    iconAtras: {
        width: wp('10%'),
        height: hp('2.5%'),
    },
    titulo: {
        color: 'black',
        fontSize: wp('6%'),
        textAlign: 'center',
        marginVertical: hp('3%'),
        fontFamily: 'Play-fair-Display',
    },
    body: {
        height: hp('90%'),
        paddingHorizontal: wp('5%'),
    },
    checkboxContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: wp('3%'),
        backgroundColor: '#fff',
        marginBottom: hp('1%'),
        borderRadius: wp('2%'),
        elevation: 2,
    },
    eliminarTexto: {
        color: 'red',
        fontSize: wp('4%'),
    },
    noCuidadoresTexto: {
        alignSelf: 'center',
        justifyContent: 'center',
        marginTop: '50%',
        textAlign: 'center',
        fontSize: wp('4%'),
        fontWeight: 'bold'
    }
});

export default ListaCuidadores;
