import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
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

  const [menuStatus, setMenuStatus] = useState(false);

  const mStyles = useMasterStyle();

  const toggleMenu = (menu) => {
    setMenuStatus(!menuStatus);
    if (menu?.name && !menu.isTrigger) {
      navigation.navigate(menu.name);
      onPress();
    }
  };

  const styles = StyleSheet.create({
    backDrop: {
      position: 'absolute',
      backgroundColor: theme.backDropBg,
      width: '100%',
      height: '100%',
      zIndex: 200,
    },
    floatingBarStyle: {
      position: 'absolute',
      bottom: 50,
      right: 50,
      zIndex: 201,
      ...mStyles.commonShadow,
    },
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
      zIndex: 202,
      ...mStyles.navShadow,
    },
  });

  const containerStyles = () => {
    const xStyles = {
      position: 'absolute',
      bottom: 0,
      right: 0,
      zIndex: 201,
    };

    if (menuStatus) {
      xStyles.width = '100%';
      xStyles.height = '100%';
    } else {
      xStyles.width = 0;
      xStyles.height = 0;
    }

    return xStyles;
  };

  return (
    <>
      {menuType === 'floating' ? (
        <View style={containerStyles()}>
          {menuStatus && (
            <TouchableOpacity
              onPress={() => toggleMenu()}
              style={styles.backDrop}
            ></TouchableOpacity>
          )}
          <View style={styles.floatingBarStyle}>
            {menuItems.map((menu, idx) => (
              <FloatingMenu
                menuItem={menu}
                idxKey={idx}
                key={idx}
                menuStatus={menuStatus}
                toggleMenu={toggleMenu}
                iconsColor={iconsColor}
              />
            ))}
          </View>
        </View>
      ) : (
        <View style={styles.bottomContainer}>
          {menuItems.map(
            (menu, idx) =>
              !menu.isTrigger && (
                <BottomMenu
                  menuItem={menu}
                  idxKey={idx}
                  key={idx}
                  toggleMenu={toggleMenu}
                  iconsColor={iconsColor}
                />
              )
          )}
        </View>
      )}
    </>
  );
};

export default MasterMenu;
