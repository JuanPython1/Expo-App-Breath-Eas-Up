import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
//screens rol, login, Registro
import Rol from './App/Screens/Rol';
import LoginPaciente from './App/Screens/Paciente/LoginRegistro/LoginPaciente';
import RegistroPaciente from './App/Screens/Paciente/LoginRegistro/RegistroPaciente';
import OlvidoContraseña from './App/Screens/Paciente/LoginRegistro/OlvidoContraseña';
//screens dashboard paciente
import DashboardPaciente from './App/Screens/Paciente/Dashboard/DashboardPaciente';
import RegistroDosis from './App/Screens/Paciente/Dashboard/RegistroDosis';


const Stack = createNativeStackNavigator();

export default function App() {


  return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Rol'>
          <Stack.Screen  name='Rol' component={Rol} options={{headerShown: true}}/>
          {/* Login y Registro */}
          <Stack.Screen  name='LoginPaciente' component={LoginPaciente} options={{headerShown: true}}/>
          <Stack.Screen  name='RegistroPaciente' component={RegistroPaciente} options={{headerShown: true}}/>
          <Stack.Screen  name='OlvidoContraseña' component={OlvidoContraseña} options={{headerShown: true}}/>
          {/* Dashoard */}
          <Stack.Screen  name='DashboardPaciente' component={DashboardPaciente} options={{headerShown: true}}/>
          <Stack.Screen  name='RegistroDosis' component={RegistroDosis} options={{headerShown: true}}/>
        </Stack.Navigator>
      </NavigationContainer>

  );
}


