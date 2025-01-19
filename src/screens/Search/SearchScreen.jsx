import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CustomSafeAreaView from '../../components/ui/CustomSafeAreaView';
import CustomHeader from '../../components/ui/CustomHeader';
import {fontR, screenHeight} from '../../utils/Scaling';
import Icon from '../../components/ui/Icon';
import CustomText from '../../components/ui/CustomText';
import {Fonts} from '../../utils/Constants';

const SearchScreen = () => {
  return (
    <CustomSafeAreaView>
      <CustomHeader title="" />
      <View style={styles.container}>
        <Icon iconFamily="Ionicons" name="musical-notes" size={fontR(40)} />
        <CustomText fontSize={fontR(16)} fontFamily={Fonts.Bold}>
          Search Soon!
        </CustomText>
      </View>
    </CustomSafeAreaView>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    height: screenHeight * 0.8,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
