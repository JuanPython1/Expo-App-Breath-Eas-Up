import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { FIRESTORE_DB } from '../firebase/config';
import { doc, updateDoc, getDoc } from 'firebase/firestore';

import { useTranslation } from 'react-i18next';

const TablaRecordatorio = ({ recordatorio }) => {
    const [filas, setFilas] = useState([]);
    const [totalDosis, setTotalDosis] = useState(recordatorio.DosisInicial);

    const { t } = useTranslation();

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
            <View style={styles.header}>
                <Text style={styles.headerTitulo}>{t("TablaRecordatoriosCompartidos.Titulo")}</Text>
            </View>
            <View style={styles.headerContainer}>
                <Text style={[styles.headerText, styles.bordeDerecho]}>{t("TablaRecordatoriosCompartidos.Dia")}</Text>
                <Text style={[styles.headerText, styles.bordeDerecho]}>{t("TablaRecordatoriosCompartidos.Dosis")}</Text>
                <Text style={styles.headerText}>{t("TablaRecordatoriosCompartidos.Fecha")}</Text>
            </View>
            {filas.map((fila, index) => (
                <View key={index} style={styles.filaContainer}>
                    <Text style={[styles.textoFila, styles.bordeDerecho]}>{fila.dia}</Text>
                    <Text style={[styles.textoFila, styles.bordeDerecho]}>{fila.dosis} PUFF</Text>
                    <Text style={styles.textoFila}>{fila.fecha}</Text>
                </View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    tabla: {
        borderWidth: 1,
        borderColor: 'black',
        margin: 10,
        marginTop: hp('5%'),
        marginBottom: hp('2.5%')
    },
    header: {
        backgroundColor: 'lightgrey',

    },
    headerContainer: {
        flexDirection: 'row',
        backgroundColor: 'lightgrey',

        borderColor: 'black',
    },
    headerTitulo: {
        flex: 1,
        textAlign: 'center',
        fontFamily: 'noticia-text',
        padding: 10,
        fontSize: 14
    },
    headerText: {
        flex: 1,
        textAlign: 'center',
        fontFamily: 'noticia-text',
        padding: 10,
    },
    filaContainer: {
        flexDirection: 'row',
        borderTopWidth: 1,
        borderColor: 'black',
    },
    textoFila: {
        flex: 1,
        textAlign: 'center',
        padding: 10,
        fontFamily: 'noticia-text',
    },
    bordeDerecho: {
        borderRightWidth: 1,
        borderRightColor: 'black',
    }
});

export default TablaRecordatorio;
