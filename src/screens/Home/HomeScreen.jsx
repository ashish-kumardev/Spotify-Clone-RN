import {FlatList, StyleSheet, Text} from 'react-native';
import React from 'react';
import CustomSafeAreaView from '../../components/ui/CustomSafeAreaView';
import withPlayer from '../../components/player/Player';
import {usePlayerStore} from '../../state/usePlayerStore';
import CustomHeader from '../../components/ui/CustomHeader';
import TrackItem from '../../components/Tracks/TrackItem';

const HomeScreen = () => {
  const allTracks = usePlayerStore(state => state.allTracks);

  const renderMusicTrack = ({item}) => {
    return <TrackItem item={item} />;
  };
  return (
    <CustomSafeAreaView>
      <CustomHeader title="Your Tracks" />

      <FlatList
        data={allTracks}
        renderItem={renderMusicTrack}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        style={{paddingTop: 20}}
      />
    </CustomSafeAreaView>
  );
};

export default withPlayer(HomeScreen);

const styles = StyleSheet.create({});
