import React, { useCallback, useEffect, useRef, useState } from 'react';
import { StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addNumsGroups, resetStatus } from '@/redux/slice/numsGroups';
import { useTheme } from '@/themes/ThemeProvider';
import GroupUpdater from '@/components/ContactGroups/GroupUpdater';
import AlertModal from '@/components/Modals/AlertModal';
import Sizes from '@/utils/Sizes';
import MasterIcon from '@/components/MasterIcon';
import BottomSheet from '@/components/Modals/BottomSheet';
import MasterButton from '@/components/MasterButton';

const AddNewGroup = () => {
  const btmSheetRef = useRef(null);

  const dispatch = useDispatch();
  const { status, message } = useSelector((state) => state.groupsSlice);
  const { theme } = useTheme();

  const [afterAction, setAfterAction] = useState('loading');
  const [statusIcon, setStatusIcon] = useState('');
  const [modalStatus, setModalStatus] = useState('close');

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

      dispatch(addNumsGroups(groupData));
    }
  };

  useEffect(() => {
    if (status === 'creating') {
      setModalStatus('open');
      setAfterAction('done');
      setStatusIcon('information-circle');
    } else if (status === 'created') {
      setModalStatus('open');
      setAfterAction('done');
      setStatusIcon('checkmark-circle');
    } else if (status === 'error') {
      setModalStatus('open');
      setAfterAction('error');
      setStatusIcon('warning');
    }
  }, [status]);

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
          iconFamily='Feather'
          iconName='plus'
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
        <GroupUpdater onSubmit={handleSubmit} />
      </BottomSheet>
    </>
  );
};

export default AddNewGroup;
