import React, {useEffect, useRef} from 'react';
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

const MIN_PLAYER_HEIGHT = BOTTOM_TAB_HEIGHT + 60;
const MAX_PLAYER_HEIGHT = screenHeight;

// console.log({MAX_PLAYER_HEIGHT, MIN_PLAYER_HEIGHT});
// console.log({MIN_VALUE: -MAX_PLAYER_HEIGHT + MIN_PLAYER_HEIGHT});

const withPlayer = WrappedComponent => {
  return React.memo(props => {
    const {translationY} = useSharedState();
    const isExpanded = useSharedValue(false);
    const isScroll = useSharedValue(false);

    const scrollRef = useRef(null);

    // useEffect(() => {
    //   translationY.value = withTiming(0, {duration: 0});
    // }, [translationY]);

    // for ios
    // const onScroll = useAnimatedScrollHandler({
    //   onBeginDrag({contentOffset}) {
    //     console.log({contentOffset: contentOffset.y});
    //     if (contentOffset.y === 0) {
    //       isScroll.value = false;
    //     }
    //   },
    //   onEndDrag({contentOffset}) {
    //     if (contentOffset.y === 0) {
    //       isScroll.value = false;
    //     }
    //   },
    //   onMomentumEnd({contentOffset}) {
    //     if (contentOffset.y === 0) {
    //       isScroll.value = false;
    //     }
    //   },
    // });
    const onScroll = () => {};

    const panGesture = Gesture.Pan()
      .onChange(() => {
        // console.log({isScroll: isScroll.value}, 'onChange...........');
        if (translationY.value <= -602) {
          isScroll.value = true;
        }
      })
      .onUpdate(event => {
        // console.log({event: event.translationY}, 'onUpdate............');
        translationY.value = Math.max(
          Math.min(
            event.translationY +
              (isExpanded.value ? -MAX_PLAYER_HEIGHT + MIN_PLAYER_HEIGHT : 0),
            0,
          ),
          -MAX_PLAYER_HEIGHT + MIN_PLAYER_HEIGHT,
        );
        // console.log(
        //   {translationY: translationY.value},
        //   'onUpdate.............',
        // );
      })
      .onEnd(event => {
        // console.log({event: event.translationY}, 'onEnd.......');
        if (event?.translationY < -MIN_PLAYER_HEIGHT / 2) {
          isExpanded.value = true;
          translationY.value = withTiming(
            -MAX_PLAYER_HEIGHT + MIN_PLAYER_HEIGHT,
            {duration: 300},
          );
        } else {
          isExpanded.value = false;
          translationY.value = withTiming(0, {duration: 300});
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

    const combinedGesture = Gesture.Simultaneous(panGesture, Gesture.Native());

    return (
      <View style={styles.container}>
        <WrappedComponent {...props} />
        <GestureDetector gesture={combinedGesture}>
          <Animated.View
            style={[styles.playerContainer, animatedContainerStyles]}>
            {Platform.OS === 'ios' ? (
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
            ) : (
              <Animated.View style={expandedOpacityStyle}>
                <ScrollView
                  nestedScrollEnabled
                  persistentScrollbar
                  pinchGestureEnabled
                  bounces={false}
                  showsVerticalScrollIndicator={false}
                  scrollEventThrottle={1}
                  contentContainerStyle={styles.expandedPlayer}>
                  <FullScreenPlayer />
                </ScrollView>
              </Animated.View>
            )}

            <Animated.View
              style={[styles.collapsedPlayer, collapsedOpacityStyle]}>
              <AirPlayer />
            </Animated.View>
          </Animated.View>
        </GestureDetector>
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
    backgroundColor: '#444',
  },
  playerContainer: {
    position: 'absolute',
    width: '100%',
    bottom: 0,
    zIndex: 1,
    overflow: 'hidden',
    backgroundColor: 'transparent',
  },
  collapsedPlayer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default withPlayer;
