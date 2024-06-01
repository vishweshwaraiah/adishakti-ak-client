import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useTheme } from '@/themes/ThemeProvider';
import MasterIcon from '@/components/MasterIcon';
import Sizes from '@/utils/Sizes';

const BottomMenu = (props) => {
  const { menuItems, iconsColor, toggleMenu = () => {} } = props;

  const { theme } = useTheme();

  let iconSize = 24;

  const handlePress = (menuItem) => {
    toggleMenu(menuItem);
  };

  const btnStyles = (menuItem) => {
    const xStyles = {
      flexDirection: 'column',
      gap: Sizes.$ieFlexGap,
      justifyContent: 'center',
      alignItems: 'center',
    };

    if (menuItem.floatingBtn) {
      xStyles.borderRadius = 35;
      xStyles.backgroundColor = theme.activeBar;
      xStyles.bottom = 30;
      iconSize = 32;
    }

    return xStyles;
  };

  const styles = StyleSheet.create({
    floatingBarLabel: {
      color: theme.itemColor,
    },
    bottomBarButton: {
      width: Sizes.$btnDimension,
      height: Sizes.$btnDimension,
      paddingTop: Sizes.$ieRegularPadding,
    },
  });

  return menuItems.map((menuItem, idxKey) => (
    <TouchableOpacity
      key={menuItem.name || idxKey}
      style={[btnStyles(menuItem), styles.bottomBarButton]}
      onPress={() => handlePress(menuItem)}
    >
      <MasterIcon
        iconFamily={menuItem.iconFamily}
        iconName={menuItem.iconName}
        iconSize={iconSize}
        iconColor={iconsColor}
      />
      {menuItem.label && !menuItem.floatingBtn && (
        <Text style={styles.floatingBarLabel}>{menuItem.label}</Text>
      )}
    </TouchableOpacity>
  ));
};

export default BottomMenu;
