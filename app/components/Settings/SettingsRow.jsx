import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import useMasterStyle from '@/utils/useMasterStyle';
import { useRouter } from 'expo-router';
import { trimmedText } from '@/utils/Globals';
import Sizes from '@/utils/Sizes';
import { useTheme } from '@/themes/ThemeProvider';
import MasterIcon from '@/components/MasterIcon';

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

  const styles = StyleSheet.create({
    settingsRow: {
      width: '100%',
      flexDirection: 'row',
      backgroundColor: theme.rowBgColor,
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
      color: theme.rowTxtColor,
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
        {startIcon && (
          <MasterIcon
            iconFamily={iconFamily}
            iconName={startIcon}
            iconSize={Sizes.$startIconSize}
            iconColor={theme.rowTxtColor}
          />
        )}
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
        <MasterIcon
          iconFamily={'Entypo'}
          iconName={endIcon}
          iconSize={Sizes.$startIconSize}
          iconColor={theme.rowTxtColor}
        />
      </View>
    </TouchableOpacity>
  );
};

export default SettingsRow;
