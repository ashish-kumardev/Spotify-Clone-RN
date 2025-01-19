import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Colors, Fonts} from '../../utils/Constants';
import {usePlayerStore} from '../../state/usePlayerStore';
import CustomText from '../ui/CustomText';
import {fontR} from '../../utils/Scaling';
import Icon from '../ui/Icon';

const TrackItem = ({item}) => {
  const {currentPlayingTrack, setCurrentPlayingTrack} = usePlayerStore();

  const togglePlayingTrack = async () => {
    await setCurrentPlayingTrack(item);
  };

  const isActive = currentPlayingTrack?.id === item.id;
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.container}
      onPress={togglePlayingTrack}>
      <View style={styles.flexRowBetween}>
        <View style={styles.flexRow}>
          <Image source={item?.artwork_uri} style={styles.img} />
          <View style={styles.trackInfo}>
            <CustomText
              numberOfLines={1}
              fontSize={fontR(10)}
              fontFamily={Fonts.Medium}
              style={{
                color: isActive ? Colors.primary : Colors.text,
              }}>
              {item.title}
            </CustomText>

            <CustomText numberOfLines={1} fontSize={fontR(8)}>
              {item?.artist?.name}
            </CustomText>
          </View>
        </View>
        <Icon
          name="ellipsis-horizontal-sharp"
          size={fontR(14)}
          iconFamily="Ionicons"
        />
      </View>
    </TouchableOpacity>
  );
};

export default TrackItem;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: Colors.backgroundDark,
    marginVertical: 5,
  },
  flexRowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  trackInfo: {
    width: '65%',
  },
});
