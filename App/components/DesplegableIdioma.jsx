import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Animated,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
  View,
  Image
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const LANGUAGES = [
  { code: 'es-CO', label: 'es', flag: '🇪🇸' },
  { code: 'en-US', label: 'en', flag: '🇺🇸' },
];

const DesplegableIdioma = ({ idiomaDefault, onLanguageChange }) => {
  const { t, i18n } = useTranslation();

  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(() => {
    return idiomaDefault || i18n.language || 'es';
  });

  // Animaciones
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const dropdownAnim = useRef(new Animated.Value(0)).current;

  // Sincronizar el estado con cambios de idioma externos
  useEffect(() => {
    if (i18n.language !== selected) {
      setSelected(i18n.language);
    }
  }, [i18n.language, selected]);

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.9,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  // Animación del dropdown
const toggleDropdown = () => {
  if (!open) {
    setOpen(true);
    Animated.spring(dropdownAnim, {
      toValue: 1,
      useNativeDriver: true,
      friction: 8,      // controla la “resistencia”
      tension: 60,      // controla la rapidez
    }).start();
  } else {
    Animated.spring(dropdownAnim, {
      toValue: 0,
      useNativeDriver: true,
      friction: 10,
      tension: 50,
    }).start(() => setOpen(false));
  }
};



  // Efecto "pulse" continuo que invita a presionar el botón
  useEffect(() => {
    const pulseAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.2,
          duration: 2100,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 2100,
          useNativeDriver: true,
        }),
      ])
    );
    pulseAnimation.start();

    return () => pulseAnimation.stop();
  }, [pulseAnim]);

  const handleSelect = (lang) => {
    console.log('Cambiando idioma de', selected, 'a', lang.code);
    
    setSelected(lang.code);
    
    // Cambiar idioma en i18next
    i18n.changeLanguage(lang.code).then(() => {
      console.log('Idioma cambiado exitosamente a:', i18n.language);
      onLanguageChange?.(lang.code);
    }).catch((error) => {
      console.error('Error al cambiar idioma:', error);
    });
    
    // Cerrar con animación
    Animated.timing(dropdownAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start(() => setOpen(false));
  };

  const selectedLanguage = LANGUAGES.find((l) => l.code === selected) || LANGUAGES[0];

  return (
<View style={styles.container}>
  <Animated.View 
    style={{ 
      transform: [{ scale: Animated.multiply(scaleAnim, pulseAnim) }],
      zIndex: 999, 
      elevation: 20, 
    }}
  >
    <TouchableWithoutFeedback
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={toggleDropdown}
    >
      <View style={styles.buttonContent}>
        <Text style={styles.buttonFlag}>{selectedLanguage.flag}</Text>
      </View>
    </TouchableWithoutFeedback>
  </Animated.View>

  {/* Contenedor “recortador” */}
  <View style={styles.dropdownWrapper}>
    {open && (
<Animated.View
  style={[
    styles.dropdown,
    {
      transform: [
        {
          translateY: dropdownAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [-170, 0],
          }),
        },
      ],
    },
  ]}
>

        {LANGUAGES.map((item, index) => (
          <TouchableOpacity
            key={item.code}
            style={[
              styles.option,
              selected === item.code && styles.selectedOption,
              index === 0 && styles.firstOption,
            ]}
            onPress={() => handleSelect(item)}
            activeOpacity={0.7}
          >
            <View style={styles.optionContent}>
              <Text style={styles.optionFlag}>{item.flag}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </Animated.View>
    )}
  </View>
</View>

  );
};

export default DesplegableIdioma;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    position: 'relative',
  },
  TextIdioma: {
    fontFamily: 'Play-fair-Display',
    textAlign: 'center',
    fontSize: 14,
    color: '#333',
  },
  buttonContent: {
    width: 70,
    height: 70,
    zIndex: 100,
    borderRadius: 35, 
    backgroundColor: '#00AAE4',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
    buttonFlag: {
    fontSize: 30, // ajusta al tamaño que quieras
    textAlign: 'center',
    },
  dropdownWrapper: {
  position: 'absolute',
  top: 32,
  width: 67,
  height: 440, // altura máxima del dropdown visible
  overflow: 'hidden', // todo lo que suba se “recorta”
},

  dropdown: {
    position: 'absolute',
    top: 0, 
    backgroundColor: 'white',
    borderRadius: 12,
    borderColor: '#94E4FF',
    borderWidth: 1,
    width: 67,
    zIndex: 1,
    elevation: 10,
    shadowColor: '#000',
    borderTopStartRadius: 1000,
    borderTopEndRadius: 1000,
    borderBottomStartRadius: 1000,
    borderBottomEndRadius: 1000,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  option: {
    borderTopStartRadius: 1000,
    borderTopEndRadius: 1000,
        borderBottomStartRadius: 1000,
    borderBottomEndRadius: 1000,
    minHeight: 70, 
    borderBottomWidth: 0.5,
    borderBottomColor: '#E0E0E0',
  },
  firstOption: {
    paddingTop: '50%',
    minHeight: 90,
  },
  selectedOption: {
    backgroundColor: '#F0F8FF',
  },
  optionContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  optionFlag: {
    fontSize: 30,
    textAlign: 'center',
  },
  optionText: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
    marginTop: 4,
  },
  selectedOptionText: {
    color: '#007AFF',
    fontWeight: '500',
  },
});