import * as ImagePicker from 'expo-image-picker';
import { doc, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, Image, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Guardar from 'react-native-vector-icons/Feather';
import Pincel from 'react-native-vector-icons/Octicons';
import AnimacionRotar from '../../../components/AnimacionRotar';
import BotonPersonalizar from '../../../components/BotonPersonalizarLocal';
import PrevisualizacionBienvenidaCuidador from '../../../components/PrevisualizacionBienvenidaCuidador';
import { FIREBASE_AUTH, FIRESTORE_DB } from '../../../firebase/config';
import { cargarImagen, obtenerImagen } from '../../../services/storage';


const Personalizar = ({ navigation }) => {

    const uidUser = FIREBASE_AUTH.currentUser.uid;
    const [imageElegida, setImageElegida] = useState(null);
    const [imagenGuardada, setImagenGuardada] = useState(null);

    const { t } = useTranslation();

    useEffect(() => {

        const inicializarImagen = async () => {

            try {
                const imagen = await obtenerImagen(`Users/Cuidador/${uidUser}/Bienvenida`);
                setImagenGuardada(imagen);
                console.log('obteniendo imagen Imagen: ', imagen);
            } catch (error) {
                console.log('Error al obtener imagen: ', error);
            }
        }

        inicializarImagen();


    })




    const elegirImagen = async () => {
        let res = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            aspect: [2, 3],
            allowsEditing: true,

        })

        console.log(res);

        if (!res.canceled) {
            setImageElegida(res.assets[0].uri);
        }
    }

    const handleImagen = async () => {

        if (imageElegida) {
            await cargarImagen(imageElegida, `Users/Cuidador/${uidUser}/Bienvenida`);
            const imagen = await obtenerImagen(`Users/Cuidador/${uidUser}/Bienvenida`);

            updateDoc(doc(FIRESTORE_DB, 'UsuariosCuidadores', uidUser), {
                imagenBienvenida: imagen
            });

            setImageElegida(null);
            Alert.alert(t('Personalizar.Exito'), t('Personalizar.ImagenCorrecta'));
        }
        else {
            Alert.alert(t('Personalizar.Aviso'), t('Personalizar.ImagenAviso'));
        }
    }

    return (
        <SafeAreaView style={styles.container}>

            <View style={styles.header}>
                <Pressable style={styles.contenedorAtras} onPress={() => { navigation.navigate('DashboardCuidador'); }}>
                    <Image style={styles.iconAtras} source={require('../../../../assets/Image/Flechaatras.png')} />
                </Pressable>
            </View>

            <View style={styles.body}>

                <AnimacionRotar>
                    <Guardar name='save' size={wp('10%')} color='black' style={styles.GuardarPortada} onPress={handleImagen} />
                </AnimacionRotar>

                <Pincel name='paintbrush' size={wp('15%')} color='black' style={styles.PincelPortada} />

                <Pressable>
                    <BotonPersonalizar props={{ funcion: elegirImagen }} />
                </Pressable>


                <Text style={styles.TituloPrevisualizacion}>{t('Personalizar.PrevisualizarImagen')}</Text>

                <PrevisualizacionBienvenidaCuidador props={imageElegida ? { uri: imageElegida } : { uri: imagenGuardada }} />

            </View>


        </SafeAreaView>
    )
}

export default Personalizar

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#3498DB',
    },
    header: {
        height: hp('10%'),
        backgroundColor: '#3498DB',
        justifyContent: 'center'
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
    body: {
        height: hp('90%'),
        backgroundColor: '#AADBFF',
        alignItems: 'center',
    },
    PincelPortada: {
        marginTop: hp('7%'),
        marginBottom: hp('3%'),
    },
    GuardarPortada: {
        position: 'absolute',
        left: wp('33%'),
        marginTop: hp('2.5%'),
    },
    TituloPrevisualizacion: {
        fontFamily: 'Play-fair-Display',
        fontSize: hp('3%'),
        marginVertical: hp('2%'),
        color: 'black',
    }

})