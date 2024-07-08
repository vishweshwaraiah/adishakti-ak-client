import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { router, useLocalSearchParams } from 'expo-router';
import {
  addNumsGroups,
  updateNumsGroups,
  resetStatus,
} from '@/redux/slice/numsGroups';
import { useTheme } from '@/themes/ThemeProvider';
import AuthTemplate from '@/wrappers/AuthTemplate';
import GroupUpdater from '@/components/ContactGroups/GroupUpdater';
import AlertModal from '@/components/Modals/AlertModal';
import Sizes from '@/utils/Sizes';

const ActionScreen = () => {
  const dispatch = useDispatch();
  const { status, groupsList, message } = useSelector(
    (state) => state.groupsSlice
  );

  const params = useLocalSearchParams();
  const { groupId, action } = params;

  const theme = useTheme();

  const [afterAction, setAfterAction] = useState('loading');
  const [statusIcon, setStatusIcon] = useState('warning');
  const [modalStatus, setModalStatus] = useState('close');
  const [lastGroupList, setLastGroupList] = useState([]);
  const [lastGroupName, setLastGroupName] = useState('');

  const handleClose = () => {
    setAfterAction('');
    dispatch(resetStatus());
    if (router.canGoBack()) {
      router.back();
    } else {
      router.push('screens/groups/ListScreen');
    }
  };

  const handleSubmit = (groupName, contactNums) => {
    if (contactNums?.length && groupName) {
      const groupData = {
        groupName: groupName,
        numberList: contactNums,
      };

      if (groupId && action === 'update') {
        groupData.groupId = groupId;
        dispatch(updateNumsGroups(groupData));
      } else {
        dispatch(addNumsGroups(groupData));
      }
    }
  };

  useEffect(() => {
    if (status === 'creating' || status === 'updating') {
      setModalStatus('open');
      setAfterAction('done');
      setStatusIcon('warning');
    }

    if (status === 'created' || status === 'updated') {
      setModalStatus('open');
      setAfterAction('done');
      setStatusIcon('checkmark-circle');
    }

    if (status === 'error') {
      setModalStatus('open');
      setAfterAction('error');
      setStatusIcon('warning');
    }

    dispatch(resetStatus());
  }, [status, groupsList]);

  useEffect(() => {
    if (groupId && action === 'update' && groupsList?.length) {
      const getGroup = groupsList.find((x) => x._id === groupId);
      setLastGroupList(getGroup.nums_group);
      setLastGroupName(getGroup.group_name);
    }
  }, [groupId, action]);

  const styles = StyleSheet.create({
    mainBox: {
      flex: 1,
      backgroundColor: theme.itemBg,
    },
    doneView: {
      justifyContent: 'center',
      alignItems: 'center',
      gap: 10,
      paddingTop: Sizes.$ieLargePadding,
    },
    actionText: {
      justifyContent: 'center',
      textAlign: 'center',
      padding: Sizes.$ieExtraPadding,
      marginBottom: Sizes.$ieRegularMargin,
    },
  });

  return (
    <AuthTemplate style={styles.mainBox} screenName='Add a Group'>
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
    </AuthTemplate>
  );
};

export default ActionScreen;
