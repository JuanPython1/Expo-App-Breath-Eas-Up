import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import LoginAdmin from '../Screens/Admin/LoginAdmin';
import DashboardAdmin from '../Screens/Admin/DashboardAdmin';
import RegistroCuidadores from '../Screens/Admin/RegistroCuidadores';
import BienvenidaAdmin from '../Screens/Admin/BienvenidaAdmin';
import OlvidoContraseñaAdmin from '../Screens/Admin/OlvidoContraseñaAdmin'

const StackAdmin = createNativeStackNavigator();

const AdminNavigator = () => {
    return (

        <StackAdmin.Navigator initialRouteName='BienvenidaAdmin'>
            <StackAdmin.Screen name={'BienvenidaAdmin'} component={BienvenidaAdmin} options={{ headerShown: false }} />
            <StackAdmin.Screen name='LoginAdmin' component={LoginAdmin} options={{ headerShown: false }} />
            <StackAdmin.Screen name='OlvidoContraseñaAdmin' component={OlvidoContraseñaAdmin} options={{ headerShown: false }} />
            <StackAdmin.Screen name='DashboardAdmin' component={DashboardAdmin} options={{ headerShown: false }} />
            <StackAdmin.Screen name='RegistroCuidadores' component={RegistroCuidadores} options={{ headerShown: false }} />

        </StackAdmin.Navigator>
    )
}


export default AdminNavigator