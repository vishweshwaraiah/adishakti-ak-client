import React from 'react';
import { StyleSheet, TouchableOpacity, View, Platform } from 'react-native';
import { Tabs } from 'expo-router';
import {
  Entypo,
  Feather,
  Ionicons,
  AntDesign,
  FontAwesome,
} from '@expo/vector-icons';
import useMasterStyle from '@/utils/useMasterStyle';
import Sizes from '@/utils/Sizes';
import { useTheme } from '@/themes/ThemeProvider';

const BottomMenu = (props) => {
  const {
    menuItems = [],
    headerShown = false,
    floatingBtnBg,
    themeColor,
    iconsColor,
  } = props;

  const { theme } = useTheme();
  const mStyles = useMasterStyle();

  const CustomTabBarButton = (props) => {
    const { children, onPress } = props;

    return (
      <TouchableOpacity style={styles.customTabBarButton} onPress={onPress}>
        <View style={styles.buttonView}>{children}</View>
      </TouchableOpacity>
    );
  };

  const CustomTabBarIcon = (event, options) => {
    const { focused } = event;
    let { iconFamily, iconName } = options;
    let iconSize = 24;
    let iconElement;
    let iconColor = iconsColor || theme.white;

    if (focused) {
      iconColor = theme.midblue;
      iconSize = 32;
    }

    switch (iconFamily) {
      case 'Ionicons':
        iconElement = (
          <Ionicons name={iconName} size={iconSize} color={iconColor} />
        );
        break;
      case 'Entypo':
        iconElement = (
          <Entypo name={iconName} size={iconSize} color={iconColor} />
        );
        break;
      case 'AntDesign':
        iconElement = (
          <AntDesign name={iconName} size={iconSize} color={iconColor} />
        );
        break;
      case 'Feather':
        iconElement = (
          <Feather name={iconName} size={iconSize} color={iconColor} />
        );
        break;
      default:
        iconElement = (
          <FontAwesome name={iconName} size={iconSize} color={iconColor} />
        );
        break;
    }

    return <View>{iconElement}</View>;
  };

  const styles = StyleSheet.create({
    tabBarStyle: {
      position: 'absolute',
      bottom: Sizes.$ieMenuBottomSpace,
      backgroundColor: themeColor || theme.navBackground,
      borderRadius: Sizes.$ieRegularRadius * 2,
      width: '90%',
      left: '5%',
      right: '5%',
      height: Sizes.$navDimension,
      maxHeight: Sizes.$ieMenuMaxHeight,
      ...mStyles.navShadow,
    },
    tabItemStyle: {
      top: Platform.OS === 'ios' ? 20 : 10,
      position: 'relative',
    },
    tabBarLabelStyle: {
      display: 'flex',
      justifyContent: 'center',
    },
    customTabBarButton: {
      top: -15,
      alignItems: 'center',
      justifyContent: 'center',
      ...mStyles.navShadow,
    },
    buttonView: {
      width: Sizes.$btnDimension,
      height: Sizes.$btnDimension,
      borderRadius: 35,
      backgroundColor: floatingBtnBg || theme.activeBar,
      paddingTop: Sizes.$ieRegularPadding,
    },
  });

  return (
    <Tabs backBehavior='none'>
      {menuItems?.map((menu) => {
        const options = {
          tabBarLabel: menu.floatingBtn ? '' : menu.label,
          title: menu.label,
          headerShown: headerShown,
          tabBarLabelStyle: styles.tabBarLabelStyle,
          tabBarStyle: styles.tabBarStyle,
          tabBarItemStyle: styles.tabItemStyle,
          tabBarIcon: (e) => CustomTabBarIcon(e, menu),
        };

        if (menu.isTrigger) {
          options.href = null;
        }

        if (menu.floatingBtn) {
          options.tabBarButton = (props) => <CustomTabBarButton {...props} />;
        }

        return (
          <Tabs.Screen key={menu.name} name={menu.name} options={options} />
        );
      })}
    </Tabs>
  );
};

export default BottomMenu;
