import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CustomText from './CustomText';
import {Fonts} from '../../utils/Constants';
import {fontR} from '../../utils/Scaling';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const CustomHeader = ({title}) => {
  const safeAreaInsets = useSafeAreaInsets();
  return (
    <View style={{gap: 10, marginTop: safeAreaInsets.top}}>
      <Image
        source={require('../../assets/images/logo_text.png')}
        style={styles.img}
      />
      <CustomText
        fontFamily={Fonts.Medium}
        fontSize={fontR(12)}
        style={styles.title}>
        {title}
      </CustomText>
    </View>
  );
};

export default CustomHeader;

const styles = StyleSheet.create({
  img: {
    width: 140,
    height: 50,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  title: {
    marginTop: 2,
  },
});
