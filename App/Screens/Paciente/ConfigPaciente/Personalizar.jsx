import { doc, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, Image, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Guardar from 'react-native-vector-icons/Feather';
import Pincel from 'react-native-vector-icons/Octicons';
import AnimacionRotar from '../../../components/AnimacionRotar';
import MatrixImagenes from '../../../components/MatrixImagenes';
import PrevisualizacionBienvenida from '../../../components/PrevisualizacionBienvenida';
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
                const imagen = await obtenerImagen(`Users/Paciente/${uidUser}/Bienvenida`);
                setImagenGuardada(imagen);
                console.log('obteniendo imagen Imagen: ', imagen);
            } catch (error) {
                console.log('Error al obtener imagen: ', error);
            }
        }

        inicializarImagen();


    }, [imagenGuardada])






    const handleImagen = async () => {

        if (imageElegida) {
            await cargarImagen(imageElegida, `Users/Paciente/${uidUser}/Bienvenida`);
            const imagen = await obtenerImagen(`Users/Paciente/${uidUser}/Bienvenida`);

            updateDoc(doc(FIRESTORE_DB, 'UsuariosPacientes', uidUser), {
                imagenBienvenida: imagen
            });

            setImageElegida(null);
            setImagenGuardada(null);
            Alert.alert(t('Personalizar.Exito'), t('Personalizar.ImagenCorrecta'));
        }
        else {
            Alert.alert(t('Personalizar.Aviso'), t('Personalizar.ImagenAviso'));
        }
    }

    return (
        <SafeAreaView style={styles.container}>

            <View style={styles.header}>
                <Pressable style={styles.contenedorAtras} onPress={() => { navigation.navigate('DashboardPaciente'); }}>
                    <Image style={styles.iconAtras} source={require('../../../../assets/Image/Flechaatras.png')} />
                </Pressable>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContainer}>

                <View style={styles.body}>

                    <View style={styles.GuardarPortada}>

                        <Text style={styles.TextoGuardar}>Guardar</Text>
                        <AnimacionRotar>

                            <Guardar name='save' size={wp('9%')} color='black' onPress={handleImagen} />
                        </AnimacionRotar>

                    </View>

                    <Pincel name='paintbrush' size={wp('15%')} color='black' style={styles.PincelPortada} />



                    <Text style={styles.TituloPrevisualizacion}>{t('Personalizar.PrevisualizarImagen')}</Text>

                    <PrevisualizacionBienvenida props={imageElegida ? { uri: imageElegida } : { uri: imagenGuardada }} />

                    <View style={styles.matrix}>
                        <MatrixImagenes setImagen={setImageElegida} />
                    </View>


                </View>

            </ScrollView>

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
    scrollContainer: { flexGrow: 1, }, body: { flex: 1, backgroundColor: '#94E4FF', alignItems: 'center', paddingVertical: hp('2%'), },
    PincelPortada: {
        marginTop: hp('6%'),
        marginBottom: hp('2%'),
    },
    GuardarPortada: {
        position: 'absolute',
        alignItems: 'center',
        right: wp('5%'),
        marginTop: hp('2%'),
    },
    TextoGuardar: {
        fontFamily: 'Play-fair-Display',
        fontSize: hp('2%'),
        color: 'black',
    },
    TituloPrevisualizacion: {
        fontFamily: 'Play-fair-Display',
        fontSize: hp('3%'),
        marginVertical: hp('2%'),
        color: 'black',
    },
    matrix: {
        marginVertical: wp('9%'),
        marginHorizontal: wp('5%'),
    },


})