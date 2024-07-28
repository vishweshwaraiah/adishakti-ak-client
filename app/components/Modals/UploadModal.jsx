import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MasterModal from '@/components/Modals/MasterModal';
import MasterButton from '@/components/MasterButton';
import MasterIcon from '@/components/MasterIcon';
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
      color: theme.modalTxtColor,
    },
    statusText: {
      justifyContent: 'center',
      textAlign: 'center',
      padding: Sizes.$ieRegularPadding,
      marginBottom: Sizes.$ieLargeMargin,
      fontSize: Sizes.$ieRegularFont,
      color: theme.modalTxtColor,
    },
  });

  return (
    <MasterModal
      bodyHeight={160}
      bodyWidth='80%'
      bgColor={theme.modalBgColor}
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
                <MasterIcon
                  iconFamily={'Ionicons'}
                  iconName={'camera'}
                  iconSize={Sizes.$startIconSize}
                  iconColor={theme.itemBg}
                />
                <Text>Camera</Text>
              </MasterButton>
              <MasterButton
                onPress={handleGallery}
                variant='light'
                textColor='black'
                height='xlarge'
              >
                <MasterIcon
                  iconFamily={'Ionicons'}
                  iconName={'images'}
                  iconSize={Sizes.$startIconSize}
                  iconColor={theme.itemBg}
                />
                <Text>Gallery</Text>
              </MasterButton>
              <MasterButton
                onPress={handleRemove}
                variant='light'
                textColor='black'
                height='xlarge'
              >
                <MasterIcon
                  iconFamily={'Ionicons'}
                  iconName={'trash'}
                  iconSize={Sizes.$startIconSize}
                  iconColor={theme.itemBg}
                />
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
