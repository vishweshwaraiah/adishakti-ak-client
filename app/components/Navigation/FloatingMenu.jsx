import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import Sizes from '@/utils/Sizes';
import { useTheme } from '@/themes/ThemeProvider';
import MasterIcon from '@/components/MasterIcon';

const FloatingMenu = (props) => {
  const {
    menuItem,
    iconsColor,
    idxKey = 0,
    menuStatus = false,
    toggleMenu = () => {},
  } = props;

  const { theme } = useTheme();

  const handlePress = () => {
    toggleMenu(menuItem);
  };

  const { focused } = false;
  let { iconFamily, iconName } = menuItem;
  let iconSize = 16;

  let iconColor = iconsColor;

  if (focused) {
    iconSize = 24;
    iconColor = theme.selected;
  }

  if (menuItem.isTrigger) iconSize = 32;

  const flexButton = () => {
    const xStyles = {
      position: 'absolute',
      justifyContent: 'center',
      right: 0,
      bottom: idxKey * 80,
    };

    if (!menuItem.isTrigger && !menuStatus) {
      xStyles.display = 'none';
    } else {
      xStyles.display = 'flex';
    }

    return xStyles;
  };

  const btnStyles = () => {
    const xStyles = {
      gap: Sizes.$ieFlexGap,
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'center',
    };

    if (!menuItem.isTrigger) {
      xStyles.padding = 10;
    } else {
      xStyles.padding = 0;
    }

    return xStyles;
  };

  const iconBoxStyles = () => {
    let xStyles = {
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: Sizes.$ieMaxRadius,
      backgroundColor: theme.navBackground,
      width: Sizes.$btnDimension,
      height: Sizes.$btnDimension,
    };

    if (!menuItem.isTrigger) {
      xStyles.width = Sizes.$btnDimension - 20;
      xStyles.height = Sizes.$btnDimension - 20;
    }

    return xStyles;
  };

  const iconAnimate = () => {
    let xStyles = {
      transform: [{ rotate: '0deg' }],
    };

    if (menuItem.isTrigger && menuStatus) {
      xStyles.transform = [{ rotate: '45deg' }];
    }

    return xStyles;
  };

  const styles = StyleSheet.create({
    floatingBarLabel: {
      color: theme.itemColor,
    },
  });

  return (
    <View key={menuItem.name} style={flexButton()}>
      <TouchableOpacity style={btnStyles()} onPress={handlePress}>
        {menuItem.label && (
          <Text style={styles.floatingBarLabel}>{menuItem.label}</Text>
        )}
        <View style={iconBoxStyles()}>
          <View style={iconAnimate()}>
            <MasterIcon
              iconFamily={iconFamily}
              iconName={iconName}
              iconSize={iconSize}
              iconColor={iconColor}
            />
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default FloatingMenu;
