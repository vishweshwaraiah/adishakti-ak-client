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
import MasterModal from '@/components/MasterModal';
import MasterButton from '@/components/MasterButton';

const DeleteGroups = () => {
  const dispatch = useDispatch();
  const { groupsList, isDeleted, isError, message } = useSelector(
    (state) => state.numsGroups
  );

  const [deleteItem, setDeleteItem] = useState(false);
  const [modalOpen, setModalOpen] = useState('');
  const [deleted, setDeleted] = useState(false);

  useEffect(() => {
    if (isDeleted) {
      setDeleted(true);
    }
  }, [isDeleted]);

  useEffect(() => {
    dispatch(fetchNumsGroups());
  }, []);

  const deleteGroup = () => {
    dispatch(deleteNumsGroup(deleteItem));
  };

  const deleteHandler = (item) => {
    setDeleted(false);
    setModalOpen(true);
    setDeleteItem(item);
    return;
  };

  const handleCancel = () => {
    setModalOpen(false);
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
      {isError && (
        <View style={{ marginTop: Sizes.$ieExtraMargin }}>
          <MasterError errorMsg={message} />
        </View>
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

      <MasterModal
        triggerType='icon'
        triggerShape='circle'
        triggerSize='small'
        triggerIcon='trash'
        bodyHeight='30%'
        bodyWidth='70%'
        bgColor={Colors.$modalBodyBg}
        modalToggle={modalOpen}
        onToggle={setModalOpen}
      >
        {deleted ? (
          <View style={styles.bodyContent}>
            <Ionicons name='checkmark-circle' size={72} color='black' />
            <Text>Successfully Deleted!</Text>
          </View>
        ) : (
          <View style={styles.bodyContent}>
            <Ionicons name='trash' size={72} color='black' />
            <Text
              style={{
                justifyContent: 'center',
                textAlign: 'center',
                padding: Sizes.$ieExtraPadding,
              }}
            >
              Would you like to delete the group{' '}
              <Text style={{ fontWeight: 'bold' }}>
                {deleteItem.group_name}
              </Text>{' '}
              ?
            </Text>
            <View style={styles.groupActions}>
              <MasterButton
                onPress={handleCancel}
                title='Cancel'
                variant='light'
              ></MasterButton>
              <MasterButton
                onPress={deleteGroup}
                title='Yes'
                variant='success'
              ></MasterButton>
            </View>
          </View>
        )}
      </MasterModal>
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
  bodyContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  groupActions: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
  },
});
