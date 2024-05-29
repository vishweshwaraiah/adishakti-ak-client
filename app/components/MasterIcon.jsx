import { View } from 'react-native';
import React from 'react';
import {
  Entypo,
  Feather,
  Ionicons,
  AntDesign,
  FontAwesome,
} from '@expo/vector-icons';

const MasterIcon = (props) => {
  const {
    iconFamily = 'FontAwesome',
    iconName = 'plus',
    iconSize = 24,
    iconColor = '#ffffff',
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
      default:
        iconElement = (
          <FontAwesome name={iconName} size={iconSize} color={iconColor} />
        );
        break;
    }

    return iconElement;
  };

  return <View>{getIcon()}</View>;
};

export default MasterIcon;
