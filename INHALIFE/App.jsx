
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
//screens rol, login, Registro
import Rol from './App/Screens/Rol';

//PACIENTE
import LoginPaciente from './App/Screens/Paciente/LoginRegistro/LoginPaciente';
import RegistroPaciente from './App/Screens/Paciente/LoginRegistro/RegistroPaciente';
import OlvidoContraseñaPaciente from './App/Screens/Paciente/LoginRegistro/OlvidoContraseña';
//screens dashboard paciente
import DashboardPaciente from './App/Screens/Paciente/Dashboard/DashboardPaciente';
import RegistroDosis from './App/Screens/Paciente/Dashboard/RegistroDosis';

//CUIDADOR
import LoginCuidador from './App/Screens/Cuidador/Login/LoginCuidador';
import OlvidoContraseñaCuidador from './App/Screens/Cuidador/Login/OlvidoContraseña'

const Stack = createNativeStackNavigator();

export default function App() {


  return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Rol'>
          <Stack.Screen  name='Rol' component={Rol} options={{headerShown: false}}/>
          {/* PACIENTE */}
          {/* Login y Registro */}  
          <Stack.Screen  name='LoginPaciente' component={LoginPaciente} options={{headerShown: false}}/>
          <Stack.Screen  name='RegistroPaciente' component={RegistroPaciente} options={{headerShown: true}}/>
          <Stack.Screen  name='OlvidoContraseñaPaciente' component={OlvidoContraseñaPaciente} options={{headerShown: true}}/>
          {/* Dashoard */}
          <Stack.Screen  name='DashboardPaciente' component={DashboardPaciente} options={{headerShown: true}}/>
          <Stack.Screen  name='RegistroDosis' component={RegistroDosis} options={{headerShown: true}}/>
          {/* CUIDADOR */}
          <Stack.Screen name='LoginCuidador' component={LoginCuidador} options={{headerShown: true}}/>
        </Stack.Navigator>
      </NavigationContainer>

  );
}


