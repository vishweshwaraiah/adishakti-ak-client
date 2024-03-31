import React from 'react';
import { StyleSheet, View } from 'react-native';
import AuthTemplate from '@/wrappers/AuthTemplate';
import AddGroup from '@/components/Settings/AddGroup';
import Sizes from '@/utils/Sizes';
import MasterStyles from '@/utils/MasterStyles';
import DeleteGroups from '@/components/Settings/DeleteGroups';

const GroupsScreen = () => {
  const rightHeaderNode = <AddGroup />;
  return (
    <AuthTemplate screenName='Manage Groups' rightHeader={rightHeaderNode}>
      <View style={styles.optionBox}>
        <DeleteGroups />
      </View>
    </AuthTemplate>
  );
};

const styles = StyleSheet.create({
  optionBox: {
    flex: 1,
    flexDirection: 'row',
    padding: Sizes.$ieExtraPadding,
    width: '95%',
    alignSelf: 'center',
    ...MasterStyles.commonShadow,
  },
});

export default GroupsScreen;
