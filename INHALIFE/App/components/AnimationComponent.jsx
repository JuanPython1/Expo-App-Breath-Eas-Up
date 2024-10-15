import React, { useRef } from 'react';
import { Animated, Easing } from 'react-native';

const AnimationComponent = ({ children }) => {
    const scaleValue = useRef(new Animated.Value(1)).current;
    const rotateValue = useRef(new Animated.Value(0)).current;

    const onPressIn = () => {
        Animated.parallel([
            Animated.spring(scaleValue, {
                toValue: 0.95,
                useNativeDriver: true,
            }),
            Animated.timing(rotateValue, {
                toValue: 1,
                duration: 150,
                easing: Easing.linear,
                useNativeDriver: true,
            }),
        ]).start();
    };

    const onPressOut = () => {
        Animated.parallel([
            Animated.spring(scaleValue, {
                toValue: 1,
                useNativeDriver: true,
            }),
            Animated.timing(rotateValue, {
                toValue: 0,
                duration: 150,
                easing: Easing.linear,
                useNativeDriver: true,
            }),
        ]).start();
    };

    const rotate = rotateValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '10deg'],
    });

    return (
        <Animated.View style={{ transform: [{ scale: scaleValue }, { rotate }] }}>
            {React.cloneElement(children, { onPressIn, onPressOut })}
        </Animated.View>
    );
};

export default AnimationComponent;
