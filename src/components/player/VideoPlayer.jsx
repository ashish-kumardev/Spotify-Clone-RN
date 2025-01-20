import {StyleSheet} from 'react-native';
import Video from 'react-native-video';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {screenHeight, screenWidth} from '../../utils/Scaling';

const VideoPlayer = ({videoUri}) => {
  return (
    <>
      <Video
        source={videoUri}
        style={styles.video}
        ignoreSilentSwitch="ignore"
        playInBackground={false}
        playWhenInactive={false}
        controls={false}
        disableFocus={true}
        muted
        repeat
        hideShutterView
        shutterColor="transparent"
        resizeMode="cover"
      />
      <LinearGradient
        colors={[
          'rgba(0, 0, 0, 0.1)',
          'rgba(0, 0, 0, 0.2)',
          'rgba(0, 0, 0, 0.3)',
          'rgba(0, 0, 0, 0.4)',
          'rgba(0, 0, 0, 0.5)',
          'rgba(0, 0, 0, 0.6)',
          'rgba(0, 0, 0, 0.7)',
          'rgba(0, 0, 0, 0.8)',
          'rgba(0, 0, 0, 0.9)',
          'rgba(0, 0, 0, 1)',
        ]}
        style={styles.gradient}
      />
    </>
  );
};

export default VideoPlayer;

const styles = StyleSheet.create({
  video: {
    width: screenWidth,
    height: screenHeight,
    zIndex: -2,
    position: 'absolute',
    aspectRatio: 9 / 16,
  },
  gradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
  },
});
