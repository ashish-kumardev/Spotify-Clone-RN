import {StyleSheet, Text} from 'react-native';
import React from 'react';
import CustomSafeAreaView from '../../components/ui/CustomSafeAreaView';
import withPlayer from '../../components/player/Player';

const HomeScreen = () => {
  return (
    <CustomSafeAreaView>
      <Text style={{color: '#fff'}}>HomeScreen</Text>
    </CustomSafeAreaView>
  );
};

export default withPlayer(HomeScreen);

const styles = StyleSheet.create({});
