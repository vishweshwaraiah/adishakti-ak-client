import React, { useCallback, useEffect, useRef, useState } from 'react';
import { StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { updateNumsGroups, resetStatus } from '@/redux/slice/numsGroups';
import { useTheme } from '@/themes/ThemeProvider';
import GroupUpdater from '@/components/ContactGroups/GroupUpdater';
import BottomSheet from '@/components/Modals/BottomSheet';
import AlertModal from '@/components/Modals/AlertModal';
import MasterButton from '@/components/MasterButton';
import MasterIcon from '@/components/MasterIcon';
import Sizes from '@/utils/Sizes';

const UpdateGroup = (props) => {
  const { groupId = '' } = props;
  const btmSheetRef = useRef(null);

  const dispatch = useDispatch();
  const { status, groupsList, message } = useSelector(
    (state) => state.groupsSlice
  );
  const { theme } = useTheme();

  const [afterAction, setAfterAction] = useState('loading');
  const [statusIcon, setStatusIcon] = useState('');
  const [modalStatus, setModalStatus] = useState('close');
  const [lastGroupList, setLastGroupList] = useState([]);
  const [lastGroupName, setLastGroupName] = useState('');

  const handleClose = () => {
    setAfterAction('');
    dispatch(resetStatus());
    setModalStatus('close');
    btmSheetRef?.current?.scrollTo('0%');
  };

  const toggleBtmSheet = useCallback(() => {
    const isActive = btmSheetRef?.current?.isActive();
    if (isActive) {
      btmSheetRef?.current?.scrollTo('0%');
    } else {
      btmSheetRef?.current?.scrollTo('100%');
    }
  }, []);

  const handleSubmit = (groupName, contactNums) => {
    if (contactNums?.length && groupName) {
      const groupData = {
        groupName: groupName,
        numberList: contactNums,
      };

      if (groupId) {
        groupData.groupId = groupId;
        dispatch(updateNumsGroups(groupData));
      }
    }
  };

  useEffect(() => {
    if (status === 'updating') {
      setModalStatus('open');
      setAfterAction('done');
      setStatusIcon('information-circle');
    } else if (status === 'updated') {
      setModalStatus('open');
      setAfterAction('done');
      setStatusIcon('checkmark-circle');
    } else if (status === 'error') {
      setModalStatus('open');
      setAfterAction('error');
      setStatusIcon('warning');
    }
  }, [status]);

  useEffect(() => {
    if (groupId && groupsList?.length) {
      const getGroup = groupsList.find((x) => x._id === groupId);
      setLastGroupList(getGroup.nums_group);
      setLastGroupName(getGroup.group_name);
    } else {
      setLastGroupList([]);
      setLastGroupName('');
    }
  }, [groupId, groupsList]);

  const styles = StyleSheet.create({
    floatingBtn: {
      position: 'absolute',
      bottom: Sizes.$floatingBtn,
      right: Sizes.$ieActionBtn,
    },
  });

  return (
    <>
      <MasterButton
        onPress={toggleBtmSheet}
        userStyle={styles.floatingBtn}
        variant={theme.itemBg}
        shape='circle'
      >
        <MasterIcon
          iconFamily='MaterialIcons'
          iconName='edit-note'
          iconColor={theme.itemColor}
        />
      </MasterButton>
      <BottomSheet ref={btmSheetRef} dragClose={true}>
        <AlertModal
          onClose={handleClose}
          modalStatus={modalStatus}
          statusMessage={message}
          alertIcon={statusIcon}
          iconFamily='Ionicons'
          afterAction={afterAction}
          isClosable={false}
        />
        <GroupUpdater
          onSubmit={handleSubmit}
          lastGroupList={lastGroupList}
          lastGroupName={lastGroupName}
        />
      </BottomSheet>
    </>
  );
};

export default UpdateGroup;
