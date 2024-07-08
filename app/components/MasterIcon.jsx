import { StyleSheet, TouchableOpacity, View } from 'react-native';
import React from 'react';
import {
  Entypo,
  Feather,
  Ionicons,
  AntDesign,
  FontAwesome,
  FontAwesome5,
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
    iconBgShape = 'rounded',
    iconStyles = {},
  } = props;

  const getIcon = () => {
    const IconFamilies = {
      Entypo,
      Feather,
      Ionicons,
      AntDesign,
      FontAwesome,
      FontAwesome5,
      MaterialIcons,
    };

    const Icon = IconFamilies[iconFamily];

    return <Icon name={iconName} size={iconSize} color={iconColor} />;
  };

  const styles = StyleSheet.create({
    isInteractive: {
      height: iconBgSize,
      width: iconBgSize,
      maxHeight: '100%',
      backgroundColor: iconBgColor,
      borderRadius: iconBgShape === 'circle' ? iconBgSize : 10,
      justifyContent: 'center',
      alignItems: 'center',
    },
    nonInteractive: {
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

  return isInteractive ? (
    <TouchableOpacity
      style={[styles.isInteractive, iconStyles]}
      onPress={onPress}
    >
      {getIcon()}
    </TouchableOpacity>
  ) : (
    <View style={[styles.nonInteractive, iconStyles]}>{getIcon()}</View>
  );
};

export default MasterIcon;
