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
      ...mStyles.commonShadow,
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
      backgroundColor: theme.primary,
    },
    secondary: {
      backgroundColor: theme.secondary,
    },
    success: {
      backgroundColor: theme.success,
    },
    danger: {
      backgroundColor: theme.danger,
    },
    warning: {
      backgroundColor: theme.warning,
    },
    info: {
      backgroundColor: theme.info,
    },
    light: {
      backgroundColor: theme.light,
    },
    dark: {
      backgroundColor: theme.black,
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
