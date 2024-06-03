import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const VideoTutoriales = () => {
  return (
    <View style={styles.container}>
      <Text>VideoTutoriales</Text>
    </View>
  )
}

export default VideoTutoriales

const styles = StyleSheet.create({
  container: {
    heigth: hp('100%')
  },
  header: {
    height: hp('10%')
  },
  body: {
    height: hp('90%')
  }

})