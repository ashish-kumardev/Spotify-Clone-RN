import {
  Image,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {memo, useEffect, useState} from 'react';
import {useSharedState} from '../../hooks/useSharedState';
import {usePlaybackState, useProgress} from 'react-native-track-player';
import LinearGradient from 'react-native-linear-gradient';
import {usePlayerStore} from '../../state/usePlayerStore';
import ImageColors from 'react-native-image-colors';
import {darkenColor, Fonts} from '../../utils/Constants';
import SlidingText from '../ui/SlidingText';
import {fontR} from '../../utils/Scaling';
import CustomText from '../ui/CustomText';
import Icon from '../ui/Icon';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const AirPlayer = ({isExpanded}) => {
  const {expandPlayer} = useSharedState();
  const [colors, setColors] = useState(['#666', '#666']);
  const progress = useProgress();
  const {state} = usePlaybackState();
  const isPlaying = state === 'playing';
  const {play, pause, currentPlayingTrack} = usePlayerStore();
  const safeAreaInsets = useSafeAreaInsets();

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

  const calculateProgress = () => {
    if (progress.position >= progress.duration) return '0%';
    const percentage = (progress.position / progress.duration) * 100;
    return `${percentage}%`;
  };

  const togglePlayback = () => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  };

  return (
    <LinearGradient
      style={[styles.container, {marginBottom: safeAreaInsets.bottom}]}
      colors={colors}>
      <View style={styles.flexRowBetween}>
        <TouchableOpacity
          onPress={() => {
            expandPlayer();
            isExpanded.value = true;
          }}
          style={{width: '75%'}}>
          <View style={[styles.flexRow, {width: '100%'}]}>
            <Image
              source={currentPlayingTrack?.artwork_uri}
              style={styles.img}
            />
            <View style={{width: '75%'}}>
              <SlidingText
                text={currentPlayingTrack?.title}
                fontFamily={Fonts.Bold}
                fontSize={fontR(8)}
              />

              <CustomText
                fontFamily={Fonts.Medium}
                fontSize={fontR(6)}
                style={{opacity: 0.8}}
                numberOfLines={1}>
                {currentPlayingTrack?.artist?.name}
              </CustomText>
            </View>
          </View>
        </TouchableOpacity>

        <View style={styles.flexRow}>
          <Icon
            name={'broadcast-on-home'}
            size={fontR(20)}
            color="#ccc"
            iconFamily={'MaterialIcons'}
          />
          <TouchableOpacity onPress={togglePlayback}>
            <Icon
              name={isPlaying ? 'pause' : 'play'}
              size={fontR(20)}
              color="#ccc"
              iconFamily="Ionicons"
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.progressContainer}>
        <View style={styles.progressBackground}>
          <View style={[styles.progress, {width: calculateProgress()}]} />
        </View>
      </View>
    </LinearGradient>
  );
};

export default memo(AirPlayer);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    position: 'relative',
  },
  flexRowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  img: {
    borderRadius: 4,
    width: 45,
    height: 45,
    resizeMode: 'cover',
  },
  progressContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 2,
  },
  progressBackground: {
    height: 2,
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  progress: {
    height: 2,
    backgroundColor: '#fff',
  },
});
