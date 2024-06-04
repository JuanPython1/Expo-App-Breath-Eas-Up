import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const StackPaciente = createNativeStackNavigator();


// Login y Registro Paciente
import LoginPaciente from '../Screens/LoadingScreen';
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



const PacienteNavigator = () => {

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
            <StackPaciente.Screen name='VideoTutoriales' component={VideoTutoriales} options={{ headerShown: false }} />
            <StackPaciente.Screen name='notificacionesPacientes' component={NotificacionesPacientes} options={{ headerShown: false }} />

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
    )
}

export default PacienteNavigator