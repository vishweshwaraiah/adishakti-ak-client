import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useNavigation } from 'expo-router';
import { useTheme } from '@/themes/ThemeProvider';
import FloatingMenu from '@/components/Navigation/FloatingMenu';
import useMasterStyle from '@/utils/useMasterStyle';
import Sizes from '@/utils/Sizes';
import BottomMenu from './BottomMenu';

const MasterMenu = (props) => {
  const {
    menuItems = [],
    menuType = 'bottom',
    iconsColor = '#ffffff',
    onPress = () => {},
  } = props;

  const navigation = useNavigation();
  const { theme } = useTheme();

  const mStyles = useMasterStyle();

  const toggleMenu = (menu) => {
    if (menu?.name && !menu.isTrigger) {
      navigation.navigate(menu.name);
      onPress();
    }
  };

  const styles = StyleSheet.create({
    bottomContainer: {
      position: 'absolute',
      bottom: Sizes.$ieMenuBottomSpace,
      backgroundColor: theme.navBackground,
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
  });

  return (
    <>
      {menuType === 'floating' ? (
        <FloatingMenu
          menuItems={menuItems}
          toggleMenu={toggleMenu}
          iconsColor={iconsColor}
        />
      ) : (
        <View style={styles.bottomContainer}>
          <BottomMenu
            menuItems={menuItems}
            toggleMenu={toggleMenu}
            iconsColor={iconsColor}
          />
        </View>
      )}
    </>
  );
};

export default MasterMenu;
