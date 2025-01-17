import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {screenHeight, screenWidth} from '../../utils/Scaling';

const FullScreenPlayer = () => {
  return (
    <View style={styles.container}>
      <Text>FullScreenPlayer</Text>
    </View>
  );
};

export default FullScreenPlayer;

const styles = StyleSheet.create({
  container: {
    width: screenWidth,
    height: screenHeight,
  },
});
