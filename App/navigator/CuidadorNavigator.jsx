import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// CUIDADOR

// Login Cuidador
import LoginCuidador from '../Screens/Cuidador/Login/LoginCuidador';
import OlvidoContraseñaCuidador from '../Screens/Cuidador/Login/OlvidoContraseña'

// Dashboard Cuidador
import DashboardCuidador from '../Screens/Cuidador/DashBoard/DashboardCuidador'
import RecordatorioDosisCompartidos from '../Screens/Cuidador/DashBoard/RecordatoriosDosisCompartidos'
import BienvenidaCuidador from '../Screens/Cuidador/DashBoard/BienvenidaCuidador'
import PersonalizarCuidador from '../Screens/Cuidador/ConfigCuidador/Personalizar';

//InfoCompartido
import InfoRecordatorioDosisCompartida from '../Screens/Cuidador/DashBoard/InfoRecordatorioDosisCompartida';

const StackCuidador = createNativeStackNavigator();

const CuidadorNavigator = () => {

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
            <StackCuidador.Screen name='PersonalizarCuidador' component={PersonalizarCuidador} options={{ headerShown: false }} />

            {/* Dashboard Cuidador */}
            <StackCuidador.Screen name='InfoRecordatorioDosisCompartida' component={InfoRecordatorioDosisCompartida} options={{ headerShown: false }} />
        </StackCuidador.Navigator>
    );
}

export default CuidadorNavigator