import React, { useRef } from 'react';
import { Animated, Easing } from 'react-native';

const SaveAnimation = ({ children }) => {
    const scaleValue = useRef(new Animated.Value(1)).current;

    const onPressIn = () => {
        Animated.spring(scaleValue, {
            toValue: 0.9, // Escala hacia abajo al 90%
            friction: 3, // Para un efecto de rebote
            useNativeDriver: true,
        }).start();
    };

    const onPressOut = () => {
        Animated.spring(scaleValue, {
            toValue: 1, // Vuelve a su tamaño original
            friction: 3, // Para un efecto de rebote
            useNativeDriver: true,
        }).start();
    };

    return (
        <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
            {React.cloneElement(children, { onPressIn, onPressOut })}
        </Animated.View>
    );
};

export default SaveAnimation;
