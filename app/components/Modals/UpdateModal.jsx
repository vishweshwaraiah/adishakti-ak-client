import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MasterModal from '@/components/Modals/MasterModal';
import MasterButton from '@/components/MasterButton';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/utils/Colors';
import Sizes from '@/utils/Sizes';

const UpdateModal = (props) => {
  const {
    onCancel = () => {},
    onSubmit = () => {},
    modalStatus = 'close',
    afterAction = false,
    onClose = () => {},
    statusMessage = 'Success!',
    alertIcon = 'warning',
  } = props;

  const [modalOpen, setModalOpen] = useState('close');

  useEffect(() => {
    if (modalStatus === 'open') {
      setModalOpen('open');
    } else {
      setModalOpen('close');
    }
  }, [modalStatus]);

  return (
    <MasterModal
      bodyHeight='30%'
      bodyWidth='70%'
      bgColor={Colors.$modalBodyBg}
      status={modalOpen}
      setStatus={setModalOpen}
      onClose={onClose}
    >
      <View style={styles.bodyContent}>
        <Ionicons name={alertIcon} size={72} color='black' />
        <Text style={styles.actionText}>{statusMessage}</Text>
        {afterAction ? (
          <MasterButton
            onPress={onClose}
            title='Close'
            variant='light'
          ></MasterButton>
        ) : (
          <View style={styles.groupActions}>
            <MasterButton
              onPress={onCancel}
              title='Cancel'
              variant='light'
            ></MasterButton>
            <MasterButton
              onPress={onSubmit}
              title='Yes'
              variant='success'
            ></MasterButton>
          </View>
        )}
      </View>
    </MasterModal>
  );
};

export default UpdateModal;

const styles = StyleSheet.create({
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
  actionText: {
    justifyContent: 'center',
    textAlign: 'center',
    padding: Sizes.$ieExtraPadding,
    marginBottom: Sizes.$ieRegularMargin,
  },
});
