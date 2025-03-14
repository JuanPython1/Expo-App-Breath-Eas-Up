import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Device from 'expo-device';
import { useFonts } from 'expo-font';
import * as Notificaciones from 'expo-notifications';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Platform } from 'react-native';
import { FIREBASE_AUTH, FIRESTORE_DB } from '../firebase/config';
import LoadingScreen from '../Screens/LoadingScreen';
// Screens rol, login, Registro


//Navigators
import AdminNavigator from './AdminNavigator';
import CuidadorNavigator from './CuidadorNavigator';
import GeneralNavigator from './GeneralNavigator';
import PacienteNavigator from './PacienteNavigator';


const Stack = createNativeStackNavigator();

Notificaciones.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
    })
})


const AppNavigator = () => {
    const [userRole, setUserRole] = useState(null);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [expoPushToken, setExpoPushToken] = React.useState('');


    const [loaded] = useFonts({
        'noticia-text': require('../../assets/fonts/NoticiaText-BoldItalic.ttf'),
        'Play-fair-Display': require('../../assets/fonts/EBGaramond-Regular.ttf'),
        'Vogue': require('../../assets/fonts/Vogue.ttf')
    });

    useEffect(() => {
        const registerForPushNotificationAsync = async () => {
            let token = null;
            if (user && (userRole === 'paciente' || userRole === 'cuidador' || userRole === 'admin' || userRole === 'familiar')) {
                if (Device.isDevice) {
                    const { status: existingStatus } = await Notificaciones.getPermissionsAsync();
                    let finalStatus = existingStatus;
                    if (existingStatus !== 'granted') {
                        const { status } = await Notificaciones.requestPermissionsAsync();
                        finalStatus = status
                    }
                    if (finalStatus !== 'granted') {
                        alert('La obtención del token del push Notification fue fallida')
                    } else {
                        token = (await Notificaciones.getExpoPushTokenAsync()).data;
                        console.log('este es el token actual: ', token);
                    }
                } else { return; }

                if (Platform.OS === 'android') {
                    Notificaciones.setNotificationChannelAsync('default', {
                        name: 'default',
                        importance: Notificaciones.AndroidImportance.MAX,
                        vibrationPattern: [0, 250, 250, 250],
                        lightColor: '#FF231F7C',
                    });
                }
            }
            return token;
        }

        registerForPushNotificationAsync().then(token => {
            if (token) {
                setExpoPushToken(token)
            }
        });

    }, [user]);


    onAuthStateChanged(FIREBASE_AUTH, async (user) => {
            if (user) {
                setUser(user);
                // Verificar si el UID del usuario pertenece a usuariosPacientes
                const docRefPaciente = doc(FIRESTORE_DB, 'UsuariosPacientes', user.uid);
                const docSnapPaciente = await getDoc(docRefPaciente);

                // Verificar si el UID del usuario pertenece a usuariosCuidadores
                const docRefCuidador = doc(FIRESTORE_DB, 'UsuariosCuidadores', user.uid);
                const docSnapCuidador = await getDoc(docRefCuidador);

                const docRefAdmin = doc(FIRESTORE_DB, 'Administradores', user.uid);
                const docSnapAdministrador = await getDoc(docRefAdmin);

                if (docSnapPaciente.exists() && user.emailVerified) {
                    setUserRole('paciente');

                } else if (docSnapCuidador.exists()) {
                    setUserRole('cuidador');

                } else if (docSnapAdministrador.exists()) {
                    setUserRole('Admin');

                } else if (docSnapPaciente.exists() && !user.emailVerified) {
                    FIREBASE_AUTH.signOut();
                    setUserRole(null);
                    setUser(null);

                }

            } else {
                FIREBASE_AUTH.signOut();
                setUser(null);
                setUserRole(null);
            }
            setLoading(false);
        });


    if (!loaded || loading) {
        return <LoadingScreen />;
    }



    return (
        <NavigationContainer>

            <Stack.Navigator>

                {user && userRole === 'paciente' && user.emailVerified ? (
                    <Stack.Screen name='Paciente' component={PacienteNavigator} options={{ headerShown: false }} />
                ) : user && userRole === 'cuidador' ? (
                    <Stack.Screen name='Cuidador' component={CuidadorNavigator} options={{ headerShown: false }} />
                ) : user && userRole == 'Admin' ? (
                    <Stack.Screen name='Admin' component={AdminNavigator} options={{ headerShown: false }} />
                ) :
                    (<Stack.Screen name='General' component={GeneralNavigator} options={{ headerShown: false }} />)}



            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default AppNavigator