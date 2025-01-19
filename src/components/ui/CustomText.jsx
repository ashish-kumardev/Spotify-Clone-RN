import {Platform, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Colors} from '../../utils/Constants';
import {RFValue} from 'react-native-responsive-fontsize';

const CustomText = ({
  fontSize,
  fontFamily = 'Satoshi-Regular',
  children,
  onLayout,
  numberOfLines,
  style,
  ...props
}) => {
  let computedFontSize =
    Platform.OS === 'android'
      ? RFValue(fontSize || 12)
      : RFValue(fontSize || 10);
  return (
    <Text
      onLayout={onLayout}
      style={[
        styles.text,
        {color: Colors.text, fontSize: computedFontSize, fontFamily},
        style,
      ]}
      numberOfLines={numberOfLines}
      {...props}>
      {children}
    </Text>
  );
};

export default CustomText;

const styles = StyleSheet.create({
  text: {
    textAlign: 'left',
  },
});
