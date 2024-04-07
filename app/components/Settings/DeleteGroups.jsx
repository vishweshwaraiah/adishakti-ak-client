import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNumsGroups, deleteNumsGroup } from '@/redux/slice/numsGroups';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/utils/Colors';
import Sizes from '@/utils/Sizes';
import MasterError from '@/components/MasterError';
import AlertModal from '@/components/Modals/AlertModal';

const DeleteGroups = () => {
  const dispatch = useDispatch();
  const { groupsList, isDeleted, status, message } = useSelector(
    (state) => state.groupsSlice
  );

  const [modalStatus, setModalStatus] = useState('close');
  const [deleteItem, setDeleteItem] = useState(undefined);
  const [statusMessage, setStatusMessage] = useState('');
  const [afterAction, setAfterAction] = useState('initial');

  useEffect(() => {
    if (isDeleted) {
      setStatusMessage('Successfully Deleted!');
      setDeleteItem(undefined);
    }
  }, [isDeleted]);

  useEffect(() => {
    if (deleteItem) {
      const groupName = deleteItem.group_name;
      setStatusMessage(`Would you like to delete the group ${groupName}?`);
    }
  }, [deleteItem]);

  useEffect(() => {
    dispatch(fetchNumsGroups());
  }, []);

  const deleteGroup = () => {
    if (deleteItem) {
      dispatch(deleteNumsGroup(deleteItem));
      setAfterAction('done');
    } else {
      setStatusMessage('Looks like you already deleted the group!');
    }
  };

  const deleteHandler = (item) => {
    setModalStatus('open');
    setDeleteItem(item);
    return;
  };

  const handleCancel = () => {
    setModalStatus('close');
    setAfterAction('initial');
  };

  const renderItem = ({ item }) => (
    <View style={styles.rowStyle}>
      <Text style={styles.groupItemText}>{item.group_name}</Text>
      <TouchableOpacity onPress={() => deleteHandler(item)}>
        <Ionicons name='trash' size={24} color='white' />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.utilsBox}>
      {status === 'error' && (
        <MasterError
          timeout={10}
          errorMsg={message}
          marginBottom={10}
          textAlign='center'
        />
      )}
      {groupsList.length ? (
        <FlatList
          data={groupsList}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
        />
      ) : (
        <Text style={{ textAlign: 'center' }}>
          No groups found! Please add from top right button.
        </Text>
      )}

      <AlertModal
        onCancel={handleCancel}
        onSubmit={deleteGroup}
        modalStatus={modalStatus}
        statusMessage={statusMessage}
        onClose={handleCancel}
        alertIcon='trash'
        afterAction={afterAction}
      />
    </View>
  );
};

export default DeleteGroups;

const styles = StyleSheet.create({
  utilsBox: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rowStyle: {
    width: '100%',
    alignSelf: 'center',
    backgroundColor: Colors.$black,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    overflow: 'hidden',
    borderBottomWidth: 1,
    borderBottomColor: Colors.$white,
    height: Sizes.$ieRegularHeight,
    paddingHorizontal: Sizes.$ieExtraPadding,
  },
  groupItemText: {
    color: Colors.$white,
  },
});
