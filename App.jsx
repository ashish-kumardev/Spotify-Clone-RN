import 'react-native-gesture-handler';
import Navigation from './src/navigation/Navigation';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {useEffect} from 'react';
import {setupPlayer} from './src/service/PlaybackService';

// LogBox.ignoreAllLogs();
const App = () => {
  useEffect(() => {
    setupPlayer();
  }, []);

  // const setupPlayerFirstTime = async () => {
  //   const isSetup = await setupPlayer();
  //   if (!isSetup) {
  //     await TrackPlayer.setupPlayer();
  //   }
  // };
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <Navigation />
    </GestureHandlerRootView>
  );
};

export default App;
