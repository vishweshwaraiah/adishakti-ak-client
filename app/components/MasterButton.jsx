import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import Sizes from '@/utils/Sizes';
import useMasterStyle from '@/utils/useMasterStyle';
import { useTheme } from '@/themes/ThemeProvider';

const MasterButton = (props) => {
  const {
    children,
    onPress,
    title = '',
    marginTop,
    variant = 'primary',
    textColor,
    userStyle = {},
    width = 'auto',
    shape = 'round',
    height = 'regular',
  } = props;

  const { theme } = useTheme();
  const mStyles = useMasterStyle();

  const customStyles = () => {
    const defStyle = {};

    if (width) defStyle.width = width;

    if (marginTop) defStyle.marginTop = marginTop;

    if (shape === 'square') {
      defStyle.borderRadius = 0;
    } else if (shape === 'circle') {
      defStyle.borderRadius = 35;
    } else {
      defStyle.borderRadius = 10;
    }

    if (height === 'large') {
      defStyle.height = Sizes.$ieLargeHeight;
    } else if (height === 'xlarge') {
      defStyle.height = Sizes.$ieXLargeHeight;
    } else {
      defStyle.height = Sizes.$ieRegularHeight;
    }

    switch (variant) {
      case 'trans':
        defStyle.backgroundColor = 'transparent';
        defStyle.borderColor = theme.itemColor;
        break;
      case 'primary':
        defStyle.backgroundColor = theme.primary;
        defStyle.borderColor = theme.primary;
        break;
      case 'secondary':
        defStyle.backgroundColor = theme.secondary;
        defStyle.borderColor = theme.secondary;
        break;
      case 'success':
        defStyle.backgroundColor = theme.success;
        defStyle.borderColor = theme.success;
        break;
      case 'danger':
        defStyle.backgroundColor = theme.danger;
        defStyle.borderColor = theme.danger;
        break;
      case 'warning':
        defStyle.backgroundColor = theme.warning;
        defStyle.borderColor = theme.warning;
        break;
      case 'info':
        defStyle.backgroundColor = theme.info;
        defStyle.borderColor = theme.info;
        break;
      case 'light':
        defStyle.backgroundColor = theme.light;
        defStyle.borderColor = theme.light;
        break;
      case 'black':
        defStyle.backgroundColor = theme.black;
        defStyle.borderColor = theme.black;
        break;
      default:
        defStyle.backgroundColor = variant;
        defStyle.borderColor = 'transparent';
        break;
    }

    return defStyle;
  };

  const styles = StyleSheet.create({
    button: {
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'center',
      paddingHorizontal: Sizes.$ieExtraPadding,
      height: Sizes.$ieRegularHeight,
      maxHeight: Sizes.$btnDimension,
      minWidth: Sizes.$btnDimension,
      borderWidth: 1,
      elevation: 3,
      ...mStyles.commonShadow,
    },
    text: {
      fontSize: Sizes.$ieRegularFont,
      lineHeight: 21,
      fontWeight: 'bold',
      letterSpacing: 0.25,
      color: textColor,
    },
  });

  return (
    <TouchableOpacity
      style={[styles.button, userStyle, customStyles()]}
      onPress={onPress}
    >
      {title && <Text style={styles.text}>{title}</Text>}
      {children}
    </TouchableOpacity>
  );
};

export default MasterButton;
