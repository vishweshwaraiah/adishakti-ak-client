import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import {
  Ionicons,
  Entypo,
  FontAwesome,
  AntDesign,
  Feather,
} from '@expo/vector-icons';
import useMasterStyle from '@/utils/useMasterStyle';
import { useRouter } from 'expo-router';
import { trimmedText } from '@/utils/Globals';
import Sizes from '@/utils/Sizes';
import { useTheme } from '@/themes/ThemeProvider';

const SettingsRow = (props) => {
  const {
    rowTitle,
    subTitle,
    titleFirst = true,
    startIcon,
    endIcon = 'chevron-right',
    iconFamily,
    routePath = null,
    onRowPress = () => {},
    brType = '',
  } = props;

  const router = useRouter();

  const { theme } = useTheme();
  const mStyles = useMasterStyle();

  const [radiusStyle, setRadiusStyle] = useState({});

  useEffect(() => {
    switch (brType) {
      case 'top-side':
        setRadiusStyle({
          borderTopLeftRadius: Sizes.$ieRegularRadius,
          borderTopRightRadius: Sizes.$ieRegularRadius,
        });
        break;
      case 'bottom-side':
        setRadiusStyle({
          borderBottomLeftRadius: Sizes.$ieRegularRadius,
          borderBottomRightRadius: Sizes.$ieRegularRadius,
        });
        break;
      case 'left-side':
        setRadiusStyle({
          borderTopLeftRadius: Sizes.$ieRegularRadius,
          borderBottomLeftRadius: Sizes.$ieRegularRadius,
        });
        break;
      case 'right-side':
        setRadiusStyle({
          borderTopRightRadius: Sizes.$ieRegularRadius,
          borderBottomRightRadius: Sizes.$ieRegularRadius,
        });
        break;
      case 'all-side':
        setRadiusStyle({
          borderRadius: Sizes.$ieRegularRadius,
        });
        break;
      default:
        setRadiusStyle({
          borderRadius: 0,
        });
        break;
    }
  }, [brType]);

  const handlePress = () => {
    if (routePath) {
      router.navigate(routePath);
    } else {
      onRowPress();
    }
  };

  const getIcon = () => {
    switch (iconFamily) {
      case 'Ionicons':
        return <Ionicons name={startIcon} size={24} color='black' />;
      case 'Entypo':
        return <Entypo name={startIcon} size={24} color='black' />;
      case 'AntDesign':
        return <AntDesign name={startIcon} size={24} color='black' />;
      case 'Feather':
        return <Feather name={startIcon} size={24} color='black' />;
      default:
        return <FontAwesome name={startIcon} size={24} color='black' />;
    }
  };

  const styles = StyleSheet.create({
    settingsRow: {
      width: '100%',
      flexDirection: 'row',
      backgroundColor: theme.white,
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: Sizes.$ieExtraPadding,
      ...radiusStyle,
      ...mStyles.commonShadow,
    },
    titleView: {
      flexDirection: 'row',
      gap: Sizes.$ieLargeMargin,
      alignItems: 'center',
    },
    titleTextBox: {
      width: '90%',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'flex-start',
      gap: 5,
    },
    rowTitle: {
      fontSize: Sizes.$ieRegularFont,
      color: theme.black,
      flexWrap: 'nowrap',
    },
    subTitle: {
      fontSize: Sizes.$ieSmallFont,
      color: theme.gray,
    },
    rightIcon: {
      position: 'absolute',
      right: Sizes.$ieLargeMargin,
    },
  });

  return (
    <TouchableOpacity onPress={handlePress} style={styles.settingsRow}>
      <View style={styles.titleView}>
        {startIcon && getIcon()}
        <View style={styles.titleTextBox}>
          {subTitle && !titleFirst && (
            <Text style={styles.subTitle}>{subTitle}</Text>
          )}
          {rowTitle && (
            <Text style={styles.rowTitle}>{trimmedText(rowTitle, 20)}</Text>
          )}
          {subTitle && titleFirst && (
            <Text style={styles.subTitle}>{subTitle}</Text>
          )}
        </View>
      </View>
      <View style={styles.rightIcon}>
        <Entypo name={endIcon} size={24} color='black' />
      </View>
    </TouchableOpacity>
  );
};

export default SettingsRow;
