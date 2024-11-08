import { View, Text, StyleSheet, Pressable, Animated } from 'react-native';
import React, { useRef } from 'react';

const BotonRol = ({ props }) => {
  const { Titulo, colorFondo, fuente, navegacion } = props;
  const scaleValue = useRef(new Animated.Value(1)).current;
  const opacityValue = useRef(new Animated.Value(1)).current;

  const styles = StyleSheet.create({
    contenedorBoton: {
      height: 50,
      width: '260%',
      alignSelf: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colorFondo,
    },
    Titulo: {
      fontSize: 20,
      fontFamily: fuente,
    },
  });

  const onPressIn = () => {
    Animated.parallel([
      Animated.timing(scaleValue, {
        toValue: 0.95,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(opacityValue, {
        toValue: 0.7,
        duration: 50,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const onPressOut = () => {
    Animated.parallel([
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(opacityValue, {
        toValue: 1,
        duration: 50,
        useNativeDriver: true,
      }),
    ]).start(navegacion);
  };

  return (
    <Pressable onPressIn={onPressIn} onPressOut={onPressOut}>
      <Animated.View style={[{ transform: [{ scale: scaleValue }], opacity: opacityValue }]}>
        <View style={styles.contenedorBoton}>
        <Text style={styles.Titulo}>{Titulo}</Text>
        </View>
      </Animated.View>
    </Pressable>
  );
};

export default BotonRol;
