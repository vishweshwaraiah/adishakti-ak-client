import React, { useEffect, useRef, useState } from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  View,
  Animated,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import MasterStyles from '@/utils/MasterStyles';
import Colors from '@/utils/Colors';
import Sizes from '@/utils/Sizes';

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
  } = props;

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
      setTimeout(() => setVisibility(value), 200);
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
    modalBox: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    button: {
      elevation: 2,
      justifyContent: 'flex-start',
      alignItems: 'center',
      padding: Sizes.$ieRegularPadding,
      backgroundColor: Colors.$primary,
      overflow: 'hidden',
    },
    textStyle: {
      color: Colors.$white,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    modalText: {
      marginBottom: 15,
      textAlign: 'center',
    },
    centeredBackground: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: Colors.$modalBackground,
    },
    modalContainer: {
      width: bodyWidth || '80%',
      backgroundColor: bgColor,
      borderRadius: Sizes.$ieLargeRadius,
      height: bodyHeight || '50%',
      transform: [{ scale: scaleValue }],
      ...MasterStyles.commonShadow,
    },
    modalHeader: {
      borderBottomWidth: modalTitle ? 2 : 0,
      position: 'relative',
      width: '100%',
      height: modalTitle ? '10%' : 0,
      minHeight: modalTitle ? 50 : 25,
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalTitle: {
      textAlignVertical: 'center',
      fontSize: 18,
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
      position: 'relative',
      paddingBottom: Sizes.$ieExtraPadding,
      width: '100%',
      height: '90%',
    },
  });

  return (
    <View style={styles.modalBox}>
      <Modal transparent={true} visible={isOpen}>
        <View style={styles.centeredBackground}>
          <Animated.View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{modalTitle}</Text>
              <TouchableOpacity
                style={styles.modalClose}
                onPress={() => handleClose()}
              >
                <Ionicons name='close-circle' size={24} color='black' />
              </TouchableOpacity>
            </View>
            <View style={styles.modalBody}>{children}</View>
          </Animated.View>
        </View>
      </Modal>
    </View>
  );
};

export default MasterModal;
