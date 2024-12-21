import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Animated, Pressable } from 'react-native';
import Sizes from '@/utils/Sizes';
import { useTheme } from '@/themes/ThemeProvider';
import useMasterStyle from '@/utils/useMasterStyle';
import MasterIcon from '@/components/MasterIcon';

const FloatingMenu = (props) => {
  const { menuItems, iconsColor, toggleMenu = () => {} } = props;

  const { theme } = useTheme();
  const mStyles = useMasterStyle();

  const animateRef = useRef(new Animated.Value(0)).current;
  const [menuStatus, setMenuStatus] = useState(false);
  const [menuItem, setMenuItem] = useState({});
  const [iconStyles, setIconStyles] = useState({});

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
    if (menuItem) {
      setMenuItem(menuItem);
      toggleMenu(menuItem);
    }
  };

  const btnStyles = (idxKey) => {
    const xStyles = {
      padding: 10,
      transform: animateActions(-idxKey * 80),
    };

    return xStyles;
  };

  useEffect(() => {
    const xStyles = {};

    if (menuItem?.isSelected) {
      xStyles.backgroundColor = theme.secondary;
    }

    setIconStyles(xStyles);
  }, [menuItem]);

  useEffect(() => {
    const menuItem = menuItems.find((x) => x.isSelected);
    if (menuItem) setMenuItem(menuItem);
  }, [menuItems]);

  const styles = StyleSheet.create({
    menuContainer: {
      position: 'absolute',
      right: Sizes.$ieActionBtn,
      bottom: Sizes.$ieActionBtn,
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

      {menuItems.map((menu, idx) => (
        <Animated.View
          key={menu.name}
          style={[styles.menuBtn, btnStyles(idx + 1)]}
        >
          {menu.label && (
            <Animated.Text style={[styles.floatingBarLabel, labelStyles]}>
              {menu.label}
            </Animated.Text>
          )}
          <View
            style={[
              styles.iconBox,
              styles.actionIconBox,
              menu.name === menuItem.name && iconStyles,
            ]}
          >
            <MasterIcon
              onPress={() => handlePress(menu)}
              iconFamily={menu.iconFamily}
              iconName={menu.iconName}
              iconSize={Sizes.$actionIconSize}
              iconColor={iconsColor}
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
            iconColor={iconsColor}
            isInteractive={true}
          />
        </Animated.View>
      </View>
    </View>
  );
};

export default FloatingMenu;
