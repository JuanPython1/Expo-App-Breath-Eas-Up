import { collection, doc, getDocs, setDoc, updateDoc } from 'firebase/firestore';
import React, { useRef, useState } from 'react';
import {
    ActivityIndicator,
    Image,
    KeyboardAvoidingView,
    Modal,
    Platform,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View
} from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import MaterialIcon from 'react-native-vector-icons/Entypo';
import { FIREBASE_AUTH, FIRESTORE_DB } from '../../firebase/config';
import { cargarImagenMIMEType, obtenerImagen } from '../../services/storage';

import { useTranslation } from "react-i18next";

const RegistroCuidadores = ({ navigation }) => {
    const [usuario, setUsuario] = useState('');
    const [nombres, setNombres] = useState('');
    const [apellidos, setApellidos] = useState('');
    const [correo, setCorreo] = useState('');
    const [contraseña, setContraseña] = useState('');
    const [loading, setLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [passwordVisible, setPasswordVisible] = useState(false);
    // const [uidActual, setUidActual] = useState('');

    // Referencias para cada TextInput
    const nombresRef = useRef(null);
    const apellidosRef = useRef(null);
    const correoRef = useRef(null);
    const contraseñaRef = useRef(null);

    const auth = FIREBASE_AUTH;
    const firestore = FIRESTORE_DB;

    const APIKEY = process.env.EXPO_PUBLIC_APIKEY

    const { t } = useTranslation();

    const ValidacionesYRegistro = async () => {
        if (!usuario || !nombres || !apellidos) {
            setModalVisible(false)
            alert(t("ValidacionesRegistroCuidador.TodosCampos"));
            return;
        }

        if (!correo) {
            setModalVisible(false)
            alert(t("ValidacionesRegistroCuidador.LlenarCorreo"));
            return;
        }

        if (!contraseña) {
            setModalVisible(false)
            alert(t("ValidacionesRegistroCuidador.LlenarContrasena"));
            return;
        }

        if (contraseña.length < 6) {
            setModalVisible(false)
            alert(t("ValidacionesRegistroCuidador.ContrasenaCorta"));
            return;
        }

        if (usuario && nombres && apellidos && correo && contraseña) {
           const usuarioExists = await checkUsernameExists(usuario);
            if (usuarioExists) {
                setModalVisible(false)
                alert(t("ValidacionesRegistroCuidador.UsuarioExiste"));
            } else {
                setModalVisible(false)
                const result = await signUp();
                if (result.success) {
                    alert(t("ValidacionesRegistroCuidador.UsuarioRegistrado"));
                    navigation.navigate('DashboardAdmin');
                }
            }
        }
    }

    const checkUsernameExists = async (username) => {
        const querySnapshot = await getDocs(collection(firestore, 'UsuariosCuidadores'));
        const usernames = querySnapshot.docs.map(doc => doc.data().nombreUsuario);
        return usernames.includes(username);
    };

    const avatarNew = async (uidActual) => {
        const dinoImagen = 'https://firebasestorage.googleapis.com/v0/b/inhalapp.appspot.com/o/imagenesPredeterminadas%2Fdino.png?alt=media&token=bb24863e-1b72-4749-86ce-9485118164ef';

        console.log('dinoimagen', dinoImagen);

        console.log('uid user:', uidActual);

        await cargarImagenMIMEType(dinoImagen, `Users/Cuidador/${uidActual}/Bienvenida`);

        console.log('Imagen subida');

        const imagen = await obtenerImagen(`Users/Cuidador/${uidActual}/Bienvenida`);

        console.log('Imagen obtenida:', imagen);

        updateDoc(doc(firestore, 'UsuariosCuidadores', uidActual), { imagenBienvenida: imagen });

        console.log('Imagen actualizada');

        // setUidActual('');
    }

    const subirDatos = async (uidActual) => {
        console.log('uidActual:', uidActual);
        const userRef = doc(firestore, 'UsuariosCuidadores', uidActual);
        console.log('userRef:', userRef);
        await setDoc(userRef, {
            nombreUsuario: usuario,
            email: correo,
            nombre: nombres,
            apellido: apellidos,
            rol: 'Cuidador'
        });
    }



const signUp = async () => {
    setLoading(true);
    try {
        const response = await fetch(
            `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${APIKEY}`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: correo,
                    password: contraseña,
                    returnSecureToken: false
                }),
            }
        );

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error.message);
        }

        console.log('Usuario registrado exitosamente');
        const userData = await response.json();
        const uid = userData.localId;

        await subirDatos(uid);
        await avatarNew(uid);

        return { success: true }; 
    } catch (error) {
        console.log(error.message);
        switch (error.message) {
            case 'EMAIL_EXISTS':
                alert(t("ErrorRegistroCuidador.CorreoUsado"));
                break;
            case 'INVALID_EMAIL':
                alert(t("ErrorRegistroCuidador.CorreoInvalido"));
                break;
            case 'OPERATION_NOT_ALLOWED':
                alert(t("ErrorRegistroCuidador.OperacionNoValida"));
                break;
            case 'WEAK_PASSWORD':
                alert(t("ErrorRegistroCuidador.ContrasenaInsegura"));
                break;
            default:
                alert(t("ErrorRegistroCuidador.RegistroFallido"));
        }
        return { success: false }; // ❌ devolvemos error
    } finally {
        setLoading(false);
    }
};



    const handleModal = () => {
        setModalVisible(true);
    };


    const cleanRegister = () => {
        setLoading(true);
        setModalVisible(false);
        // Aquí puedes manejar el registro del usuario
        console.log({ usuario, nombres, apellidos, correo, contraseña });
        // Vaciar los useState
        setUsuario('');
        setNombres('');
        setApellidos('');
        setCorreo('');
        setContraseña('');
        setLoading(false);
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.keyboardAvoidingView}
            keyboardVerticalOffset={Platform.select({ ios: 0, android: 35 })}
        >
            <View style={styles.header}>
                <Pressable style={styles.contenedorAtras} onPress={() => { navigation.goBack() }}>
                    <Image style={styles.iconAtras} source={require('../../../assets/Image/Flechaatras.png')} />
                </Pressable>
            </View>

            <ScrollView contentContainerStyle={styles.scrollViewContent} keyboardShouldPersistTaps="handled" contentInsetAdjustmentBehavior="always">

                <View style={styles.formContainer}>
                    <View style={styles.Titulo}>
                        <Text style={styles.textoRegistroCuidador}>{t("RegistroCuidador.Titulo")}</Text>
                    </View>


                    <Text style={styles.label}>{t("RegistroCuidador.Usuario")}</Text>
                    <TextInput
                        style={styles.input}
                        value={usuario}
                        onChangeText={setUsuario}
                        placeholder={t("RegistroCuidador.IngreseUsuario")}
                        returnKeyType="next"
                        onSubmitEditing={() => nombresRef.current.focus()}
                        blurOnSubmit={false}
                    />
                    <Text style={styles.label}>{t("RegistroCuidador.Nombres")}</Text>
                    <TextInput
                        ref={nombresRef}
                        style={styles.input}
                        value={nombres}
                        onChangeText={setNombres}
                        placeholder={t("RegistroCuidador.IngreseNombres")}
                        returnKeyType="next"
                        onSubmitEditing={() => apellidosRef.current.focus()}
                        blurOnSubmit={false}
                    />
                    <Text style={styles.label}>{t("RegistroCuidador.Apellidos")}</Text>
                    <TextInput
                        ref={apellidosRef}
                        style={styles.input}
                        value={apellidos}
                        onChangeText={setApellidos}
                        placeholder={t("RegistroCuidador.IngreseApellidos")}
                        returnKeyType="next"
                        onSubmitEditing={() => correoRef.current.focus()}
                        blurOnSubmit={false}
                    />
                    <Text style={styles.label}>{t("RegistroCuidador.Correo")}</Text>

                    <TextInput
                        ref={correoRef}
                        style={styles.input}
                        value={correo}
                        onChangeText={setCorreo}
                        placeholder={t("RegistroCuidador.IngreseCorreo")}
                        keyboardType="email-address"
                        returnKeyType="next"
                        onSubmitEditing={() => contraseñaRef.current.focus()}
                        blurOnSubmit={false}

                    />
                    <Text style={styles.label}>{t("RegistroCuidador.Contrasena")}</Text>
                    <View style={styles.passwordContainer}>
                        <TextInput
                            ref={contraseñaRef}
                            style={styles.inputContraseña}
                            value={contraseña}
                            onChangeText={setContraseña}
                            placeholder={t("RegistroCuidador.IngreseContrasena")}
                            secureTextEntry={!passwordVisible}
                            returnKeyType="done"
                            onSubmitEditing={handleModal}
                        />
                        <Pressable style={styles.OjoContainer} onPress={() => setPasswordVisible(!passwordVisible)}>
                            <MaterialIcon
                                name={passwordVisible ? 'eye' : 'eye-with-line'}
                                size={24}
                                color="black"
                            />
                        </Pressable>
                    </View>
                    {loading ? (
                        <ActivityIndicator size={'large'} color={'#F94242'} />
                    ) : (
                        <Pressable style={styles.BotonEntrar} onPress={handleModal}>
                            <Text style={styles.TextoEntrar}>{t("RegistroCuidador.BotonRegistrar")}</Text>
                        </Pressable>
                    )}
                </View>
            </ScrollView>





            <Modal
                transparent={true}
                animationType="slide"
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>{t("ModalSeguroRegistrarCuidador.Contexto")} {nombres}?</Text>
                        <View style={styles.buttonContainer}>
                            <Pressable
                                style={[styles.button, styles.buttonConfirm]}
                                onPress={ValidacionesYRegistro}
                            >
                                <Text style={styles.textStyle}>{t("ModalSeguroRegistrarCuidador.Registrar")}</Text>
                            </Pressable>
                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={cleanRegister}
                            >
                                <Text style={styles.textStyle}>No</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>

        </KeyboardAvoidingView>

    );
};

