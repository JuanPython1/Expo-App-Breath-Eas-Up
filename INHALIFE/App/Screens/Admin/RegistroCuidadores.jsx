import React, { useState, useRef } from 'react';
import {
    View, Text, Pressable, Image, StyleSheet, TextInput, Button, KeyboardAvoidingView,
    SafeAreaView, Platform, ScrollView, ActivityIndicator, Modal, Alert
} from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { FIREBASE_AUTH, FIRESTORE_DB } from '../../firebase/config';
import { collection, doc, getDocs, setDoc } from 'firebase/firestore';
import MaterialIcon from 'react-native-vector-icons/Entypo';

const RegistroCuidadores = ({ navigation }) => {
    const [usuario, setUsuario] = useState('');
    const [nombres, setNombres] = useState('');
    const [apellidos, setApellidos] = useState('');
    const [correo, setCorreo] = useState('');
    const [contraseña, setContraseña] = useState('');
    const [loading, setLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [passwordVisible, setPasswordVisible] = useState(false);

    // Referencias para cada TextInput
    const nombresRef = useRef(null);
    const apellidosRef = useRef(null);
    const correoRef = useRef(null);
    const contraseñaRef = useRef(null);

    const auth = FIREBASE_AUTH;
    const firestore = FIRESTORE_DB;

    const ValidacionesYRegistro = async () => {
        if (!usuario || !nombres || !apellidos) {
            setModalVisible(false)
            alert('Por favor, completa todos los campos requeridos.');
            return;
        }

        if (!correo) {
            setModalVisible(false)
            alert('Por favor, llena el correo electronico.');
            return;
        }

        if (!contraseña) {
            setModalVisible(false)
            alert('Por favor, completa el ingreso de las contraseñas.');
            return;
        }

        if (usuario && nombres && apellidos && correo && contraseña) {
            const usuarioExists = await checkUsernameExists(usuario);
            if (usuarioExists) {
                setModalVisible(false)
                alert('El nombre del Cuidador ya existe, escribe otro.')
            } else {
                setModalVisible(false)
                signUp();
                alert('El Cuidador se registro Exitosammente.')
                navigation.navigate('DashboardAdmin');
            }
        }
    }

    const checkUsernameExists = async (username) => {
        const querySnapshot = await getDocs(collection(firestore, 'UsuariosCuidadores'));
        const usernames = querySnapshot.docs.map(doc => doc.data().nombreUsuario);
        return usernames.includes(username);
    };

    const signUp = async () => {
        setLoading(true);
        try {
            const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAxeAPzMfHxcjDZCd_VlFbveNcyPTWLXyU', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: correo,
                    password: contraseña,
                    returnSecureToken: false // Esto evita que se devuelva un token de acceso
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error.message);
            }

            console.log('Usuario registrado exitosamente');

            // Continúa guardando el UID del usuario en Firestore
            const userData = await response.json();
            const uid = userData.localId; // Obtener el UID del usuario creado
            const userRef = doc(firestore, 'UsuariosCuidadores', uid);
            await setDoc(userRef, {
                nombreUsuario: usuario,
                email: correo,
                nombre: nombres,
                apellido: apellidos,
                rol: 'Cuidador'
            });

            setLoading(false);
            // No hay redirección o inicio de sesión automático después del registro
        } catch (error) {
            console.log(error.message);
            switch (error.message) {
                case 'EMAIL_EXISTS':
                    alert('El correo electrónico ya está en uso por otro cuidador.');
                    break;
                case 'INVALID_EMAIL':
                    alert('El correo electrónico proporcionado no es válido.');
                    break;
                case 'OPERATION_NOT_ALLOWED':
                    alert('La operación no está permitida. Consulta la configuración de tu proyecto Firebase para asegurarte de que la autenticación con correo electrónico y contraseña esté habilitada.');
                    break;
                case 'WEAK_PASSWORD':
                    alert('La contraseña proporcionada no es lo suficientemente segura.');
                    break;
                // Otros errores que puedan surgir
                default:
                    alert('Registro fallido. Por favor, inténtalo de nuevo más tarde.');
            }
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
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Pressable style={styles.contenedorAtras} onPress={() => { navigation.goBack() }}>
                    <Image style={styles.iconAtras} source={require('../../../assets/Image/Flechaatras.png')} />
                </Pressable>
            </View>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}

                style={styles.keyboardAvoidingView}
            >
                <ScrollView contentContainerStyle={styles.scrollViewContent} keyboardShouldPersistTaps="handled">
                    <Text style={styles.textoRegistroCuidador}>REGISTRO DE CUIDADOR</Text>

                    <View style={styles.formContainer}>
                        <Text style={styles.label}>Usuario</Text>
                        <TextInput
                            style={styles.input}
                            value={usuario}
                            onChangeText={setUsuario}
                            placeholder="Ingrese el usuario del Cuidador"
                            returnKeyType="next"
                            onSubmitEditing={() => nombresRef.current.focus()}
                            blurOnSubmit={false}
                        />
                        <Text style={styles.label}>Nombres</Text>
                        <TextInput
                            ref={nombresRef}
                            style={styles.input}
                            value={nombres}
                            onChangeText={setNombres}
                            placeholder="Ingrese los nombres"
                            returnKeyType="next"
                            onSubmitEditing={() => apellidosRef.current.focus()}
                            blurOnSubmit={false}
                        />
                        <Text style={styles.label}>Apellidos</Text>
                        <TextInput
                            ref={apellidosRef}
                            style={styles.input}
                            value={apellidos}
                            onChangeText={setApellidos}
                            placeholder="Ingrese los apellidos"
                            returnKeyType="next"
                            onSubmitEditing={() => correoRef.current.focus()}
                            blurOnSubmit={false}
                        />
                        <Text style={styles.label}>Correo</Text>
                        <TextInput
                            ref={correoRef}
                            style={styles.input}
                            value={correo}
                            onChangeText={setCorreo}
                            placeholder="Ingrese el correo electronico"
                            keyboardType="email-address"
                            returnKeyType="next"
                            onSubmitEditing={() => contraseñaRef.current.focus()}
                            blurOnSubmit={false}
                        />
                        <Text style={styles.label}>Contraseña</Text>
                        <View style={styles.passwordContainer}>
                            <TextInput
                                ref={contraseñaRef}
                                style={styles.inputContraseña}
                                value={contraseña}
                                onChangeText={setContraseña}
                                placeholder="Ingrese la contraseña"
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
                                <Text style={styles.TextoEntrar}>REGISTRAR</Text>
                            </Pressable>
                        )}
                    </View>
                </ScrollView>




            </KeyboardAvoidingView>

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
                        <Text style={styles.modalText}>¿Segura quieres registrar al cuidador {nombres}?</Text>
                        <View style={styles.buttonContainer}>
                            <Pressable
                                style={[styles.button, styles.buttonConfirm]}
                                onPress={ValidacionesYRegistro}
                            >
                                <Text style={styles.textStyle}>Si</Text>
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
        </SafeAreaView>
    );
};

export default RegistroCuidadores;

const styles = StyleSheet.create({
    container: {
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
        justifyContent: 'center',
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
