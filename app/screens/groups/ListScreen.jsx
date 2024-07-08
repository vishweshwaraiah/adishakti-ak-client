import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNumsGroups, deleteNumsGroup } from '@/redux/slice/numsGroups';
import { router } from 'expo-router';
import { useTheme } from '@/themes/ThemeProvider';
import useMasterStyle from '@/utils/useMasterStyle';
import AuthTemplate from '@/wrappers/AuthTemplate';
import MasterError from '@/components/MasterError';
import MasterIcon from '@/components/MasterIcon';
import GroupsList from '@/components/ContactGroups/GroupsList';
import AlertModal from '@/components/Modals/AlertModal';
import Sizes from '@/utils/Sizes';

const ListScreen = () => {
  const dispatch = useDispatch();

  const mStyles = useMasterStyle();
  const { theme } = useTheme();

  const { groupsList, isDeleted, status, message } = useSelector(
    (state) => state.groupsSlice
  );

  const [deleteItem, setDeleteItem] = useState(undefined);
  const [statusMessage, setStatusMessage] = useState('');
  const [modalStatus, setModalStatus] = useState('close');
  const [afterAction, setAfterAction] = useState('initial');

  const handleCancel = () => {
    setModalStatus('close');
    setAfterAction('initial');
  };

  const createNewGroup = () => {
    router.navigate('screens/groups/ActionScreen');
  };

  const handleOnDelete = (item) => {
    setDeleteItem(item);
    setModalStatus('open');
  };

  const handleOnView = (item) => {
    router.push({
      pathname: 'screens/groups/ViewScreen',
      params: { groupId: item._id },
    });
  };

  const deleteGroup = () => {
    if (deleteItem) {
      dispatch(deleteNumsGroup(deleteItem));
      setAfterAction('loading');
    } else {
      setStatusMessage('Looks like this group is already deleted!');
    }
  };

  useEffect(() => {
    if (deleteItem) {
      const groupName = deleteItem.group_name;
      setStatusMessage(`Would you like to delete the group ${groupName}?`);
    }
  }, [deleteItem]);

  useEffect(() => {
    if (isDeleted) {
      setAfterAction('done');
      setStatusMessage('Successfully Deleted!');
    }
  }, [isDeleted]);

  useEffect(() => {
    dispatch(fetchNumsGroups());
  }, []);

  const styles = StyleSheet.create({
    optionBox: {
      flex: 1,
      flexDirection: 'row',
      padding: Sizes.$ieExtraPadding,
      width: '100%',
      alignSelf: 'center',
      ...mStyles.commonShadow,
    },
  });

  const rightHeaderNode = () => (
    <MasterIcon
      iconName='plus'
      iconSize={20}
      iconFamily='FontAwesome'
      iconColor={theme.itemColor}
      isInteractive={true}
      iconStyles={mStyles.actionBtn}
      onPress={createNewGroup}
    />
  );

  return (
    <AuthTemplate screenName='Manage Groups' rightHeader={rightHeaderNode()}>
      <View style={styles.optionBox}>
        {status === 'error' && (
          <MasterError
            timeout={10}
            errorMsg={message}
            marginBottom={10}
            textAlign='center'
          />
        )}
        <GroupsList
          groupsList={groupsList}
          onDeletePress={handleOnDelete}
          onViewPress={handleOnView}
        />
      </View>
      <AlertModal
        onCancel={handleCancel}
        onSubmit={deleteGroup}
        onClose={handleCancel}
        modalStatus={modalStatus}
        statusMessage={statusMessage}
        alertIcon='trash'
        afterAction={afterAction}
      />
    </AuthTemplate>
  );
};

export default ListScreen;
