import { View, Text, StyleSheet, Pressable, Image } from 'react-native'
import React from 'react'

const InfoRecordatorioDosisPaciente = ({ navigation }) => {
    return (
        <View style={styles.Container}>
            <View style={styles.header}>
                <Pressable style={styles.contenedorAtras} onPress={() => { navigation.navigate('DashboardPaciente') }}>
                    <Image style={styles.iconAtras} source={require('../../../../../assets/Image/Flechaatras.png')} />
                </Pressable>
            </View>

            <View style={styles.body}>

            </View>

        </View>
    )
}

export default InfoRecordatorioDosisPaciente


const styles = StyleSheet.create({

})