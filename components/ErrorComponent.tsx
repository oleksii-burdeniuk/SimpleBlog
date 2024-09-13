import { StyleSheet, Dimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  runOnJS,
  useAnimatedGestureHandler,
} from 'react-native-reanimated';
import { PanGestureHandler } from 'react-native-gesture-handler';
import { useEffect } from 'react';

import { ThemedText } from '@/components/ThemedText';

const { height } = Dimensions.get('window');

interface ErrorComponentProps {
  errorMessage: string;
  isActive: boolean;
  onClose: () => void;
}

export function ErrorComponent({
  errorMessage,
  isActive,
  onClose,
}: ErrorComponentProps) {
  const translateY = useSharedValue(-height / 4);

  useEffect(() => {
    if (isActive) {
      translateY.value = withSpring(0, { damping: 15 });
    } else {
      translateY.value = withTiming(
        -height / 4,
        { duration: 300 },
        (isFinished) => {
          if (isFinished) {
            runOnJS(onClose)();
          }
        }
      );
    }
  }, [isActive]);

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.startY = translateY.value;
    },
    onActive: (event, ctx) => {
      translateY.value = ctx.startY + event.translationY;
    },
    onEnd: (event) => {
      if (event.translationY < -50) {
        translateY.value = withTiming(-height / 4, { duration: 300 });
        runOnJS(onClose)();
      } else {
        translateY.value = withTiming(-height / 4, { duration: 300 });
        runOnJS(onClose)();
      }
    },
  });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <PanGestureHandler onGestureEvent={gestureHandler}>
      <Animated.View style={[styles.container, animatedStyle]}>
        <ThemedText style={styles.text}>{errorMessage}</ThemedText>
      </Animated.View>
    </PanGestureHandler>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#ff4747',
    padding: 16,
    borderRadius: 18,
    marginHorizontal: 8,
    zIndex: 1000,
    marginTop: 60,
  },
  text: {
    fontSize: 18,
    textAlign: 'center',
  },
});
