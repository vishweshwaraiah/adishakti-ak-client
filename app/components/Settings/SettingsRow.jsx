import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import { Ionicons, Entypo, FontAwesome, AntDesign } from '@expo/vector-icons';
import Colors from '@/utils/Colors';
import Sizes from '@/utils/Sizes';
import MasterStyles from '@/utils/MasterStyles';
import { useRouter } from 'expo-router';
import { trimmedText } from '@/utils/Globals';

const SettingsRow = (props) => {
  const {
    rowTitle,
    subTitle,
    startIcon,
    endIcon = 'chevron-right',
    iconFamily,
    routePath = null,
    onRowPress = () => {},
  } = props;

  const router = useRouter();

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
      default:
        return <FontAwesome name={startIcon} size={24} color='black' />;
    }
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.settingsRow}>
      <View style={styles.titleView}>
        {startIcon && getIcon()}
        <View style={styles.titleTextBox}>
          <Text style={styles.rowTitle}>{trimmedText(rowTitle, 20)}</Text>
          <Text style={styles.subTitle}>{subTitle}</Text>
        </View>
      </View>
      <View style={styles.rightIcon}>
        <Entypo name={endIcon} size={24} color='black' />
      </View>
    </TouchableOpacity>
  );
};

export default SettingsRow;

const styles = StyleSheet.create({
  settingsRow: {
    width: '100%',
    flexDirection: 'row',
    backgroundColor: Colors.$white,
    borderRadius: Sizes.$ieRegularRadius,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Sizes.$ieExtraPadding,
    ...MasterStyles.commonShadow,
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
    color: Colors.$black,
    flexWrap: 'nowrap',
  },
  subTitle: {
    fontSize: Sizes.$ieSmallFont,
    color: Colors.$gray,
  },
  rightIcon: {
    position: 'absolute',
    right: Sizes.$ieLargeMargin,
  },
});
