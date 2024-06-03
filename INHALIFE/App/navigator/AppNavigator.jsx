
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useState, useEffect } from 'react';
import { useFonts } from 'expo-font';
import LoadingScreen from '../Screens/LoadingScreen';
import { User, onAuthStateChanged } from 'firebase/auth';
import { FIREBASE_AUTH, FIRESTORE_DB } from '../firebase/config';
import { doc, getDoc } from 'firebase/firestore';
import * as Device from 'expo-device'
import * as Notificaciones from 'expo-notifications';
import { View, Text, Platform } from 'react-native';
// Screens rol, login, Registro
import Rol from '../Screens/Rol';

// Login y Registro Paciente
import LoginPaciente from '../Screens/Paciente/LoginRegistro/LoginPaciente';
import RegistroPaciente from '../Screens/Paciente/LoginRegistro/RegistroPaciente';
import OlvidoContraseñaPaciente from '../Screens/Paciente/LoginRegistro/OlvidoContraseña';
// Screens dashboard paciente
import BienvenidaPaciente from '../Screens/Paciente/Dashboard/BienvenidaPaciente';
import DashboardPaciente from '../Screens/Paciente/Dashboard/DashboardPaciente';
import RecordatorioDosis from '../Screens/Paciente/Dashboard/RecordatorioDosis/RecordatorioDosis';
import VideoTutoriales from '../Screens/Paciente/Dashboard/VideoTutoriales';
import NotificacionesPacientes from '../Screens/Paciente/Dashboard/notificacionesActivas'

// Registro Dosis Paciente
import BienvenidaRegistroDosis from '../Screens/Paciente/Dashboard/RegistroDosis/BienvenidaRegistroDosis';
import Medicamento from '../Screens/Paciente/Dashboard/RegistroDosis/Medicamento';
import CantidadPuff from '../Screens/Paciente/Dashboard/RegistroDosis/CantidadPuff'
import FechaDosisDiaria from '../Screens/Paciente/Dashboard/RegistroDosis/FechaDosisDiaria';
import ElegirCuidador from '../Screens/Paciente/Dashboard/RegistroDosis/ElegirCuidador';
import RegistrarDosis from '../Screens/Paciente/Dashboard/RegistroDosis/RegistrarDosis'
import GraciasPorRegistrar from '../Screens/Paciente/Dashboard/RegistroDosis/GraciasPorRegistrar'

// Recordatorios dosis pacientes
import InforRecordatorioDosisPaciente from '../Screens/Paciente/Dashboard/RecordatorioDosis/InfoRecordatorioDosisPaciente'

// CUIDADOR

// Login Cuidador
import LoginCuidador from '../Screens/Cuidador/Login/LoginCuidador';
import OlvidoContraseñaCuidador from '../Screens/Cuidador/Login/OlvidoContraseña'

// Dashboard Cuidador
import DashboardCuidador from '../Screens/Cuidador/DashBoard/DashboardCuidador'
import RecordatorioDosisCompartidos from '../Screens/Cuidador/DashBoard/RecordatoriosDosisCompartidos'
import BienvenidaCuidador from '../Screens/Cuidador/DashBoard/BienvenidaCuidador'

