import React, {
  forwardRef,
  ReactNode,
  useCallback,
  useImperativeHandle,
} from 'react';
import { Dimensions, DimensionValue, StyleSheet, View } from 'react-native';
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
import AuthTemplate from '@/wrappers/AuthTemplate';

const ScreenHeight = Dimensions.get('window').height;
const ScreenWidth = Dimensions.get('window').width;

type BottomSheetProps = {
  children?: ReactNode;
  openCutOff?: DimensionValue;
  closeCutOff?: DimensionValue;
  dragClose?: boolean;
};

export type BottomSheetRefProps = {
  scrollTo: (destPoint: DimensionValue) => void;
  isActive: () => boolean;
};

const BottomSheet = forwardRef<BottomSheetRefProps, BottomSheetProps>(
  (props, ref) => {
    const {
      children,
      openCutOff = '60%',
      closeCutOff = '60%',
      dragClose = false,
    } = props;

    const { theme } = useTheme();
    const mStyles = useMasterStyle();

    const translateY = useSharedValue(0);
    const translateBackdrop = useSharedValue(0);
    const contextObj = useSharedValue({ y: 0 });
    const active = useSharedValue(false);
    const MaxTranslateY = -ScreenHeight;

    const getCutoff = useCallback((atPoint: DimensionValue = '0%') => {
      'worklet';
      if (atPoint === '0%') return 0;
      const toNum = parseFloat(atPoint as string);
      let cfDivider = 1.25;
      if (!Number.isNaN(toNum)) {
        cfDivider = 100 / toNum;
      }
      return MaxTranslateY / cfDivider;
    }, []);

    const scrollTo = useCallback((destPoint: DimensionValue = '0%') => {
      'worklet';
      active.value = destPoint !== '0%';
      const atPoint = getCutoff(destPoint);
      const backDrop = destPoint !== '0%' ? MaxTranslateY : 0;
      translateY.value = withSpring(atPoint, {
        damping: 50,
      });
      translateBackdrop.value = withSpring(backDrop, {
        damping: 50,
      });
    }, []);

    const isActive = useCallback(() => {
      return active.value;
    }, []);

    useImperativeHandle(ref, () => ({ scrollTo, isActive }), [
      scrollTo,
      isActive,
    ]);

    const sheetGestures = Gesture.Pan()
      .onStart(() => {
        if (dragClose) contextObj.value = { y: translateY.value };
      })
      .onUpdate((e) => {
        if (dragClose) {
          translateY.value = e.translationY + contextObj.value.y;
          translateY.value = Math.max(translateY.value, MaxTranslateY);
        }
      })
      .onEnd(() => {
        if (dragClose) {
          const transY = translateY.value;
          const closeDimension = getCutoff(closeCutOff);
          const openDimension = getCutoff(openCutOff);

          if (transY > closeDimension) {
            scrollTo('0%');
          } else if (transY < openDimension) {
            scrollTo('100%');
          }
        }
      });

    const rBottomSheetStyle = useAnimatedStyle(() => {
      const borderRadius = interpolate(
        translateY.value,
        [MaxTranslateY + 100, MaxTranslateY],
        [Sizes.$ieLargeRadius, Sizes.$ieSmallRadius],
        Extrapolation.CLAMP
      );
      return {
        borderRadius,
        transform: [{ translateY: translateY.value }],
      };
    });

    const bottomSheetBgStyle = useAnimatedStyle(() => {
      return {
        transform: [{ translateY: translateBackdrop.value }],
      };
    });

    const styles = StyleSheet.create({
      backDrop: {
        backgroundColor: theme.backDropBg,
      },
      bottomSheet: {
        position: 'absolute',
        top: ScreenHeight,
        height: ScreenHeight,
        width: '100%',
        backgroundColor: theme.white,
        overflow: 'hidden',
        ...mStyles.topShadow,
      },
      contentBox: {
        flex: 1,
      },
      dragLine: {
        width: ScreenWidth / 4,
        height: Sizes.$ieXLargeBorder,
        backgroundColor: theme.gray,
        alignSelf: 'center',
        marginVertical: Sizes.$ieSmallMargin,
        borderRadius: Sizes.$ieSmallRadius,
      },
    });

    return (
      <Animated.View
        style={[styles.bottomSheet, styles.backDrop, bottomSheetBgStyle]}
      >
        <GestureDetector gesture={sheetGestures}>
          <Animated.View
            style={[styles.bottomSheet, styles.contentBox, rBottomSheetStyle]}
          >
            {dragClose && <View style={styles.dragLine} />}
            <AuthTemplate>{children}</AuthTemplate>
          </Animated.View>
        </GestureDetector>
      </Animated.View>
    );
  }
);

BottomSheet.displayName = 'BottomSheet';

export default BottomSheet;
