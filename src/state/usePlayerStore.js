import {create} from 'zustand';
import {createJSONStorage, persist} from 'zustand/middleware';
import {mmkvStorage} from './storage';
import {trackData} from '../utils/dummyData';
import TrackPlayer, {RepeatMode} from 'react-native-track-player';
import {convertTrack} from '../utils/Constants';

export const usePlayerStore = create()(
  persist(
    (set, get) => ({
      currentPlayingTrack: null,
      allTracks: trackData,
      isShuffling: false,
      isRepeating: false,
      clear: () => {
        set({currentPlayingTrack: null});
      },
      setCurrentTrack: async track => {
        set({currentPlayingTrack: track});
      },
      setCurrentPlayingTrack: async track => {
        const {allTracks} = get();
        await TrackPlayer.reset();
        set(() => ({currentPlayingTrack: track}));
        const currentTrackConverted = convertTrack(track);
        const otherTracks = allTracks
          .filter(t => t.id !== track.id)
          .map(t => convertTrack(t));
        await TrackPlayer.add([currentTrackConverted, ...otherTracks]);
        await TrackPlayer.play();
      },
      play: async () => {
        const {currentPlayingTrack, allTracks} = get();
        const activeTrack = await TrackPlayer.getActiveTrack();
        console.log({activeTrack});
        if (activeTrack) {
          await TrackPlayer.play();
        } else {
          await TrackPlayer.reset();
          const currentTrackConverted = convertTrack(currentPlayingTrack);
          const otherTracks = allTracks
            .filter(t => t.id !== currentPlayingTrack.id)
            .map(t => convertTrack(t));
          await TrackPlayer.add([currentTrackConverted, ...otherTracks]);
          await TrackPlayer.play();
        }
      },
      pause: async () => {
        await TrackPlayer.pause();
      },
      next: async () => {
        const {currentPlayingTrack, allTracks, isRepeating} = get();
        await TrackPlayer.reset();
        if (isRepeating) {
          await TrackPlayer.add([convertTrack(currentPlayingTrack)]);
          await TrackPlayer.play();
          return;
        }
        const currentTrackIndex = allTracks.findIndex(
          t => t.id === currentPlayingTrack.id,
        );
        const nextTrackIndex = (currentTrackIndex + 1) % allTracks.length;
        const nextTrack = allTracks[nextTrackIndex];
        set({currentPlayingTrack: nextTrack});
        const otherTracks = allTracks
          .filter(t => t.id !== nextTrack.id)
          .map(t => convertTrack(t));
        await TrackPlayer.add([convertTrack(nextTrack), ...otherTracks]);
        await TrackPlayer.play();
      },
      previous: async () => {
        const {currentPlayingTrack, allTracks, isRepeating} = get();
        await TrackPlayer.reset();
        if (isRepeating) {
          await TrackPlayer.add([convertTrack(currentPlayingTrack)]);
          await TrackPlayer.play();
          return;
        }
        const currentTrackIndex = allTracks.findIndex(
          t => t.id === currentPlayingTrack.id,
        );
        const prevTrackIndex =
          (currentTrackIndex - 1 + allTracks.length) % allTracks.length;
        const prevTrack = allTracks[prevTrackIndex];
        set({currentPlayingTrack: prevTrack});
        const otherTracks = allTracks
          .filter(t => t.id !== prevTrack.id)
          .map(t => convertTrack(t));
        await TrackPlayer.add([convertTrack(prevTrack), ...otherTracks]);
        await TrackPlayer.play();
      },
      toggleRepeat: async () => {
        const {currentPlayingTrack} = get();
        await TrackPlayer.reset();
        await TrackPlayer.add([convertTrack(currentPlayingTrack)]);
        await TrackPlayer.setRepeatMode(RepeatMode.Track);
        await TrackPlayer.play();
        set({isRepeating: true});
        set({isShuffling: false});
      },
      toggleShuffle: async () => {
        const {currentPlayingTrack, allTracks} = get();
        await TrackPlayer.reset();
        const otherTracks = allTracks
          .filter(t => t.id !== currentPlayingTrack.id)
          .map(t => convertTrack(t));
        await TrackPlayer.add([
          convertTrack(currentPlayingTrack),
          ...otherTracks,
        ]);
        await TrackPlayer.setRepeatMode(RepeatMode.Off);
        await TrackPlayer.play();
        set({isRepeating: false});
        set({isShuffling: true});
      },
    }),
    {
      name: 'player-storage',
      storage: createJSONStorage(() => mmkvStorage),
    },
  ),
);