export default RegistroCuidadores;

const styles = StyleSheet.create({
    Titulo: {
        flex: 1,
        backgroundColor: '#F1F1F1',
    },
    keyboardAvoidingView: {
        flex: 1,
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
    scrollViewContent: {
        flexGrow: 1,
    },
    textoRegistroCuidador: {
        fontSize: wp('7%'),
        alignSelf: 'center',
        paddingVertical: hp('4%'),
        textAlign: 'center',
        paddingHorizontal: wp('10%'),
        fontFamily: 'Play-fair-Display',
    },
    formContainer: {
        justifyContent: 'center',
        paddingHorizontal: wp('7%'),
    },
    label: {
        fontSize: wp('4%'),
        marginBottom: hp('1%'),
        color: '#333',
        fontFamily: 'Play-fair-Display',
    },
    input: {
        height: hp('6%'),
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: wp('3%'),
        marginBottom: hp('2%'),
    },
    BotonEntrar: {
        marginVertical: hp('1%'),
        marginHorizontal: wp('15%'),
        height: hp('6%'),
        borderWidth: 1,
        padding: hp('1%'),
        backgroundColor: '#AADBFF',
        justifyContent: 'center',
    },
    TextoEntrar: {
        textAlign: 'center',
        fontFamily: 'Play-fair-Display',
        fontWeight: 'bold',
        fontSize: hp('2%'),
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    button: {
        paddingVertical: hp('1%'),
        paddingHorizontal: wp('10%'),
        elevation: 2,
        marginHorizontal: 10,
    },
    buttonClose: {
        backgroundColor: '#FF0000',
        marginTop: 10,
    },
    buttonConfirm: {
        backgroundColor: '#00AAE4',
        marginTop: 10,
    },
    passwordContainer: {
        flexDirection: 'row',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        width: wp('85%')
    },
    inputContraseña: {
        height: hp('6%'),
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: wp('3%'),
        marginBottom: hp('2%'),
        marginVertical: hp('1%'),
        width: '100%',
        padding: hp('1%'),
        justifyContent: 'center'
    },

    OjoContainer: {
        position: 'absolute',
        right: wp('5%'),
        top: hp('2.7%'),
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
        fontSize: wp('5%'),
        fontFamily: 'Play-fair-Display',
    },

});
