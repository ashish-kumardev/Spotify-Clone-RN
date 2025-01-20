import React, {useRef} from 'react';
import {BOTTOM_TAB_HEIGHT} from '../../utils/Constants';
import {Platform, StyleSheet, View} from 'react-native';
import {screenHeight} from '../../utils/Scaling';
import {
  Gesture,
  GestureDetector,
  ScrollView,
} from 'react-native-gesture-handler';
import Animated, {
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {useSharedState} from '../../hooks/useSharedState';
import FullScreenPlayer from './FullScreenPlayer';
import AirPlayer from './AirPlayer';
import {usePlayerStore} from '../../state/usePlayerStore';

const MIN_PLAYER_HEIGHT = BOTTOM_TAB_HEIGHT + 60;
const MAX_PLAYER_HEIGHT = screenHeight;

// console.log({MAX_PLAYER_HEIGHT, MIN_PLAYER_HEIGHT});
// console.log({MIN_VALUE: -MAX_PLAYER_HEIGHT + MIN_PLAYER_HEIGHT});

const withPlayer = WrappedComponent => {
  return React.memo(props => {
    const {translationY} = useSharedState();
    const isExpanded = useSharedValue(false);
    const isScroll = useSharedValue(false);
    const {currentPlayingTrack} = usePlayerStore();

    const scrollRef = useRef(null);

    // for ios
    const onScroll = useAnimatedScrollHandler({
      onBeginDrag({contentOffset}) {
        console.log({contentOffset: contentOffset.y});
        if (contentOffset.y === 0) {
          isScroll.value = false;
        }
      },
      onEndDrag({contentOffset}) {
        if (contentOffset.y === 0) {
          isScroll.value = false;
        }
      },
      onMomentumEnd({contentOffset}) {
        if (contentOffset.y === 0) {
          isScroll.value = false;
        }
      },
    });

    const panGesture = Gesture.Pan()
      .onChange(() => {
        // console.log({translationY: translationY.value}, 'onChange...........');
        if (translationY.value <= -602) {
          console.log({isScroll: isScroll.value}, 'onChange...........');
          isScroll.value = true;
        }
      })
      .onUpdate(event => {
        translationY.value = Math.max(
          Math.min(
            event.translationY +
              (isExpanded.value ? -MAX_PLAYER_HEIGHT + MIN_PLAYER_HEIGHT : 0),
            0,
          ),
          -MAX_PLAYER_HEIGHT + MIN_PLAYER_HEIGHT,
        );
      })
      .onEnd(event => {
        console.log({event: event.translationY}, 'onEnd.......');
        if (event?.translationY < -MIN_PLAYER_HEIGHT / 2) {
          isExpanded.value = true;
          translationY.value = withTiming(
            -MAX_PLAYER_HEIGHT + MIN_PLAYER_HEIGHT,
            {duration: 300},
          );
        } else {
          isExpanded.value = false;
          translationY.value = withTiming(0, {duration: 300});
          // isScroll.value = false;
        }
      })
      .enabled(!isScroll.value);

    const animatedContainerStyles = useAnimatedStyle(() => {
      const height = interpolate(
        translationY.value,
        [-MAX_PLAYER_HEIGHT + MIN_PLAYER_HEIGHT, 0],
        [MAX_PLAYER_HEIGHT, MIN_PLAYER_HEIGHT],
        'clamp',
      );

      // console.log({height});

      return {
        height,
        borderTopLeftRadius: translationY.value < -2 ? 15 : 0,
        borderTopRightRadius: translationY.value < -2 ? 15 : 0,
      };
    });

    const collapsedOpacityStyle = useAnimatedStyle(() => {
      const opacity = interpolate(translationY.value, [-2, 0], [0, 1], 'clamp');

      return {
        opacity,
        display: translationY.value < -2 ? 'none' : 'flex',
      };
    });

    const expandedOpacityStyle = useAnimatedStyle(() => {
      const opacity = interpolate(translationY.value, [-2, 0], [1, 0], 'clamp');
      return {
        opacity,
        display: translationY.value > -2 ? 'none' : 'flex',
      };
    });

    // const combinedGesture = Gesture.Simultaneous(Gesture.Native(), panGesture);

    return (
      <View style={styles.container}>
        <WrappedComponent {...props} />
        {currentPlayingTrack && (
          // <GestureDetector gesture={combinedGesture}>
          <Animated.View
            style={[styles.playerContainer, animatedContainerStyles]}>
            {/* {Platform.OS === 'ios' ? (
              <Animated.ScrollView
                ref={scrollRef}
                persistentScrollbar
                pinchGestureEnabled
                bounces={false}
                showsVerticalScrollIndicator={false}
                scrollEventThrottle={1}
                onScroll={onScroll}
                contentContainerStyle={styles.expandedPlayer}
                style={expandedOpacityStyle}>
                <FullScreenPlayer />
              </Animated.ScrollView>
            ) : ( */}
            <Animated.View style={[expandedOpacityStyle]}>
              <ScrollView
                nestedScrollEnabled
                persistentScrollbar
                pinchGestureEnabled
                bounces={false}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={[styles.expandedPlayer]}
                scrollEventThrottle={1}>
                <FullScreenPlayer />
              </ScrollView>
            </Animated.View>
            {/* )} */}

            <Animated.View
              style={[styles.collapsedPlayer, collapsedOpacityStyle]}>
              <AirPlayer />
            </Animated.View>
          </Animated.View>
          // </GestureDetector>
        )}
      </View>
    );
  });
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  expandedPlayer: {
    alignItems: 'center',
  },
  playerContainer: {
    position: 'absolute',
    width: '100%',
    bottom: 0,
    zIndex: 1,
    overflow: 'hidden',
  },
  collapsedPlayer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default withPlayer;
