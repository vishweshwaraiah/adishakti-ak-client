import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import MasterModal from '@/components/Modals/MasterModal';
import MasterButton from '@/components/MasterButton';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/utils/Colors';
import Sizes from '@/utils/Sizes';
import MasterInput from '../MasterInput';

const UpdateModal = (props) => {
  const {
    onCancel = () => {},
    onSubmit = () => {},
    modalStatus = 'close',
    afterAction = 'initial',
    onClose = () => {},
    statusMessage = 'Success!',
    alertIcon = 'warning',
    cancelText = 'Cancel',
    submitText = 'Submit',
  } = props;

  const [modalOpen, setModalOpen] = useState('close');
  const [username, setUsername] = useState('');
  const [userError, setUserError] = useState(false);

  const getValue = () => {};

  const blurHandler = () => {};

  useEffect(() => {
    if (modalStatus === 'open') {
      setModalOpen('open');
    } else {
      setModalOpen('close');
    }
  }, [modalStatus]);

  return (
    <MasterModal
      bodyHeight={480}
      bodyWidth='70%'
      bgColor={Colors.$modalBodyBg}
      status={modalOpen}
      setStatus={setModalOpen}
      onClose={onClose}
      modalTitle='Update'
    >
      <ScrollView
        automaticallyAdjustKeyboardInsets={true}
        contentContainerStyle={styles.bodyContent}
      >
        {afterAction === 'error' || afterAction === 'done' ? (
          <View style={styles.doneView}>
            <Ionicons name={alertIcon} size={72} color='black' />
            <Text style={styles.actionText}>{statusMessage}</Text>
            <MasterButton
              onPress={onClose}
              title='Close'
              variant='light'
              textColor='black'
            ></MasterButton>
          </View>
        ) : (
          <View>
            <MasterInput
              inputLabel='User Name'
              textColor='light'
              onInput={getValue}
              onBlur={blurHandler}
              startIcon='user'
              iconFamily='Entypo'
              name='username'
              type='email'
              value={username}
              error={userError}
              rounded={true}
            />
            <MasterInput
              inputLabel='Email ID'
              textColor='light'
              onInput={getValue}
              onBlur={blurHandler}
              startIcon='email'
              iconFamily='Entypo'
              name='username'
              type='email'
              value={username}
              error={userError}
              rounded={true}
            />
            <MasterInput
              inputLabel='User Mobile'
              textColor='light'
              onInput={getValue}
              onBlur={blurHandler}
              startIcon='mobile'
              iconFamily='Entypo'
              name='username'
              type='email'
              value={username}
              error={userError}
              rounded={true}
            />
            <MasterInput
              inputLabel='User Gender'
              textColor='light'
              onInput={getValue}
              onBlur={blurHandler}
              startIcon='male-female'
              iconFamily='Ionicons'
              name='username'
              type='email'
              value={username}
              error={userError}
              rounded={true}
            />
            <MasterInput
              inputLabel='Date of birth'
              textColor='light'
              onInput={getValue}
              onBlur={blurHandler}
              startIcon='calendar-number'
              iconFamily='Ionicons'
              name='username'
              type='email'
              value={username}
              error={userError}
              rounded={true}
            />
            <View style={styles.groupActions}>
              <MasterButton
                onPress={onCancel}
                title={cancelText}
                variant='light'
                textColor='black'
              ></MasterButton>
              <MasterButton
                onPress={onSubmit}
                title={submitText}
                variant='success'
              ></MasterButton>
            </View>
          </View>
        )}
      </ScrollView>
    </MasterModal>
  );
};

export default UpdateModal;

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
    marginTop: Sizes.$ieRegularMargin,
  },
  actionText: {
    justifyContent: 'center',
    textAlign: 'center',
    padding: Sizes.$ieExtraPadding,
    marginBottom: Sizes.$ieRegularMargin,
  },
  doneView: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
});
