import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Button } from 'react-native';
import * as Notificaciones from 'expo-notifications';

const NotificacionesActivas = () => {
    const [notificaciones, setNotificaciones] = useState([]);

    const obtenerNotificacionesActivas = async () => {
        const notificacionesActivas = await Notificaciones.getAllScheduledNotificationsAsync();
        setNotificaciones(notificacionesActivas);
    };

    const borrarTodasLasNotificaciones = async () => {
        await Notificaciones.cancelAllScheduledNotificationsAsync();
        setNotificaciones([]);  // Limpiar el estado después de cancelar las notificaciones
    };

    useEffect(() => {
        obtenerNotificacionesActivas();
    }, []);

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {notificaciones.map((notificacion, index) => (
                <View key={index} style={styles.notification}>
                    {/* Título de la notificación */}
                    <Text style={styles.text}>Título: {notificacion.content.title}</Text>
                    {/* Cuerpo de la notificación */}
                    <Text style={styles.text}>Cuerpo: {notificacion.content.body}</Text>
                    {/* Hora de la notificación */}
                    <Text style={styles.text}>Hora: {notificacion.trigger.hour}:{notificacion.trigger.minute}</Text>
                    {/* Identificador de la notificación */}
                    <Text style={styles.text}>ID: {notificacion.identifier}</Text>
                    {/* Fecha de programación de la notificación */}
                    <Text style={styles.text}>Fecha de programación: {notificacion.trigger.date}</Text>
                    {/* ID del canal de notificación */}
                    <Text style={styles.text}>ID del Canal: {notificacion.channelId}</Text>
                    {/* Sonido de la notificación */}
                    <Text style={styles.text}>Sonido: {notificacion.sound}</Text>
                    {/* Categoría de la notificación */}
                    <Text style={styles.text}>Categoría: {notificacion.categoryId}</Text>
                    {/* Otros datos si los hay */}
                    {/* ... */}
                </View>
            ))}
            <Button title="Borrar Todas las Notificaciones" onPress={borrarTodasLasNotificaciones} />
        </ScrollView>
    );
};

export default NotificacionesActivas;

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    notification: {
        marginBottom: 20,
        padding: 15,
        backgroundColor: '#f9f9f9',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    text: {
        fontSize: 16,
    },
});
