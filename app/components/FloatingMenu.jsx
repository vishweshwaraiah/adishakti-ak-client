import React, { useState } from 'react';
import { StyleSheet, View, Dimensions, TouchableOpacity } from 'react-native';
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

const screenWidth = Dimensions.get('window').width;

const FloatingMenu = (props) => {
  const { menuItems = [], headerShown = false, themeColor, iconsColor } = props;

  const { theme } = useTheme();
  const mStyles = useMasterStyle();

  const [menuStatus, setMenuStatus] = useState(false);

  const toggleMenu = () => {
    setMenuStatus(!menuStatus);
  };

  const CustomTabBarButton = (props) => {
    const { children, onPress, idx, menu } = props;
    const handlePress = () => {
      toggleMenu();
      if (menu.isTrigger) {
        return false;
      } else {
        onPress();
      }
    };

    const extraStyles = () => {
      const xStyles = {
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        bottom: idx * 80,
      };

      if (!menu.isTrigger && !menuStatus) {
        xStyles.display = 'none';
      } else {
        xStyles.display = 'flex';
      }

      return xStyles;
    };

    const btnStyles = () => {
      const xStyles = {
        borderRadius: Sizes.$ieMaxRadius,
        backgroundColor: themeColor,
        width: Sizes.$btnDimension,
        height: Sizes.$btnDimension,
      };

      if (!menu.isTrigger) {
        xStyles.width = Sizes.$btnDimension - 10;
        xStyles.height = Sizes.$btnDimension - 10;
      }

      return xStyles;
    };

    return (
      <TouchableOpacity style={extraStyles()} onPress={handlePress}>
        <View style={btnStyles()}>{children}</View>
      </TouchableOpacity>
    );
  };

  const CustomTabBarIcon = (event, options) => {
    const { focused } = event;
    let { iconFamily, iconName } = options;
    let iconSize = 16;
    let iconElement;
    let iconColor = iconsColor;

    if (focused) {
      iconSize = 24;
      iconColor = theme.selected;
    }

    if (options.isTrigger) iconSize = 32;

    const btnStyles = () => {
      let xStyles = {
        transform: [{ rotate: '0deg' }],
      };

      if (options.isTrigger && menuStatus) {
        xStyles.transform = [{ rotate: '45deg' }];
      }

      return xStyles;
    };

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

    return <View style={btnStyles()}>{iconElement}</View>;
  };

  const styles = StyleSheet.create({
    tabBarStyle: {
      flex: 1,
      backgroundColor: 'transparent',
      position: 'absolute',
      left: screenWidth - 50,
      right: 50,
      bottom: '5%',
      ...mStyles.commonShadow,
    },
    triggerBtn: {
      position: 'absolute',
    },
    tabBarLabelStyle: {
      position: 'absolute',
      left: '-100%',
      bottom: '25%',
      color: 'white',
      backgroundColor: themeColor,
      padding: 5,
      borderRadius: 5,
      overflow: 'hidden',
    },
  });

  return (
    <Tabs backBehavior='none'>
      {menuItems?.map((menu, idx) => {
        const options = {
          tabBarLabel: menu.label,
          title: menu.label,
          headerShown: headerShown,
          tabBarStyle: styles.tabBarStyle,
          tabBarLabelStyle: menu.isTrigger
            ? styles.triggerBtn
            : styles.tabBarLabelStyle,
          tabBarIcon: (e) => CustomTabBarIcon(e, menu),
          tabBarButton: (props) => (
            <CustomTabBarButton {...props} idx={idx} menu={menu} />
          ),
        };

        return (
          <Tabs.Screen key={menu.name} name={menu.name} options={options} />
        );
      })}
    </Tabs>
  );
};

export default FloatingMenu;
