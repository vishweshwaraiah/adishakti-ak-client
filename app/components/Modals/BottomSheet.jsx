import React, { useCallback, useEffect } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { useTheme } from '@/themes/ThemeProvider';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import Sizes from '@/utils/Sizes';
import useMasterStyle from '@/utils/useMasterStyle';
import MasterIcon from '@/components/MasterIcon';

const ScreenHeight = Dimensions.get('window').height;
const ScreenWidth = Dimensions.get('window').width;

const BottomSheet = (props) => {
  const { children, sheetHeight = 2.5, onClose = () => {} } = props;

  const { theme } = useTheme();
  const mStyles = useMasterStyle();

  const translateY = useSharedValue(0);
  const contextObj = useSharedValue({ y: 0 });
  const MaxTranslateY = -ScreenHeight;
  const MaxSheetHeight = 1.5;
  const MinSheetHeight = 3;

  const scrollTo = useCallback((dest = 0) => {
    'worklet';
    translateY.value = withSpring(dest, {
      damping: 50,
    });
  }, []);
  const dummygesture = Gesture.Pan();
  const gesture = Gesture.Pan()
    .onStart(() => {
      contextObj.value = { y: translateY.value };
    })
    .onUpdate((e) => {
      translateY.value = e.translationY + contextObj.value.y;
      translateY.value = Math.max(translateY.value, MaxTranslateY);
    })
    .onEnd(() => {
      if (translateY.value > -ScreenHeight / MinSheetHeight) {
        scrollTo();
      } else if (translateY.value < -ScreenHeight / MaxSheetHeight) {
        scrollTo(MaxTranslateY);
      }
    });

  const closeHandler = () => {
    onClose();
    scrollTo();
  };

  useEffect(() => {
    scrollTo(-ScreenHeight / sheetHeight);
  }, []);

  const rBottomSheetStyle = useAnimatedStyle(() => {
    const borderRadius = interpolate(
      translateY.value,
      [MaxTranslateY + 100, MaxTranslateY],
      [Sizes.$ieLargeRadius, 0],
      Extrapolation.CLAMP
    );
    return {
      borderRadius,
      transform: [{ translateY: translateY.value }],
    };
  });

  const styles = StyleSheet.create({
    bottomSheet: {
      position: 'absolute',
      top: ScreenHeight,
      height: ScreenHeight,
      width: '100%',
      backgroundColor: theme.white,
      overflow: 'hidden',
      padding: Sizes.$ieSmallPadding,
      ...mStyles.topShadow,
    },
    dragLine: {
      width: ScreenWidth / 3,
      height: Sizes.$ieLargeBorder,
      backgroundColor: theme.gray,
      alignSelf: 'center',
      marginVertical: Sizes.$ieSmallMargin,
      borderRadius: Sizes.$ieSmallRadius,
    },
  });

  return (
    <GestureDetector gesture={dummygesture}>
      <Animated.View style={[styles.bottomSheet, rBottomSheetStyle]}>
        <MasterIcon
          isInteractive={true}
          onPress={closeHandler}
          iconColor={theme.itemColor}
          iconName='close'
          iconBgColor={theme.itemBg}
          iconBgSize={Sizes.$ieActionBtn}
        />
        <View style={styles.dragLine} />
        {children}
        <Text>Hello Vish!</Text>
      </Animated.View>
    </GestureDetector>
  );
};

export default BottomSheet;
