import {Image, Platform, StyleSheet, Text, View} from 'react-native';
import React, {memo, useEffect, useState} from 'react';
import TrackPlayer, {
  usePlaybackState,
  useProgress,
} from 'react-native-track-player';
import {usePlayerStore} from '../../state/usePlayerStore';
import {Colors, Fonts} from '../../utils/Constants';
import {fontR, screenWidth} from '../../utils/Scaling';
import SlidingText from '../ui/SlidingText';
import CustomText from '../ui/CustomText';
import ScalePress from '../ui/ScalePress';
import Icon from '../ui/Icon';
import Slider from '@react-native-community/slider';
import PackageIcon from 'react-native-vector-icons/MaterialIcons';

const ControlAndDetail = () => {
  const progress = useProgress();
  const [icon, setIcon] = useState();
  const {state} = usePlaybackState();
  const isPlaying = state === 'playing';
  const {
    play,
    pause,
    currentPlayingTrack,
    next,
    previous,
    isRepeating,
    toggleRepeat,
    toggleShuffle,
  } = usePlayerStore();

  const formatTime = (time = 0) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  const togglePlayback = () => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  };

  const handleSeek = async value => {
    await TrackPlayer.seekTo(value * progress.duration);
  };

  useEffect(() => {
    PackageIcon.getImageSource('circle', 15, '#fff').then(setIcon);
  }, []);

  const handleLoop = () => {
    if (isRepeating) {
      toggleShuffle();
    } else {
      toggleRepeat();
    }
  };

  // console.log({isRepeating});

  return (
    <View style={styles.container}>
      <View style={styles.flexRowBetween}>
        <View style={{width: '85%'}}>
          <SlidingText
            fontFamily={Fonts.Bold}
            fontSize={fontR(14)}
            text={currentPlayingTrack?.title}
          />
          <CustomText
            fontFamily={Fonts.Medium}
            fontSize={fontR(8)}
            style={styles.artist}>
            {currentPlayingTrack?.artist?.name}
          </CustomText>
        </View>
        <ScalePress>
          <Icon
            name={'favorite-outline'}
            iconFamily={'MaterialIcons'}
            size={fontR(28)}
          />
        </ScalePress>
      </View>

      <Slider
        tapToSeek
        style={styles.slider}
        minimumValue={0}
        maximumValue={1}
        value={progress?.position ? progress.position / progress.duration : 0}
        onSlidingComplete={handleSeek}
        thumbImage={icon}
        minimumTrackTintColor="#fff"
        maximumTrackTintColor="rgba(255,255,255,0.7)"
      />

      <View style={styles.timeZone}>
        <CustomText fontSize={fontR(8)}>
          {formatTime(progress?.position)}
        </CustomText>
        <CustomText fontSize={fontR(8)}>
          {formatTime(progress?.duration - progress?.position)}
        </CustomText>
      </View>

      <View style={styles.flexRowBetween}>
        <ScalePress onPress={handleLoop}>
          <Icon
            name={isRepeating ? 'repeat' : 'shuffle'}
            iconFamily={'Ionicons'}
            size={fontR(22)}
            color={Colors.primary}
          />
        </ScalePress>
        <ScalePress onPress={previous}>
          <Icon
            name={'play-skip-back-sharp'}
            iconFamily={'Ionicons'}
            size={fontR(26)}
          />
        </ScalePress>
        <ScalePress onPress={togglePlayback}>
          <Icon
            name={isPlaying ? 'pause-circle-sharp' : 'play-circle-sharp'}
            iconFamily={'Ionicons'}
            size={fontR(50)}
          />
        </ScalePress>
        <ScalePress onPress={next}>
          <Icon
            name={'play-skip-forward-sharp'}
            iconFamily={'Ionicons'}
            size={fontR(26)}
          />
        </ScalePress>
        <ScalePress>
          <Icon
            name={'alarm'}
            iconFamily={'MaterialCommunityIcons'}
            size={fontR(22)}
          />
        </ScalePress>
      </View>

      <View style={styles.artistContainer}>
        <Image
          source={currentPlayingTrack?.artist?.cover_uri}
          style={styles.artistCover}
        />
        <View style={{paddingHorizontal: 20, paddingVertical: 15}}>
          <CustomText fontFamily={Fonts.Bold} fontSize={fontR(11)}>
            {currentPlayingTrack?.artist?.name}
          </CustomText>
          <CustomText
            fontFamily={Fonts.Medium}
            fontSize={fontR(8)}
            style={{opacity: 0.8}}>
            1.5Cr Monthly listeners
          </CustomText>
          <CustomText
            fontSize={fontR(8)}
            fontFamily={Fonts.Medium}
            style={{marginTop: 10, opacity: 0.8}}
            numberOfLines={3}>
            {currentPlayingTrack?.artist?.bio}
          </CustomText>
        </View>
      </View>

      <View style={styles.infoContainer}>
        <CustomText fontFamily={Fonts.Bold} fontSize={fontR(12)}>
          Credits
        </CustomText>
        <CustomText
          fontFamily={Fonts.Medium}
          fontSize={fontR(10)}
          style={styles.titleText}>
          {currentPlayingTrack?.artist?.name}
        </CustomText>
        <CustomText style={styles.subText} fontSize={fontR(8)}>
          Main Artist, Composer, Producer
        </CustomText>
        <CustomText
          fontFamily={Fonts.Medium}
          fontSize={fontR(10)}
          style={styles.titleText}>
          {currentPlayingTrack?.lyricist}
        </CustomText>
        <CustomText style={styles.subText} fontSize={fontR(8)}>
          Lyricist
        </CustomText>
      </View>

      <View style={styles.infoContainer}>
        <CustomText fontFamily={Fonts.Medium} fontSize={fontR(9)}>
          If you are enjoying!
        </CustomText>
        <CustomText style={styles.subText} fontSize={fontR(8)}>
          Rate the song
        </CustomText>
      </View>

      <View style={styles.modalContainer}>
        <CustomText fontFamily={Fonts.Bold} fontSize={fontR(14)}>
          Spotify Clone X Ashish Kumar
        </CustomText>
        <CustomText
          fontFamily={Fonts.Medium}
          fontSize={fontR(12)}
          style={{marginTop: 10}}>
          Made with ❤️
        </CustomText>
      </View>
    </View>
  );
  s;
};

export default memo(ControlAndDetail);

const styles = StyleSheet.create({
  container: {
    padding: 20,
    zIndex: 100,
  },
  subText: {
    marginTop: 2,
    opacity: 0.8,
  },
  titleText: {
    marginTop: 10,
  },
  modalContainer: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 100,
    marginBottom: 40,
    opacity: 0.6,
  },
  artistContainer: {
    backgroundColor: Colors.backgroundLight,
    borderRadius: 12,
    marginTop: 40,
    overflow: 'hidden',
  },
  infoContainer: {
    backgroundColor: Colors.backgroundLight,
    borderRadius: 12,
    marginTop: 20,
    overflow: 'hidden',
    padding: 10,
  },
  artistCover: {
    height: 200,
    width: '100%',
    resizeMode: 'cover',
  },
  slider: {
    width: Platform.OS === 'android' ? screenWidth : screenWidth - 30,
    height: 40,
    marginTop: 10,
    alignSelf: 'center',
  },
  timeZone: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    bottom: 10,
  },
  flexRowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  artist: {
    marginTop: 5,
    opacity: 0.8,
  },
});