//InfoCompartido
import InfoRecordatorioDosisCompartida from '../Screens/Cuidador/DashBoard/InfoRecordatorioDosisCompartida';
import CuidadorNavigator from './CuidadorNavigator';
import PacienteNavigator from './PacienteNavigator'


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
            if (user && (userRole === 'paciente' || userRole === 'cuidador')) {
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
            console.log("Token:", token);
            return token;
        }

        registerForPushNotificationAsync().then(token => {
            if (token) {
                setExpoPushToken(token)
            }
        });
    }, [user, userRole]);


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, async (user) => {
            console.log('user', user);
            console.log('rol', userRole)
            setUser(user);

            if (user) {
                // Verificar si el UID del usuario pertenece a usuariosPacientes
                const docRefPaciente = doc(FIRESTORE_DB, 'UsuariosPacientes', user.uid);
                const docSnapPaciente = await getDoc(docRefPaciente);

                // Verificar si el UID del usuario pertenece a usuariosCuidadores
                const docRefCuidador = doc(FIRESTORE_DB, 'UsuariosCuidadores', user.uid);
                const docSnapCuidador = await getDoc(docRefCuidador);

                if (docSnapPaciente.exists()) {
                    setUserRole('paciente');

                } else if (docSnapCuidador.exists()) {
                    setUserRole('cuidador');

                } else {
                    setUserRole(null);
                }





            } else {
                setUserRole(null);
            }
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    if (!loaded || loading) {
        return <LoadingScreen />;
    }



    return (
        <NavigationContainer>

            <Stack.Navigator>

                {userRole === 'paciente' ? (
                    <Stack.Screen name='Paciente' component={PacienteNavigator} options={{ headerShown: false }} />
                ) : userRole === 'cuidador' ? (
                    <Stack.Screen name='Cuidador' component={CuidadorNavigator} options={{ headerShown: false }} />
                ) : (
                    <Stack.Screen name='Rol' component={Rol} options={{ headerShown: false }} />
                )}


                {/* Login y Registro Paciente */}
                <Stack.Screen name='LoginPaciente' component={LoginPaciente} options={{ headerShown: false }} />
                <Stack.Screen name='RegistroPaciente' component={RegistroPaciente} options={{ headerShown: false }} />
                <Stack.Screen name='OlvidoContraseñaPaciente' component={OlvidoContraseñaPaciente} options={{ headerShown: false }} />

                {/* Dashoard Paciente */}
                <Stack.Screen name='BienvenidaPaciente' component={BienvenidaPaciente} options={{ headerShown: false }} />
                <Stack.Screen name='DashboardPaciente' component={DashboardPaciente} options={{ headerShown: false }} />
                <Stack.Screen name='RecordatorioDosis' component={RecordatorioDosis} options={{ headerShown: false }} />
                <Stack.Screen name='VideoTutoriales' component={VideoTutoriales} options={{ headerShown: true }} />
                <Stack.Screen name='notificacionesPacientes' component={NotificacionesPacientes} options={{ headerShown: false }} />

                {/* Registro dosis paciente */}
                <Stack.Screen name='BienvenidaRegistroDosis' component={BienvenidaRegistroDosis} options={{ headerShown: false }} />
                <Stack.Screen name='Medicamento' component={Medicamento} options={{ headerShown: false }} />
                <Stack.Screen name='CantidadPuff' component={CantidadPuff} options={{ headerShown: false }} />
                <Stack.Screen name='FechaDosisDiaria' component={FechaDosisDiaria} options={{ headerShown: false }} />
                <Stack.Screen name='ElegirCuidador' component={ElegirCuidador} options={{ headerShown: false }} />
                <Stack.Screen name='RegistrarDosis' component={RegistrarDosis} options={{ headerShown: false }} />
                <Stack.Screen name={'GraciasPorRegistrar'} component={GraciasPorRegistrar} options={{ headerShown: false }} />

                {/* info recordatorio dosis */}
                <Stack.Screen name='InfoRecordatorioDosisPaciente' component={InforRecordatorioDosisPaciente} options={{ headerShown: false }} />

                {/* CUIDADOR */}

                <Stack.Screen name='LoginCuidador' component={LoginCuidador} options={{ headerShown: false }} />
                <Stack.Screen name='OlvidoContraseñaCuidador' component={OlvidoContraseñaCuidador} options={{ headerShown: false }} />

                {/* Dashboard Cuidador */}
                <Stack.Screen name='DashboardCuidador' component={DashboardCuidador} options={{ headerShown: false }} />
                <Stack.Screen name='RecordatorioDosisCompartidos' component={RecordatorioDosisCompartidos} options={{ headerShown: false }} />
                <Stack.Screen name='BienvenidaCuidador' component={BienvenidaCuidador} options={{ headerShown: false }} />

                {/* Info recordatorio dosis compartida */}
                <Stack.Screen name='InfoRecordatorioDosisCompartida' component={InfoRecordatorioDosisCompartida} options={{ headerShown: false }} />


            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default AppNavigator