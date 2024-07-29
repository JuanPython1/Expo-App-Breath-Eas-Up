import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Rol from '../Screens/Rol';

// Login y Registro Paciente
import LoginPaciente from '../Screens/Paciente/LoginRegistro/LoginPaciente';
import RegistroPaciente from '../Screens/Paciente/LoginRegistro/RegistroPaciente';
import OlvidoContraseñaPaciente from '../Screens/Paciente/LoginRegistro/OlvidoContraseña';



// CUIDADOR

// Login Cuidador
import LoginCuidador from '../Screens/Cuidador/Login/LoginCuidador';
import OlvidoContraseñaCuidador from '../Screens/Cuidador/Login/OlvidoContraseña'

//ADMINS
import LoginAdmin from '../Screens/Admin/LoginAdmin';
import OlvidoContraseñaAdmin from '../Screens/Admin/OlvidoContraseñaAdmin'




const StackGeneral = createNativeStackNavigator()

const GeneralNavigator = () => {
    return (
        <StackGeneral.Navigator initialRouteName='Rol'>

            <StackGeneral.Screen name='Rol' component={Rol} options={{ headerShown: false }} />
            {/* Login y Registro Paciente */}
            <StackGeneral.Screen name='LoginPaciente' component={LoginPaciente} options={{ headerShown: false }} />
            <StackGeneral.Screen name='RegistroPaciente' component={RegistroPaciente} options={{ headerShown: false }} />
            <StackGeneral.Screen name='OlvidoContraseñaPaciente' component={OlvidoContraseñaPaciente} options={{ headerShown: false }} />



            {/* CUIDADOR */}

            <StackGeneral.Screen name='LoginCuidador' component={LoginCuidador} options={{ headerShown: false }} />
            <StackGeneral.Screen name='OlvidoContraseñaCuidador' component={OlvidoContraseñaCuidador} options={{ headerShown: false }} />


            {/* ADMIN */}
            <StackGeneral.Screen name='LoginAdmin' component={LoginAdmin} options={{ headerShown: false }} />
            <StackGeneral.Screen name='OlvidoContraseñaAdmin' component={OlvidoContraseñaAdmin} options={{ headerShown: false }} />

        </StackGeneral.Navigator>

    )
}

export default GeneralNavigator