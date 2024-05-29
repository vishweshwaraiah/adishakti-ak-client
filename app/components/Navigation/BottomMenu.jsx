import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useTheme } from '@/themes/ThemeProvider';
import MasterIcon from '@/components/MasterIcon';
import Sizes from '@/utils/Sizes';

const BottomMenu = (props) => {
  const { menuItem, iconsColor, idxKey = 0, toggleMenu = () => {} } = props;

  const { theme } = useTheme();

  let { iconFamily, iconName } = menuItem;
  let iconSize = 24;

  const handlePress = () => {
    toggleMenu(menuItem);
  };

  const btnStyles = () => {
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

  return (
    <TouchableOpacity
      key={menuItem.name || idxKey}
      style={[btnStyles(), styles.bottomBarButton]}
      onPress={handlePress}
    >
      <MasterIcon
        iconFamily={iconFamily}
        iconName={iconName}
        iconSize={iconSize}
        iconColor={iconsColor}
      />
      {menuItem.label && !menuItem.floatingBtn && (
        <Text style={styles.floatingBarLabel}>{menuItem.label}</Text>
      )}
    </TouchableOpacity>
  );
};

export default BottomMenu;
