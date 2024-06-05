import React, { useEffect, useRef, useState } from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  View,
  Animated,
  TouchableOpacity,
} from 'react-native';
import MasterIcon from '@/components/MasterIcon';
import useMasterStyle from '@/utils/useMasterStyle';
import Sizes from '@/utils/Sizes';
import { useTheme } from '@/themes/ThemeProvider';

const MasterModal = (props) => {
  const {
    children,
    bodyHeight,
    bodyWidth,
    bgColor,
    modalTitle,
    status = 'close',
    setStatus = () => {},
    onClose = () => {},
    isClosable = true,
  } = props;

  const { theme } = useTheme();
  const mStyles = useMasterStyle();

  const [visibility, setVisibility] = useState('close');
  const [isOpen, setIsOpen] = useState(false);

  const scaleValue = useRef(new Animated.Value(0)).current;

  const toggleModal = (value) => {
    if (value === 'open') {
      setVisibility(value);
      setStatus(value);
      Animated.spring(scaleValue, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      setTimeout(() => setVisibility(value), 500);
      setStatus(value);
      Animated.timing(scaleValue, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };

  const handleClose = () => {
    onClose();
    toggleModal('close');
  };

  useEffect(() => {
    toggleModal(status);
  }, [status]);

  useEffect(() => {
    if (visibility === 'open') {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [visibility]);

  const styles = StyleSheet.create({
    centeredBackground: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.modalBackground,
    },
    modalContainer: {
      backgroundColor: bgColor,
      borderRadius: Sizes.$ieLargeRadius,
      minHeight: bodyHeight || '50%',
      width: bodyWidth || '80%',
      transform: [{ scale: scaleValue }],
      ...mStyles.commonShadow,
    },
    modalHeader: {
      borderBottomWidth: modalTitle ? 2 : 0,
      position: 'relative',
      width: '100%',
      height: modalTitle ? '10%' : 25,
      minHeight: modalTitle ? 50 : 25,
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalTitle: {
      textAlignVertical: 'center',
      fontSize: Sizes.$ieLargeFont,
      fontWeight: 'bold',
    },
    modalClose: {
      position: 'absolute',
      right: Sizes.$ieFlexGap,
      top: Sizes.$ieFlexGap,
      width: '10%',
      zIndex: 201,
    },
    modalBody: {
      flex: 1,
      position: 'relative',
      paddingBottom: Sizes.$ieExtraPadding,
      width: '100%',
    },
    button: {
      elevation: 2,
      justifyContent: 'flex-start',
      alignItems: 'center',
      padding: Sizes.$ieRegularPadding,
      backgroundColor: theme.primary,
      overflow: 'hidden',
    },
    textStyle: {
      color: theme.white,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    modalText: {
      marginBottom: 15,
      textAlign: 'center',
    },
  });

  return (
    <Modal transparent={true} visible={isOpen}>
      <View style={styles.centeredBackground}>
        <Animated.View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            {modalTitle && <Text style={styles.modalTitle}>{modalTitle}</Text>}
            {isClosable && (
              <TouchableOpacity
                style={styles.modalClose}
                onPress={() => handleClose()}
              >
                <MasterIcon
                  iconName='close-circle'
                  iconSize={24}
                  iconFamily='Ionicons'
                  iconColor={theme.itemBg}
                />
              </TouchableOpacity>
            )}
          </View>
          <View style={styles.modalBody}>{children}</View>
        </Animated.View>
      </View>
    </Modal>
  );
};

export default MasterModal;
