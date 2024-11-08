
import React from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useEffect, useRef, useState, } from 'react';
import { PixelRatio, StyleSheet, View, Button, Pressable, Image, Text } from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import Inhalife_tutoria from '../../../../assets/video/inhalife_tutoria.mp4'

import { useTranslation } from 'react-i18next';

const VideoTutoriales = ({ navigation }) => {
  const video = useRef(null);
  const [status, setStatus] = useState({})
  const { t } = useTranslation();

  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <Pressable style={styles.contenedorAtras} onPress={() => { navigation.navigate('DashboardPaciente'); }}>
          <Image style={styles.iconAtras} source={require('../../../../assets/Image/Flechaatras.png')} />
        </Pressable>
      </View>

      <View style={styles.body}>
        <View style={styles.videoContainer}>
          <Text style={styles.videoTitle}>{t('VideoTutorial')}</Text>

          <Video
            ref={video}
            style={styles.video}
            source={Inhalife_tutoria}
            useNativeControls
            resizeMode={ResizeMode.CONTAIN}
            isLooping
            onPlaybackStatusUpdate={status => setStatus(() => status)}
          />

        </View>
      </View>

    </View>
  )
}

export default VideoTutoriales

const styles = StyleSheet.create({
  container: {
    height: hp('100%')
  },
  header: {
    height: hp('10%'),
    backgroundColor: '#3498DB',
    justifyContent: 'center'
  },
  contenedorAtras: {
    left: wp('5%'),
    height: hp('5%'),
    width: wp('15%'),
    justifyContent: 'center',
  },
  iconAtras: {
    width: wp('10%'),
    height: hp('2.5%'),
  },
  body: {
    height: hp('90%')
  },
  videoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: hp('5%'),
  },
  videoTitle: {
    marginHorizontal: wp('1%'),
    fontFamily: 'Play-fair-Display',
    fontSize: wp('5%'),
    textAlign: 'center'
  },
  video: {
    marginVertical: hp('5%'),
    alignSelf: 'center',
    height: hp('60%'),
    width: wp('70%')
  }
})
