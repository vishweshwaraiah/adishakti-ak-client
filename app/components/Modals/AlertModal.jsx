import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MasterModal from '@/components/Modals/MasterModal';
import MasterButton from '@/components/MasterButton';
import { Ionicons, Entypo, FontAwesome, AntDesign } from '@expo/vector-icons';
import Colors from '@/utils/Colors';
import Sizes from '@/utils/Sizes';

const AlertModal = (props) => {
  const {
    onCancel = () => {},
    onSubmit = () => {},
    modalStatus = 'close',
    afterAction = 'initial',
    onClose = () => {},
    statusMessage = 'Success!',
    alertIcon = 'warning',
    iconFamily,
  } = props;

  const [modalOpen, setModalOpen] = useState('close');

  useEffect(() => {
    if (modalStatus === 'open') {
      setModalOpen('open');
    } else {
      setModalOpen('close');
    }
  }, [modalStatus]);

  const getIcon = () => {
    switch (iconFamily) {
      case 'Ionicons':
        return <Ionicons name={alertIcon} size={72} color='black' />;
      case 'Entypo':
        return <Entypo name={alertIcon} size={72} color='black' />;
      case 'AntDesign':
        return <AntDesign name={alertIcon} size={72} color='black' />;
      default:
        return <FontAwesome name={alertIcon} size={72} color='black' />;
    }
  };

  return (
    <MasterModal
      bodyHeight={260}
      bodyWidth='70%'
      bgColor={Colors.$modalBodyBg}
      status={modalOpen}
      setStatus={setModalOpen}
      onClose={onClose}
    >
      <View style={styles.bodyContent}>
        {getIcon()}
        <Text style={styles.actionText}>{statusMessage}</Text>
        {afterAction === 'error' || afterAction === 'done' ? (
          <MasterButton
            onPress={onClose}
            title='Close'
            variant='light'
            textColor='black'
          ></MasterButton>
        ) : (
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
        )}
      </View>
    </MasterModal>
  );
};

export default AlertModal;

const styles = StyleSheet.create({
  bodyContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
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
