import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { router, useLocalSearchParams } from 'expo-router';
import AuthTemplate from '@/wrappers/AuthTemplate';
import ContactItem from '@/components/Contacts/ContactItem';
import MasterButton from '@/components/MasterButton';
import MasterIcon from '@/components/MasterIcon';
import { useTheme } from '@/themes/ThemeProvider';
import Sizes from '@/utils/Sizes';

const ViewScreen = () => {
  const { status, groupsList, message } = useSelector(
    (state) => state.groupsSlice
  );

  const params = useLocalSearchParams();
  const { groupId } = params;

  const { theme } = useTheme();

  const [numbersList, setNumbersList] = useState([]);
  const [groupName, setGroupName] = useState('');

  const updateGroup = () => {
    router.push({
      pathname: 'screens/groups/ActionScreen',
      params: { groupId: groupId, action: 'update' },
    });
  };

  useEffect(() => {
    if (groupId && groupsList?.length) {
      const getGroup = groupsList.find((x) => x._id === groupId);
      setNumbersList(getGroup.nums_group);
      setGroupName(getGroup.group_name);
    } else {
      console.log('Group ID should be passed!');
    }
  }, [groupId]);

  const styles = StyleSheet.create({
    groupList: {
      flex: 1,
      width: '100%',
      padding: Sizes.$ieRegularPadding,
      borderBottomWidth: 1,
    },
    groupActions: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'flex-end',
      gap: 20,
      marginTop: Sizes.$ieLargeMargin,
    },
    floatingBtn: {
      position: 'absolute',
      bottom: 50,
      right: 20,
    },
  });

  const keyExtractor = (i, idx) => {
    return i?.id?.toString() || idx.toString();
  };

  const RenderItem = ({ item }) => {
    if (item?.phoneNumber) {
      return <ContactItem noActions={true} contact={item} />;
    }
  };

  return (
    <AuthTemplate screenName={groupName}>
      <View style={styles.groupList}>
        <FlatList
          data={numbersList}
          renderItem={RenderItem}
          keyExtractor={keyExtractor}
        />
      </View>
      <View style={styles.groupActions}>
        <Text>Total {numbersList.length} Contacts</Text>
        <MasterButton
          onPress={updateGroup}
          textColor={theme.itemColor}
          userStyle={styles.floatingBtn}
          variant={theme.transblack}
          shape='circle'
        >
          <MasterIcon
            iconFamily='MaterialIcons'
            iconName='edit-note'
            iconColor={theme.itemColor}
            iconSize={32}
          />
        </MasterButton>
      </View>
    </AuthTemplate>
  );
};

export default ViewScreen;
