import {SafeAreaView, StatusBar, StyleSheet, View} from 'react-native';
import React from 'react';
import {Colors} from '../../utils/Constants';

const CustomSafeAreaView = ({children, style}) => {
  return (
    <View style={[styles.container, style]}>
      <StatusBar backgroundColor={Colors.background} />
      <SafeAreaView />
      {children}
    </View>
  );
};

export default CustomSafeAreaView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 2,
    paddingHorizontal: 5,
    backgroundColor: Colors.background,
  },
});
