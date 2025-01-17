import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useSharedState} from '../../hooks/useSharedState';

const AirPlayer = () => {
  const {expandPlayer} = useSharedState();
  return <View style={styles.container}></View>;
};

export default AirPlayer;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    backgroundColor: 'red',
  },
});
