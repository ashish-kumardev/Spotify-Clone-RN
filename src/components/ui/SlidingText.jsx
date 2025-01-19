import {Dimensions, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import CustomText from './CustomText';

const SlidingText = ({text, fontSize, fontFamily}) => {
  const [textWidth, setTextWidth] = useState(0);
  const containerWidth = Dimensions.get('window').width - 130;
  const translateX = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateX: translateX.value}],
    };
  });

  const handleTextLayout = e => {
    const width = e.nativeEvent.layout.width;
    setTextWidth(width);
  };

  useEffect(() => {
    if (textWidth > containerWidth) {
      const repeatValue = withRepeat(
        withTiming(-textWidth + 160, {
          duration: 6000,
          easing: Easing.linear,
        }),
        -1,
        true,
      );
      translateX.value = repeatValue;
    } else {
      translateX.value = 0;
    }
  }, [textWidth, containerWidth, text]);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.textContainer, animatedStyle]}>
        <CustomText
          fontFamily={fontFamily}
          fontSize={fontSize}
          onLayout={handleTextLayout}>
          {text}
        </CustomText>
      </Animated.View>
    </View>
  );
};

export default SlidingText;

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
  textContainer: {
    flexDirection: 'row',
    width: 1000,
  },
});
