
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
//screens rol, login, Registro
import Rol from './App/Screens/Rol';

//PACIENT

//Login y Registro Paciente
import LoginPaciente from './App/Screens/Paciente/LoginRegistro/LoginPaciente';
import RegistroPaciente from './App/Screens/Paciente/LoginRegistro/RegistroPaciente';
import OlvidoContraseñaPaciente from './App/Screens/Paciente/LoginRegistro/OlvidoContraseña';
//screens dashboard paciente
import BienvenidaPaciente from './App/Screens/Paciente/Dashboard/BienvenidaPaciente';
import DashboardPaciente from './App/Screens/Paciente/Dashboard/DashboardPaciente';
import RecordatorioDosis from './App/Screens/Paciente/Dashboard/RecordatorioDosis';
import VideoTutoriales from './App/Screens/Paciente/Dashboard/VideoTutoriales';

{/* Registro Dosis Paciente */}
import BienvenidaRegistroDosis from './App/Screens/Paciente/Dashboard/RegistroDosis/BienvenidaRegistroDosis';
import Medicamento from './App/Screens/Paciente/Dashboard/RegistroDosis/Medicamento';


//CUIDADOR

//Login Cuidador
import LoginCuidador from './App/Screens/Cuidador/Login/LoginCuidador';
import OlvidoContraseñaCuidador from './App/Screens/Cuidador/Login/OlvidoContraseña'

//Dashboard Cuidador
import DashboardCuidador from './App/Screens/Cuidador/DashBoard/DashboardCuidador'
import RecordatorioDosisCompartidos from './App/Screens/Cuidador/DashBoard/RecordatoriosDosisCompartidos'
import BienvenidaCuidador from './App/Screens/Cuidador/DashBoard/BienvenidaCuidador'

const Stack = createNativeStackNavigator();

export default function App() {


  return (
      <NavigationContainer>
        <StatusBar style="auto" backgroundColor="#00AAE4" />
        <Stack.Navigator initialRouteName='Rol'>
          <Stack.Screen  name='Rol' component={Rol} options={{headerShown: false}}/>
          {/* PACIENTE */}

          {/* Login y Registro Paciente */}  
          <Stack.Screen  name='LoginPaciente' component={LoginPaciente} options={{headerShown: false}}/>
          <Stack.Screen  name='RegistroPaciente' component={RegistroPaciente} options={{headerShown: false}}/>
          <Stack.Screen  name='OlvidoContraseñaPaciente' component={OlvidoContraseñaPaciente} options={{headerShown: false}}/>
          {/* Dashoard Paciente */}
          <Stack.Screen name='BienvenidaPaciente' component={BienvenidaPaciente} options={{headerShown: false}}/>
          <Stack.Screen  name='DashboardPaciente' component={DashboardPaciente} options={{headerShown: false}}/>
          <Stack.Screen  name='RecordatorioDosis' component={RecordatorioDosis} options={{headerShown: true}}/>
          <Stack.Screen  name='VideoTutoriales' component={VideoTutoriales} options={{headerShown: true}}/>

          {/* Registro dosis paciente */}
          <Stack.Screen  name='BienvenidaRegistroDosis' component={BienvenidaRegistroDosis} options={{headerShown: false}}/>
          <Stack.Screen name='Medicamento' component={Medicamento} options={{headerShown: false}}/>
          

          {/* CUIDADOR */}

          {/* Login Cuidador */}
          <Stack.Screen name='LoginCuidador' component={LoginCuidador} options={{headerShown: false}}/>
          <Stack.Screen name='OlvidoContraseñaCuidador' component={OlvidoContraseñaCuidador} options={{headerShown: false}}/>

          {/* Dashboard Cuidador */}
          <Stack.Screen  name='DashboardCuidador' component={DashboardCuidador} options={{headerShown: false}}   />
          <Stack.Screen name='RecordatorioDosisCompartidos' component={RecordatorioDosisCompartidos} options={{headerShown: false}} />
          <Stack.Screen name='BienvenidaCuidador' component={BienvenidaCuidador}  options={{headerShown: false}} />
        </Stack.Navigator>
      </NavigationContainer>

  );
}


