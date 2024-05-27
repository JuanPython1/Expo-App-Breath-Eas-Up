import { NavigationContainer } from '@react-navigation/native';
import { StatusBar, View, Text } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { doc, getDoc } from 'firebase/firestore';
import { User, onAuthStateChanged } from 'firebase/auth';
import React, { useState, useEffect } from 'react';
import { FIREBASE_AUTH, FIRESTORE_DB } from './Firebase/config';
import { useFonts } from 'expo-font';
import { ActivityIndicator } from 'react-native';


// Screens rol, login, Registro
import Rol from './App/Screens/Rol';

// PACIENTE

// Login y Registro Paciente
import LoginPaciente from './App/Screens/Paciente/LoginRegistro/LoginPaciente';
import RegistroPaciente from './App/Screens/Paciente/LoginRegistro/RegistroPaciente';
import OlvidoContraseñaPaciente from './App/Screens/Paciente/LoginRegistro/OlvidoContraseña';
// Screens dashboard paciente
import BienvenidaPaciente from './App/Screens/Paciente/Dashboard/BienvenidaPaciente';
import DashboardPaciente from './App/Screens/Paciente/Dashboard/DashboardPaciente';
import RecordatorioDosis from './App/Screens/Paciente/Dashboard/RecordatorioDosis/RecordatorioDosis';
import VideoTutoriales from './App/Screens/Paciente/Dashboard/VideoTutoriales';

// Registro Dosis Paciente
import BienvenidaRegistroDosis from './App/Screens/Paciente/Dashboard/RegistroDosis/BienvenidaRegistroDosis';
import Medicamento from './App/Screens/Paciente/Dashboard/RegistroDosis/Medicamento';
import CantidadPuff from './App/Screens/Paciente/Dashboard/RegistroDosis/CantidadPuff'
import FechaDosisDiaria from './App/Screens/Paciente/Dashboard/RegistroDosis/FechaDosisDiaria';
import ElegirCuidador from './App/Screens/Paciente/Dashboard/RegistroDosis/ElegirCuidador';
import RegistrarDosis from './App/Screens/Paciente/Dashboard/RegistroDosis/RegistrarDosis'
import GraciasPorRegistrar from './App/Screens/Paciente/Dashboard/RegistroDosis/GraciasPorRegistrar'

// Recordatorios dosis pacientes
import InforRecordatorioDosisPaciente from './App/Screens/Paciente/Dashboard/RecordatorioDosis/InfoRecordatorioDosisPaciente'

// CUIDADOR

// Login Cuidador
import LoginCuidador from './App/Screens/Cuidador/Login/LoginCuidador';
import OlvidoContraseñaCuidador from './App/Screens/Cuidador/Login/OlvidoContraseña'

// Dashboard Cuidador
import DashboardCuidador from './App/Screens/Cuidador/DashBoard/DashboardCuidador'
import RecordatorioDosisCompartidos from './App/Screens/Cuidador/DashBoard/RecordatoriosDosisCompartidos'
import BienvenidaCuidador from './App/Screens/Cuidador/DashBoard/BienvenidaCuidador'




const Stack = createNativeStackNavigator();
const StackPaciente = createNativeStackNavigator();
const StackCuidador = createNativeStackNavigator();

function DiseñoInternoPaciente() {

  return (
    <StackPaciente.Navigator initialRouteName='BienvenidaPaciente'>
      {/* PACIENTE */}

      {/* Login y Registro Paciente */}
      <StackPaciente.Screen name='LoginPaciente' component={LoginPaciente} options={{ headerShown: false }} />
      <StackPaciente.Screen name='RegistroPaciente' component={RegistroPaciente} options={{ headerShown: false }} />
      <StackPaciente.Screen name='OlvidoContraseñaPaciente' component={OlvidoContraseñaPaciente} options={{ headerShown: false }} />

      {/* Dashoard Paciente */}
      <StackPaciente.Screen name='BienvenidaPaciente' component={BienvenidaPaciente} options={{ headerShown: false }} />
      <StackPaciente.Screen name='DashboardPaciente' component={DashboardPaciente} options={{ headerShown: false }} />
      <StackPaciente.Screen name='RecordatorioDosis' component={RecordatorioDosis} options={{ headerShown: false }} />
      <StackPaciente.Screen name='VideoTutoriales' component={VideoTutoriales} options={{ headerShown: true }} />

      {/* Registro dosis paciente */}
      <StackPaciente.Screen name='BienvenidaRegistroDosis' component={BienvenidaRegistroDosis} options={{ headerShown: false }} />
      <StackPaciente.Screen name='Medicamento' component={Medicamento} options={{ headerShown: false }} />
      <StackPaciente.Screen name='CantidadPuff' component={CantidadPuff} options={{ headerShown: false }} />
      <StackPaciente.Screen name='FechaDosisDiaria' component={FechaDosisDiaria} options={{ headerShown: false }} />
      <StackPaciente.Screen name='ElegirCuidador' component={ElegirCuidador} options={{ headerShown: false }} />
      <StackPaciente.Screen name='RegistrarDosis' component={RegistrarDosis} options={{ headerShown: false }} />
      <StackPaciente.Screen name='GraciasPorRegistrar' component={GraciasPorRegistrar} options={{ headerShown: false }} />

      {/* info de Recordatorios de las dosis del paciente */}
      <StackPaciente.Screen name='InfoRecordatorioDosisPaciente' component={InforRecordatorioDosisPaciente} options={{ headerShown: false }} />

    </StackPaciente.Navigator>
  );
}

function DiseñoInternoCuidador() {
  return (
    <StackCuidador.Navigator initialRouteName='BienvenidaCuidador'>
      {/* CUIDADOR */}

      {/* Login Cuidador */}
      <StackCuidador.Screen name='LoginCuidador' component={LoginCuidador} options={{ headerShown: false }} />
      <StackCuidador.Screen name='OlvidoContraseñaCuidador' component={OlvidoContraseñaCuidador} options={{ headerShown: false }} />

      {/* Dashboard Cuidador */}
      <StackCuidador.Screen name='DashboardCuidador' component={DashboardCuidador} options={{ headerShown: false }} />
      <StackCuidador.Screen name='RecordatorioDosisCompartidos' component={RecordatorioDosisCompartidos} options={{ headerShown: false }} />
      <StackCuidador.Screen name='BienvenidaCuidador' component={BienvenidaCuidador} options={{ headerShown: false }} />
    </StackCuidador.Navigator>
  );
}

function LoadingScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 15, marginVertical: '2%' }}>INICIANDO INHALIFE...</Text>
      <ActivityIndicator size="large" color="#00AAE4" />
    </View>
  );
}

export default function App() {
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  const [loaded] = useFonts({
    'noticia-text': require('../INHALIFE/assets/fonts/NoticiaText-BoldItalic.ttf'),
    'Play-fair-Display': require('../INHALIFE/assets/fonts/PlayfairDisplaySC-Bold.ttf'),
    'Vogue': require('../INHALIFE/assets/fonts/Vogue.ttf')
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, async (user) => {
      console.log('user', user);
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
      <StatusBar style="auto" backgroundColor="#00AAE4" />
      <Stack.Navigator>

        {userRole === 'paciente' ? (
          <Stack.Screen name='Paciente' component={DiseñoInternoPaciente} options={{ headerShown: false }} />
        ) : userRole === 'cuidador' ? (
          <Stack.Screen name='Cuidador' component={DiseñoInternoCuidador} options={{ headerShown: false }} />
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


      </Stack.Navigator>
    </NavigationContainer>
  );
}
