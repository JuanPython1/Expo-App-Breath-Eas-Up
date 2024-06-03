import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { FIRESTORE_DB } from '../firebase/config';
import { doc, updateDoc, getDoc } from 'firebase/firestore';

const TablaRecordatorio = ({ recordatorio }) => {
    const [filas, setFilas] = useState([]);
    const [totalDosis, setTotalDosis] = useState(recordatorio.DosisInicial);

    useEffect(() => {
        const cargarDatosIniciales = async () => {
            const RecordatorioRef = doc(FIRESTORE_DB, 'RecordatoriosDosis', recordatorio.id);
            const docSnap = await getDoc(RecordatorioRef);
            if (docSnap.exists()) {
                const data = docSnap.data();
                if (data.registroDosis) {
                    setFilas(data.registroDosis);
                } else {
                    setFilas([{ dia: 1, dosis: recordatorio.DosisInicial }]);
                    await updateDoc(RecordatorioRef, {
                        registroDosis: [{ dia: 1, dosis: recordatorio.DosisInicial }]
                    });
                }
                setTotalDosis(data.DosisInicial);
            } else {
                console.log('No such document!');
            }
        };

        cargarDatosIniciales();
    }, [recordatorio.id]);

    return (
        <View style={styles.tabla}>
            <View style={styles.fila}>
                <View style={styles.celdaTitulo}>
                    <Text style={styles.textoTitulo}>REGISTRO DIAS</Text>
                </View>
            </View>
            <View style={styles.fila}>
                <View style={styles.celda}>
                    <Text style={styles.textoCeldaDias}>DIAS</Text>
                </View>
                <View style={styles.celda}>
                    <Text style={styles.textoCeldaCantidad}>CANTIDAD DOSIS</Text>
                </View>
            </View>

            {filas.map((fila, index) => (
                <View key={index} style={styles.fila}>
                    <View style={styles.celda}>
                        <Text style={styles.textoCelda}>{fila.dia}</Text>
                    </View>
                    <View style={styles.celda}>
                        <Text style={styles.textoCelda}>{fila.dosis} PUFF</Text>
                    </View>
                </View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    tabla: {
        marginHorizontal: wp('5%'),
        borderWidth: 1,
        borderColor: '#000',
        flexDirection: 'column',
        marginTop: hp('2%'),
        backgroundColor: '#7CDBFC'
    },
    fila: {
        flexDirection: 'row',
    },
    celdaTitulo: {
        borderWidth: 1,
        backgroundColor: '#C8EFFC',
        borderColor: '#000',
        flex: 1,
        padding: 10,
    },
    celda: {
        borderWidth: 1,
        borderColor: '#000',
        flex: 1,
        padding: 10,
        justifyContent: 'center'
    },
    textoCeldaDias: {
        textAlign: 'center',
        fontSize: wp('4%'),
        fontFamily: 'noticia-text'
    },
    textoCeldaCantidad: {
        textAlign: 'center',
        fontSize: wp('4%'),
        fontFamily: 'noticia-text'
    },
    textoTitulo: {
        textAlign: 'center',
        fontSize: wp('5%'),
        fontFamily: 'noticia-text'
    },
    textoCelda: {
        textAlign: 'center',
    },
});

export default TablaRecordatorio;
