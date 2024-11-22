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
    const [isLoading, setIsLoading] = useState(true); // Estado para indicar si está cargando la imagen

    const { t } = useTranslation();

    useEffect(() => {
        const inicializarImagen = async () => {
            try {
                const imagen = await obtenerImagen(`Users/Paciente/${uidUser}/Bienvenida`);
                setImagenGuardada(imagen);
                setIsLoading(false);
                console.log('Obteniendo imagen:', imagen);
            } catch (error) {
                console.log('Error al obtener imagen:', error);
            } finally {
                setIsLoading(false); // Deja de cargar cuando termine
            }
        };

        inicializarImagen();
    }, [imagenGuardada]);

    const handleImagen = async () => {
        setIsLoading(true);
        if (imageElegida) {
            await cargarImagen(imageElegida, `Users/Paciente/${uidUser}/Bienvenida`);
            const imagen = await obtenerImagen(`Users/Paciente/${uidUser}/Bienvenida`);

            updateDoc(doc(FIRESTORE_DB, 'UsuariosPacientes', uidUser), {
                imagenBienvenida: imagen,
            });

            setImageElegida(null);
            setImagenGuardada(null);
            Alert.alert(t('Personalizar.Exito'), t('Personalizar.ImagenCorrecta'));
        } else {
            Alert.alert(t('Personalizar.Aviso'), t('Personalizar.ImagenAviso'));
            setIsLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Pressable style={styles.contenedorAtras} onPress={() => navigation.navigate('DashboardPaciente')}>
                    <Image style={styles.iconAtras} source={require('../../../../assets/Image/Flechaatras.png')} />
                </Pressable>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.body}>



                    <Pincel name="paintbrush" size={wp('15%')} color="black" style={styles.PincelPortada} />

                    <Text style={styles.TituloPrevisualizacion}>{t('Personalizar.PrevisualizarImagen')}</Text>


                    <PrevisualizacionBienvenida
                        imagen={imageElegida ? { uri: imageElegida } : { uri: imagenGuardada }}
                        condicion={isLoading}
                    />

                    <View style={styles.matrix}>
                        <MatrixImagenes setImagen={setImageElegida} />
                    </View>

                    <AnimacionRotar>
                        <Pressable style={styles.GuardarPortada} onPress={handleImagen}>
                            <Guardar name='save' size={wp('9%')} color='black' />
                        </Pressable>
                    </AnimacionRotar>


                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Personalizar;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#3498DB',
    },
    header: {
        height: hp('10%'),
        backgroundColor: '#3498DB',
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
    scrollContainer: {
        flexGrow: 1,
    },
    body: {
        flex: 1,
        backgroundColor: '#94E4FF',
        alignItems: 'center',
        paddingVertical: hp('2%'),
    },
    PincelPortada: {
        marginTop: hp('3%'),
        marginBottom: hp('3%'),
    },

    TituloPrevisualizacion: {
        fontFamily: 'Play-fair-Display',
        fontSize: hp('3%'),
        marginVertical: hp('2%'),
        color: 'black',
    },
    matrix: {
        marginTop: wp('9%'),
        marginBottom: hp('2%'),
        marginHorizontal: wp('5%'),
    },

    GuardarPortada: {
        width: wp('70%'),
        height: hp('6%'),
        borderRadius: hp('2%'),
        borderWidth: 1,
        backgroundColor: 'white',
        marginBottom: hp('2%'),
        alignItems: 'center',
        justifyContent: 'center',
    },

});
