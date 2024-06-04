import React, { useRef, useState } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Pressable,
} from 'react-native';
import Sizes from '@/utils/Sizes';
import { useTheme } from '@/themes/ThemeProvider';
import useMasterStyle from '@/utils/useMasterStyle';
import MasterIcon from '@/components/MasterIcon';

const FloatingMenu = (props) => {
  const {
    menuItems,
    iconsColor,
    toggleMenu = () => {},
    currentRoute = '',
  } = props;

  const { theme } = useTheme();
  const mStyles = useMasterStyle();

  let actionIconSize = 16;
  let triggerIconSize = 24;
  let iconColor = iconsColor;

  const animateRef = useRef(new Animated.Value(0)).current;
  const [menuStatus, setMenuStatus] = useState(false);

  // Rotating the trigger button
  const rotateTrigger = [
    {
      rotate: animateRef.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '45deg'],
      }),
    },
  ];

  // Animating other action buttons
  const animateActions = (translateY) => [
    { scale: 1 },
    {
      translateY: animateRef.interpolate({
        inputRange: [0, 1],
        outputRange: [0, translateY],
      }),
    },
  ];

  // Lable positioning interpolation
  const labelPosInterpolate = animateRef.interpolate({
    inputRange: [0, 1],
    outputRange: [-30, -90],
  });

  const opacityInterpolate = animateRef.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 0, 1],
  });

  const labelStyles = {
    opacity: opacityInterpolate,
    transform: [
      {
        translateX: labelPosInterpolate,
      },
    ],
  };

  const backDropStyle = {
    transform: [
      {
        scale: animateRef.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 50],
        }),
      },
    ],
  };

  const handlePress = (menuItem) => {
    const toValue = menuStatus ? 0 : 1;

    Animated.spring(animateRef, {
      toValue,
      useNativeDriver: true,
    }).start();

    setMenuStatus(!menuStatus);
    toggleMenu(menuItem);
  };

  const btnStyles = (menuItem, idxKey) => {
    const xStyles = {
      padding: 10,
      transform: animateActions(-idxKey * 80),
    };

    if (menuItem.name === currentRoute) {
      xStyles.color = theme.itemSelected;
    }

    return xStyles;
  };

  const styles = StyleSheet.create({
    menuContainer: {
      position: 'absolute',
      right: 50,
      bottom: 50,
      width: Sizes.$btnDimension,
      height: Sizes.$btnDimension,
      borderRadius: Sizes.$ieMaxRadius,
      zIndex: 201,
    },
    backDrop: {
      position: 'absolute',
      backgroundColor: theme.backDropBg,
      width: Sizes.$btnDimension,
      height: Sizes.$btnDimension,
      borderRadius: Sizes.$ieMaxRadius,
      zIndex: 200,
    },
    floatingBarLabel: {
      position: 'absolute',
      color: theme.itemColor,
      backgroundColor: 'transparent',
    },
    iconBox: {
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: Sizes.$ieMaxRadius,
      backgroundColor: theme.menuBg,
      zIndex: 201,
    },
    triggerIconBox: {
      width: Sizes.$btnDimension,
      height: Sizes.$btnDimension,
    },
    actionIconBox: {
      width: Sizes.$btnDimension - 20,
      height: Sizes.$btnDimension - 20,
    },
    menuBtn: {
      position: 'absolute',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      ...mStyles.navShadow,
    },
  });

  return (
    <View style={styles.menuContainer}>
      <Pressable onPress={() => handlePress()}>
        <Animated.View style={[styles.backDrop, backDropStyle]} />
      </Pressable>

      {menuItems.map((menuItem, idx) => (
        <Animated.View
          key={menuItem.name}
          style={[styles.menuBtn, btnStyles(menuItem, idx + 1)]}
        >
          {menuItem.label && (
            <Animated.Text style={[styles.floatingBarLabel, labelStyles]}>
              {menuItem.label}
            </Animated.Text>
          )}
          <View style={[styles.iconBox, styles.actionIconBox]}>
            <MasterIcon
              onPress={() => handlePress(menuItem)}
              iconFamily={menuItem.iconFamily}
              iconName={menuItem.iconName}
              iconSize={actionIconSize}
              iconColor={iconColor}
              isInteractive={true}
            />
          </View>
        </Animated.View>
      ))}
      <View style={[styles.menuBtn, styles.iconBox, styles.triggerIconBox]}>
        <Animated.View style={{ transform: rotateTrigger }}>
          <MasterIcon
            onPress={() => handlePress()}
            iconName='plus'
            iconSize={triggerIconSize}
            iconColor={iconColor}
            isInteractive={true}
          />
        </Animated.View>
      </View>
    </View>
  );
};

export default FloatingMenu;
