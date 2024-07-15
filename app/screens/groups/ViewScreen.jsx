import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { useLocalSearchParams } from 'expo-router';
import AuthTemplate from '@/wrappers/AuthTemplate';
import ContactItem from '@/components/Contacts/ContactItem';
import UpdateGroup from '@/components/ContactGroups/UpdateGroup';
import Sizes from '@/utils/Sizes';

const ViewScreen = () => {
  const { groupsList } = useSelector((state) => state.groupsSlice);

  const params = useLocalSearchParams();
  const { groupId } = params;

  const [numbersList, setNumbersList] = useState([]);
  const [groupName, setGroupName] = useState('');

  useEffect(() => {
    if (groupId && groupsList?.length) {
      const getGroup = groupsList.find((x) => x._id === groupId);
      setNumbersList(getGroup.nums_group);
      setGroupName(getGroup.group_name);
    } else {
      console.log('Group ID must be passed!');
    }
  }, [groupId, groupsList]);

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
      marginTop: Sizes.$ieLargeMargin,
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
      </View>
      <UpdateGroup groupId={groupId} action='update' />
    </AuthTemplate>
  );
};

export default ViewScreen;
