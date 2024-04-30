import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import Colors from '@/utils/Colors';
import Sizes from '@/utils/Sizes';
import MasterStyles from '@/utils/MasterStyles';

const MasterButton = (props) => {
  const {
    children,
    onPress,
    title = '',
    marginTop,
    variant = 'primary',
    textColor = Colors.$white,
    width = 'auto',
    shape = 'round',
    height = 'regular',
  } = props;

  const customStyles = () => {
    const defStyle = {};

    if (width) defStyle.width = width;
    if (marginTop) defStyle.marginTop = marginTop;
    defStyle.borderRadius = shape === 'square' ? 0 : 10;
    if (height === 'large') {
      defStyle.height = Sizes.$ieLargeHeight;
    } else if (height === 'xlarge') {
      defStyle.height = Sizes.$ieXLargeHeight;
    } else {
      defStyle.height = Sizes.$ieRegularHeight;
    }

    return defStyle;
  };

  const styles = StyleSheet.create({
    button: {
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'center',
      paddingHorizontal: Sizes.$ieExtraPadding,
      elevation: 3,
      height: Sizes.$ieRegularHeight,
      maxHeight: Sizes.$btnDimension,
      minWidth: Sizes.$btnDimension,
      ...MasterStyles.commonShadow,
    },
    text: {
      fontSize: Sizes.$ieRegularFont,
      lineHeight: 21,
      fontWeight: 'bold',
      letterSpacing: 0.25,
      color: textColor,
    },
    trans: {
      backgroundColor: 'transparent',
    },
    primary: {
      backgroundColor: Colors.$primary,
    },
    secondary: {
      backgroundColor: Colors.$secondary,
    },
    success: {
      backgroundColor: Colors.$success,
    },
    danger: {
      backgroundColor: Colors.$danger,
    },
    warning: {
      backgroundColor: Colors.$warning,
    },
    info: {
      backgroundColor: Colors.$info,
    },
    light: {
      backgroundColor: Colors.$light,
    },
    dark: {
      backgroundColor: Colors.$black,
    },
  });

  return (
    <TouchableOpacity
      style={[styles.button, styles[variant], customStyles()]}
      onPress={onPress}
    >
      {title && <Text style={styles.text}>{title}</Text>}
      {children}
    </TouchableOpacity>
  );
};

export default MasterButton;
