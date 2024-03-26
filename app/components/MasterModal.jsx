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
    triggerType,
    triggerIcon = 'add',
    triggerText = 'Save',
    triggerShape = 'circle',
    triggerSize = 'regular',
    children,
    bodyHeight,
    bodyWidth,
    bgColor,
    modalTitle,
    modalToggle = false,
    onToggle = () => {},
  } = props;

  const [modalVisible, setModalVisible] = useState(false);
  const [triggerStyle, setTriggerStyle] = useState({});
  const [iconSize, setIconSize] = useState(0);

  const scaleValue = useRef(new Animated.Value(0)).current;

  const triggerElement = () => {
    if (triggerType === 'text') {
      return <Text style={styles.textStyle}>{triggerText}</Text>;
    }

    if (triggerType === 'icon') {
      return <Ionicons name={triggerIcon} size={iconSize} color='white' />;
    }
  };

  const toggleModal = (value) => {
    if (value) {
      setModalVisible(true);
      onToggle(true);
      Animated.spring(scaleValue, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      setTimeout(() => setModalVisible(false), 200);
      onToggle(false);
      Animated.timing(scaleValue, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };

  useEffect(() => {
    toggleModal(modalToggle);
  }, [modalToggle]);

  useEffect(() => {
    if (triggerShape === 'square') {
      setTriggerStyle({
        borderRadius: 0,
      });
    }
    if (triggerShape === 'rounded') {
      setTriggerStyle({
        borderRadius: Sizes.$ieBorderRadius,
      });
    }
    if (triggerShape === 'circle') {
      setTriggerStyle({
        borderRadius: 35,
      });
    }
  }, [triggerShape]);

  useEffect(() => {
    if (triggerSize === 'small') {
      setIconSize(16);
    }

    if (triggerSize === 'regular') {
      setIconSize(24);
    }

    if (triggerSize === 'large') {
      setIconSize(32);
    }
  }, [triggerSize]);

  const styles = StyleSheet.create({
    modalBox: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    button: {
      elevation: 2,
      justifyContent: 'flex-start',
      alignItems: 'center',
      padding: Sizes.$iePadding,
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
      right: Sizes.$ieCloseGap,
      top: Sizes.$ieCloseGap,
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
      <Modal transparent={true} visible={modalVisible}>
        <View style={styles.centeredBackground}>
          <Animated.View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{modalTitle}</Text>
              <TouchableOpacity
                style={[triggerStyle, styles.modalClose]}
                onPress={() => toggleModal(false)}
              >
                <Ionicons name='close-circle' size={24} color='black' />
              </TouchableOpacity>
            </View>
            <View style={styles.modalBody}>{children}</View>
          </Animated.View>
        </View>
      </Modal>
      <TouchableOpacity
        style={[styles.button, triggerStyle]}
        onPress={() => toggleModal(true)}
      >
        {triggerElement()}
      </TouchableOpacity>
    </View>
  );
};

export default MasterModal;
