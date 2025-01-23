import TrackPlayer, {Capability, Event} from 'react-native-track-player';
import {usePlayerStore} from '../state/usePlayerStore';

export const setupPlayer = async () => {
  try {
    await TrackPlayer.getActiveTrackIndex();
  } catch (error) {
    await TrackPlayer.setupPlayer();
  }
};

export const PlaybackService = async () => {
  TrackPlayer.addEventListener(Event.RemotePlay, () => {
    TrackPlayer.play();
  });

  TrackPlayer.addEventListener(Event.RemotePause, () => {
    TrackPlayer.pause();
  });

  TrackPlayer.addEventListener(Event.RemoteStop, async () => {
    console.log('TrackPlayer Stop Event..........');
    await TrackPlayer.stop();
    usePlayerStore.getState().clear();
  });

  TrackPlayer.addEventListener(Event.RemoteNext, async () => {
    await usePlayerStore.getState().next();
  });

  TrackPlayer.addEventListener(Event.RemotePrevious, async () => {
    await usePlayerStore.getState().previous();
  });

  TrackPlayer.addEventListener(Event.PlaybackActiveTrackChanged, e => {
    console.log('Track Player PlaybackActiveTrackChanged..........');
    const currentTrack = usePlayerStore.getState().currentPlayingTrack;
    console.log({currentTrack}, {eventTrack: e.track});
    // console.log({eventTrackUndefined: e?.track?.id === undefined});
    // console.log({bothTrackAvailable: e?.track?.id === currentTrack?.id});
    if (e?.track?.id === undefined || e?.track?.id === currentTrack?.id) {
      return;
    }
    const allTracks = usePlayerStore.getState().allTracks;
    const track = allTracks.find(t => t.id === e?.track?.id);
    usePlayerStore.getState().setCurrentTrack(track);
  });

  // await TrackPlayer.setupPlayer();
  await TrackPlayer.updateOptions({
    capabilities: [
      Capability.Play,
      Capability.Pause,
      Capability.Stop,
      Capability.SkipToNext,
      Capability.SkipToPrevious,
    ],
    compactCapabilities: [Capability.Play, Capability.Pause],
  });
};
