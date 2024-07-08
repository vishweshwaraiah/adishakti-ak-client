import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import MasterModal from '@/components/Modals/MasterModal';
import MasterButton from '@/components/MasterButton';
import Sizes from '@/utils/Sizes';
import { useTheme } from '@/themes/ThemeProvider';
import MasterIcon from '@/components/MasterIcon';

const AlertModal = (props) => {
  const {
    onCancel = () => {},
    onSubmit = () => {},
    modalStatus = 'close',
    afterAction = 'loading',
    onClose = () => {},
    closeTitle = 'Close',
    statusMessage = 'Success!',
    alertIcon = 'warning',
    iconFamily,
    isClosable = true,
  } = props;

  const { theme } = useTheme();

  const [modalOpen, setModalOpen] = useState('close');

  useEffect(() => {
    if (modalStatus === 'open') {
      setModalOpen('open');
    } else {
      setModalOpen('close');
    }
  }, [modalStatus]);

  const styles = StyleSheet.create({
    bodyContent: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      gap: 5,
    },
    subView: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    groupActions: {
      flexDirection: 'row',
      justifyContent: 'center',
      gap: 10,
    },
    actionText: {
      justifyContent: 'center',
      textAlign: 'center',
      padding: Sizes.$ieExtraPadding,
      marginBottom: Sizes.$ieRegularMargin,
    },
  });

  const initialView = () => {
    return (
      <View style={styles.subView}>
        <MasterIcon
          iconFamily={iconFamily}
          iconName={alertIcon}
          iconSize={Sizes.$alertIconSize}
          iconColor={theme.itemColor}
        />
        <Text style={styles.actionText}>{statusMessage}</Text>
        <View style={styles.groupActions}>
          <MasterButton
            onPress={onCancel}
            title='Cancel'
            variant='light'
            textColor='black'
          ></MasterButton>
          <MasterButton
            onPress={onSubmit}
            title='Yes'
            variant='success'
          ></MasterButton>
        </View>
      </View>
    );
  };

  const doneView = () => {
    return (
      <View style={styles.subView}>
        <MasterIcon
          iconFamily={iconFamily}
          iconName={alertIcon}
          iconSize={Sizes.$alertIconSize}
          iconColor={theme.itemColor}
        />
        <Text style={styles.actionText}>{statusMessage}</Text>
        <MasterButton
          onPress={onClose}
          title={closeTitle}
          variant='light'
          textColor='black'
        ></MasterButton>
      </View>
    );
  };

  const loadingView = () => {
    return (
      <View style={styles.subView}>
        <ActivityIndicator animating={true} size='large' color={theme.green} />
        <Text style={styles.actionText}>{statusMessage}</Text>
      </View>
    );
  };

  return (
    <MasterModal
      bodyHeight={280}
      bodyWidth='70%'
      bgColor={theme.modalBodyBg}
      status={modalOpen}
      setStatus={setModalOpen}
      onClose={onClose}
      isClosable={isClosable}
    >
      <View style={styles.bodyContent}>
        {(afterAction === 'error' || afterAction === 'done') && doneView()}
        {afterAction === 'initial' && initialView()}
        {afterAction === 'loading' && loadingView()}
      </View>
    </MasterModal>
  );
};

export default AlertModal;
