import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MasterModal from '@/components/Modals/MasterModal';
import MasterButton from '@/components/MasterButton';
import { Ionicons, Entypo, FontAwesome, AntDesign } from '@expo/vector-icons';
import Sizes from '@/utils/Sizes';
import { useTheme } from '@/themes/ThemeProvider';

const UploadModal = (props) => {
  const {
    handleCamera = () => {},
    handleGallery = () => {},
    handleRemove = () => {},
    modalStatus = 'close',
    afterAction = 'initial',
    onClose = () => {},
    statusMessage = 'Success!',
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

  const getIcon = (iconFamily, iconName) => {
    switch (iconFamily) {
      case 'Ionicons':
        return <Ionicons name={iconName} size={24} color='orange' />;
      case 'Entypo':
        return <Entypo name={iconName} size={24} color='orange' />;
      case 'AntDesign':
        return <AntDesign name={iconName} size={24} color='orange' />;
      default:
        return <FontAwesome name={iconName} size={24} color='orange' />;
    }
  };

  return (
    <MasterModal
      bodyHeight={160}
      bodyWidth='80%'
      bgColor={theme.modalBodyBg}
      status={modalOpen}
      setStatus={setModalOpen}
      onClose={onClose}
    >
      <View style={styles.bodyContent}>
        {afterAction === 'error' || afterAction === 'done' ? (
          <View>
            <Text style={styles.statusText}>{statusMessage}</Text>
            <MasterButton
              onPress={onClose}
              title='Close'
              variant='light'
              textColor='black'
            ></MasterButton>
          </View>
        ) : (
          <View>
            <Text style={styles.actionText}>Upload Photo</Text>
            <View style={styles.groupActions}>
              <MasterButton
                onPress={handleCamera}
                variant='light'
                textColor='black'
                height='xlarge'
              >
                {getIcon('Ionicons', 'camera')}
                <Text>Camera</Text>
              </MasterButton>
              <MasterButton
                onPress={handleGallery}
                variant='light'
                textColor='black'
                height='xlarge'
              >
                {getIcon('Ionicons', 'images')}
                <Text>Gallery</Text>
              </MasterButton>
              <MasterButton
                onPress={handleRemove}
                variant='light'
                textColor='black'
                height='xlarge'
              >
                {getIcon('Ionicons', 'trash')}
                <Text>Remove</Text>
              </MasterButton>
            </View>
          </View>
        )}
      </View>
    </MasterModal>
  );
};

export default UploadModal;

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
    padding: Sizes.$ieRegularPadding,
    marginBottom: Sizes.$ieSmallMargin,
    fontSize: Sizes.$ieLargeFont,
  },
  statusText: {
    justifyContent: 'center',
    textAlign: 'center',
    padding: Sizes.$ieRegularPadding,
    marginBottom: Sizes.$ieLargeMargin,
    fontSize: Sizes.$ieRegularFont,
  },
});
