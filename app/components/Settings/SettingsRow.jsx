import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import { Entypo, FontAwesome } from '@expo/vector-icons';
import Colors from '@/utils/Colors';
import Sizes from '@/utils/Sizes';
import MasterStyles from '@/utils/MasterStyles';
import { useRouter } from 'expo-router';

const SettingsRow = (props) => {
  const {
    rowTitle,
    startIcon = 'group',
    endIcon = 'chevron-right',
    routePath = '/screens/home', //Change it later to a default page
  } = props;

  const router = useRouter();

  return (
    <TouchableOpacity
      onPress={() => router.navigate(routePath)}
      style={styles.settingsRow}
    >
      <View style={styles.titleView}>
        <FontAwesome name={startIcon} size={16} color='black' />
        <Text>{rowTitle}</Text>
      </View>
      <Entypo name={endIcon} size={16} color='black' />
    </TouchableOpacity>
  );
};

export default SettingsRow;

const styles = StyleSheet.create({
  settingsRow: {
    flexDirection: 'row',
    backgroundColor: Colors.$white,
    borderRadius: Sizes.$ieRegularRadius,
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Sizes.$ieExtraPadding,
    ...MasterStyles.commonShadow,
  },
  titleView: {
    flexDirection: 'row',
    gap: Sizes.$ieExtraMargin,
    alignItems: 'center',
  },
});
