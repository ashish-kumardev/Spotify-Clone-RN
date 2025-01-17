import {StyleSheet} from 'react-native';
import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Animated, {useAnimatedStyle} from 'react-native-reanimated';
import {BOTTOM_TAB_HEIGHT, Colors} from '../../utils/Constants';
import ScalePress from '../../components/ui/ScalePress';
import {HomeTabIcon, LibraryTabIcon, SearchTabIcon} from './TabIcon';
import {useSharedState} from '../../hooks/useSharedState';

const CustomTabBar = ({state, navigation}) => {
  const safeAreaInsets = useSafeAreaInsets();
  const {translationY} = useSharedState();

  const animateStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateY: -translationY.value}],
    };
  });
  return (
    <Animated.View
      style={[
        styles.tabBarContainer,
        animateStyle,
        {paddingBottom: safeAreaInsets.bottom},
      ]}>
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <ScalePress
            key={route.key}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tabItem}>
            {route.name === 'Home' && <HomeTabIcon focused={isFocused} />}
            {route.name === 'Search' && <SearchTabIcon focused={isFocused} />}
            {route.name === 'Library' && <LibraryTabIcon focused={isFocused} />}
          </ScalePress>
        );
      })}
    </Animated.View>
  );
};

export default CustomTabBar;

const styles = StyleSheet.create({
  tabBarContainer: {
    width: '100%',
    backgroundColor: Colors.backgroundDark,
    height: BOTTOM_TAB_HEIGHT,
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingTop: 10,
    zIndex: 5,
  },
  tabItem: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
