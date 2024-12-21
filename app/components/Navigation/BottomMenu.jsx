import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import { useTheme } from '@/themes/ThemeProvider';
import useMasterStyle from '@/utils/useMasterStyle';
import MasterIcon from '@/components/MasterIcon';
import Sizes from '@/utils/Sizes';

const BottomMenu = (props) => {
  const { menuItems, iconsColor, toggleMenu = () => {} } = props;

  const mStyles = useMasterStyle();
  const { theme } = useTheme();

  const [menuItem, setMenuItem] = useState({});
  const [btnStyles, setBtnStyles] = useState({});

  let iconSize = 24;

  const handlePress = (routeItem) => {
    setMenuItem(routeItem);
    toggleMenu(routeItem);
  };

  const floatingBtnStyles = (routeItem) => {
    const xStyles = {};

    if (routeItem.floatingBtn) {
      iconSize = 32;
      xStyles.borderRadius = 35;
      xStyles.backgroundColor = theme.activeBtn;
      xStyles.bottom = 30;
    } else {
      iconSize = 24;
      xStyles.borderRadius = 0;
      xStyles.backgroundColor = 'transparent';
      xStyles.bottom = 0;
    }

    return xStyles;
  };

  useEffect(() => {
    const xStyles = {};

    if (menuItem.isSelected) {
      xStyles.color = theme.itemSelected;
      if (menuItem.floatingBtn) {
        xStyles.borderWidth = 5;
      } else {
        xStyles.borderBottomWidth = 5;
      }
      xStyles.borderColor = theme.menuText;
    }

    setBtnStyles(xStyles);
  }, [menuItem]);

  useEffect(() => {
    const menuItem = menuItems.find((x) => x.isSelected);
    if (menuItem) setMenuItem(menuItem);
  }, [menuItems]);

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
      color: theme.menuText,
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
      {menuItems.map((menu, idxKey) => (
        <TouchableOpacity
          key={menu.name || idxKey}
          style={[
            styles.bottomBarButton,
            menu.name === menuItem.name && btnStyles,
            floatingBtnStyles(menu),
          ]}
          onPress={() => handlePress(menu)}
        >
          <MasterIcon
            iconFamily={menu.iconFamily}
            iconName={menu.iconName}
            iconSize={iconSize}
            iconColor={iconsColor}
          />
          {menu.label && !menu.floatingBtn && (
            <Text style={styles.floatingBarLabel}>{menu.label}</Text>
          )}
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default BottomMenu;
