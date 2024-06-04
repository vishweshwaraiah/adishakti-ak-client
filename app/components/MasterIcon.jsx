import { StyleSheet, TouchableOpacity, View } from 'react-native';
import React from 'react';
import {
  Entypo,
  Feather,
  Ionicons,
  AntDesign,
  FontAwesome,
  MaterialIcons,
} from '@expo/vector-icons';
import Sizes from '@/utils/Sizes';

const MasterIcon = (props) => {
  const {
    iconFamily = 'FontAwesome',
    iconName = 'plus',
    iconSize = 24,
    iconColor = '#ffffff',
    onPress = () => {},
    isInteractive = false,
    iconBgColor = 'transparent',
    iconBgSize = Sizes.$btnDimension,
  } = props;

  const getIcon = () => {
    let iconElement;

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
      case 'MaterialIcons':
        iconElement = (
          <MaterialIcons name={iconName} size={iconSize} color={iconColor} />
        );
        break;
      default:
        iconElement = (
          <FontAwesome name={iconName} size={iconSize} color={iconColor} />
        );
        break;
    }

    return iconElement;
  };

  const styles = StyleSheet.create({
    isInteractive: {
      height: iconBgSize,
      width: iconBgSize,
      backgroundColor: iconBgColor,
      borderRadius: 35,
      justifyContent: 'center',
      alignItems: 'center',
    },
    nonInteractive: {
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

  return isInteractive ? (
    <TouchableOpacity style={styles.isInteractive} onPress={onPress}>
      {getIcon()}
    </TouchableOpacity>
  ) : (
    <View style={styles.nonInteractive}>{getIcon()}</View>
  );
};

export default MasterIcon;
