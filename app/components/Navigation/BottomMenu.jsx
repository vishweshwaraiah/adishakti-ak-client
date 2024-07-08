import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import { useTheme } from '@/themes/ThemeProvider';
import useMasterStyle from '@/utils/useMasterStyle';
import MasterIcon from '@/components/MasterIcon';
import Sizes from '@/utils/Sizes';

const BottomMenu = (props) => {
  const { menuItems, iconsColor, toggleMenu = () => {} } = props;

  const mStyles = useMasterStyle();
  const { theme } = useTheme();

  let iconSize = 24;

  const handlePress = (menuItem) => {
    toggleMenu(menuItem);
  };

  const btnStyles = (menuItem) => {
    const xStyles = {};

    if (menuItem.floatingBtn) {
      iconSize = 32;
      xStyles.borderRadius = 35;
      xStyles.backgroundColor = theme.activeBar;
      xStyles.bottom = 30;
    } else {
      iconSize = 24;
      xStyles.borderRadius = 0;
      xStyles.backgroundColor = 'transparent';
      xStyles.bottom = 0;
    }

    if (menuItem.isSelected) {
      xStyles.color = theme.itemSelected;
      xStyles.borderBottomWidth = 5;
      xStyles.borderColor = theme.itemColor;
    }

    return xStyles;
  };

  const styles = StyleSheet.create({
    bottomContainer: {
      position: 'absolute',
      bottom: Sizes.$ieMenuBottomSpace,
      backgroundColor: theme.menuBg,
      borderRadius: Sizes.$ieRegularRadius * 2,
      width: '90%',
      left: '5%',
      right: '5%',
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      height: Sizes.$navDimension,
      maxHeight: Sizes.$ieMenuMaxHeight,
      zIndex: 201,
      ...mStyles.navShadow,
    },
    floatingBarLabel: {
      color: theme.itemColor,
    },
    bottomBarButton: {
      flexDirection: 'column',
      gap: Sizes.$ieFlexGap,
      justifyContent: 'center',
      alignItems: 'center',
      width: Sizes.$btnDimension,
      height: Sizes.$btnDimension,
      paddingTop: Sizes.$ieRegularPadding,
    },
  });

  return (
    <View style={styles.bottomContainer}>
      {menuItems.map((menuItem, idxKey) => (
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
      ))}
    </View>
  );
};

export default BottomMenu;
