import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CustomText from './CustomText';
import {Fonts} from '../../utils/Constants';
import {fontR} from '../../utils/Scaling';

const CustomHeader = ({title}) => {
  return (
    <View style={styles.flexRow}>
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
  flexRow: {
    gap: 10,
  },
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
