import {createContext} from 'react';
import {BOTTOM_TAB_HEIGHT} from '../utils/Constants';
import {screenHeight} from '../utils/Scaling';
import {useSharedValue, withTiming} from 'react-native-reanimated';

const MIN_PLAYER_HEIGHT = BOTTOM_TAB_HEIGHT + 60;
const MAX_PLAYER_HEIGHT = screenHeight;

export const SharedStateContext = createContext();

export const SharedStateProvider = ({children}) => {
  const translationY = useSharedValue(0);

  const expandPlayer = () => {
    translationY.value = withTiming(-MAX_PLAYER_HEIGHT + MIN_PLAYER_HEIGHT, {
      duration: 300,
    });
  };

  const collapsePlayer = () => {
    translationY.value = withTiming(0, {duration: 300});
  };
  return (
    <SharedStateContext.Provider
      value={{translationY, expandPlayer, collapsePlayer}}>
      {children}
    </SharedStateContext.Provider>
  );
};
