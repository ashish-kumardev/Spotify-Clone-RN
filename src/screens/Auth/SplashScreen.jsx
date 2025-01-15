import { Image, StyleSheet, View } from 'react-native'
import React, { useEffect } from 'react'
import { Colors } from '../../utils/Constants'
import { screenHeight, screenWidth } from '../../utils/Scaling'
import { resetAndNavigate } from '../../utils/NavigationUtils'

const SplashScreen = () => {
  useEffect(() => {
    setTimeout(() => {
      resetAndNavigate("BottomTab")
    }, 3000)
  }, [])
  return (
    <View style={styles.container}>
      <Image source={require('../../assets/images/logo.png')} style={styles.logo}/>
    </View>
  )
}

export default SplashScreen

const styles = StyleSheet.create({
  container : {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background
  },
  logo:{
    width: screenWidth * 0.4,
    height: screenHeight * 0.4,
    resizeMode: 'contain'
  }
})