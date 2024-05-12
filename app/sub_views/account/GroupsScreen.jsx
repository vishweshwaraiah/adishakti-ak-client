import React from 'react';
import { StyleSheet, View } from 'react-native';
import AuthTemplate from '@/wrappers/AuthTemplate';
import AddGroup from '@/components/Settings/AddGroup';
import Sizes from '@/utils/Sizes';
import useMasterStyle from '@/utils/useMasterStyle';
import DeleteGroups from '@/components/Settings/DeleteGroups';

const GroupsScreen = () => {
  const mStyles = useMasterStyle();

  const rightHeaderNode = <AddGroup />;

  const styles = StyleSheet.create({
    optionBox: {
      flex: 1,
      flexDirection: 'row',
      padding: Sizes.$ieExtraPadding,
      width: '95%',
      alignSelf: 'center',
      ...mStyles.commonShadow,
    },
  });

  return (
    <AuthTemplate screenName='Manage Groups' rightHeader={rightHeaderNode}>
      <View style={styles.optionBox}>
        <DeleteGroups />
      </View>
    </AuthTemplate>
  );
};

export default GroupsScreen;
