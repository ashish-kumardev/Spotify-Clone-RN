import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {fontR, screenHeight, screenWidth} from '../../utils/Scaling';
import {useSharedState} from '../../hooks/useSharedState';
import {usePlayerStore} from '../../state/usePlayerStore';
import ImageColors from 'react-native-image-colors';
import {Colors, darkenColor, Fonts} from '../../utils/Constants';
import LinearGradient from 'react-native-linear-gradient';
import Icon from '../ui/Icon';
import CustomText from '../ui/CustomText';
import VideoPlayer from './VideoPlayer';
import ControlAndDetail from './ControlAndDetaile';

const FullScreenPlayer = () => {
  const {collapsePlayer} = useSharedState();
  const [colors, setColors] = useState(['#666', '#666']);
  const {currentPlayingTrack} = usePlayerStore();

  useEffect(() => {
    const url = currentPlayingTrack?.artwork_uri;
    ImageColors.getColors(url, {
      fallback: '#666',
      cache: true,
      key: url,
    })
      .then(c => {
        const color = Platform.OS === 'ios' ? c.secondary : c.vibrant;
        const enhancedColor = darkenColor(color, 80);
        setColors([enhancedColor, enhancedColor]);
      })
      .catch(() => setColors(['#666', '#666']));
  }, [currentPlayingTrack]);

  return (
    <View style={styles.container}>
      {currentPlayingTrack?.video_uri ? (
        <VideoPlayer videoUri={currentPlayingTrack?.video_uri} />
      ) : (
        <View style={styles.imageContainer}>
          <Image source={currentPlayingTrack?.artwork_uri} style={styles.img} />
        </View>
      )}
      <LinearGradient
        colors={[...colors, 'rgba(0, 0, 0, 0.9 )']}
        style={styles.gradient}
      />
      <View style={styles.flexRowBetween}>
        <TouchableOpacity onPress={collapsePlayer}>
          <Icon
            name="chevron-down-sharp"
            iconFamily="Ionicons"
            size={fontR(20)}
          />
        </TouchableOpacity>
        <CustomText fontFamily={Fonts.Black} fontSize={10}>
          {currentPlayingTrack?.artist?.name || 'Unknown'}
        </CustomText>
        <Icon name="share-social" iconFamily="Ionicons" size={fontR(20)} />
      </View>

      <View style={styles.albumContainer} />

      <ControlAndDetail />
    </View>
  );
};

export default FullScreenPlayer;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: Colors.background,
  },
  gradient: {
    position: 'absolute',
    zIndex: -3,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  flexRowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    marginTop: Platform.OS === 'ios' ? 40 : 20,
  },
  albumContainer: {
    height: screenHeight * 0.52,
    width: '100%',
  },
  imageContainer: {
    position: 'absolute',
    width: screenWidth * 0.9,
    height: screenHeight * 0.42,
    overflow: 'hidden',
    borderRadius: 10,
    alignSelf: 'center',
    top: screenHeight * 0.17,
  },
  img: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});
