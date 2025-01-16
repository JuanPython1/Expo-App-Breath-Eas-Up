# Breath Eas Up 🌬️📱  

**Breath Eas Up** es una aplicación móvil para Android desarrollada con **Expo** y **JSX**  que conecta pacientes con cuidadores de terapia respiratoria. La app permite gestionar y registrar dosis de medicamentos de forma sencilla por medio de notificaciones, fomentando el seguimiento en tiempo real de la información suministrada por los pacientes. Está disponible en inglés y español, lo que permite a los usuarios elegir el idioma de su preferencia..  

## 🛠️ Características principales  

### Para pacientes:  
- **Recordatorios de dosis**: Configura alarmas con notificaciones personalizadas para tomar tus medicamentos a tiempo.  
- **Registro diario de dosis**: Lleva un control detallado de las dosis registradas en una tabla interactiva.  
- **Imágenes de bienvenida personalizadas**: Mejora tu experiencia con mensajes personalizados almacenados en Firebase Storage.  

### Para cuidadores:  
- **Vinculación con pacientes**: Visualiza en tiempo real los registros diarios de las dosis de los pacientes.  
- **Seguimiento efectivo**: Accede a información actualizada desde cualquier lugar para un mejor cuidado del paciente.  

## 🔧 Tecnologías utilizadas  

- **Frontend**: Expo, JSX  
- **Backend as a Service**: Firebase  
  - **Firebase Authentication**: Autenticación de usuarios (pacientes y cuidadores).  
  - **Firestore**: Base de datos en tiempo real para gestionar los registros y la vinculación entre pacientes y cuidadores.  
  - **Firebase Storage**: Almacenamiento de imágenes personalizadas para dar un toque único a la experiencia de usuario.  

## 🚀 Instalación y configuración  

1. Clona este repositorio:  
   ```bash
   git clone https://github.com/JuanPython1/Expo-App-Breath-Eas-Up.git
   cd Expo-App-Breath-Eas-Up

2. Instala las dependencias:
   ```bash
   npm install

3. Configura el .env de tu cuenta de Firebase de acuerdo al [.env.example](./.env.example):

5. Ejecutar App Local En Android Studio (Por temas de compatibilidad con la version de Expo "51.0.36" con la Aplicacion de Expo Go, la app solo se puede desarrollar de manera local)

    [enlace de la documetacion de expo local-app-development](https://docs.expo.dev/guides/local-app-development/)

## 📄 Licencia  

Este proyecto está licenciado bajo la Licencia MIT. Consulta el archivo [LICENSE](./LICENSE.md) para más detalles.  



   
