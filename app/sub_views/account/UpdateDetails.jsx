import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import MasterButton from '@/components/MasterButton';
import { Ionicons } from '@expo/vector-icons';
import Sizes from '@/utils/Sizes';
import MasterInput from '../../components/MasterInput';
import AuthTemplate from '@/wrappers/AuthTemplate';
import { router } from 'expo-router';
import GenderSelector from '@/components/GenderSelector';

const UpdateDetails = (props) => {
  const {
    afterAction = 'initial',
    statusMessage = 'Success!',
    alertIcon = 'warning',
    cancelText = 'Cancel',
    submitText = 'Submit',
  } = props;

  const [userName, setUserName] = useState('');
  const [nameError, setNameError] = useState('');

  const [userEmail, setUserEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const [userMobile, setUserMobile] = useState('');
  const [mobileError, setMobileError] = useState('');

  const [userGender, setUserGender] = useState('');
  const [genderError, setGenderError] = useState('');

  const [userDob, setUserDob] = useState('');
  const [dobError, setDobError] = useState('');

  const getValue = (obj) => {
    if (obj.name === 'username') {
      setUserName(obj.value);
    }

    if (obj.name === 'useremail') {
      setUserEmail(obj.value);
    }

    if (obj.name === 'usermobile') {
      setUserMobile(obj.value);
    }

    if (obj.name === 'userdob') {
      setUserDob(obj.value);
    }
  };

  const onCancel = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.push('sub_views/account/ProfileScreen');
    }
  };

  const onSubmit = () => {
    router.push('sub_views/account/UpdateDetails');
  };

  const blurHandler = (name, error) => {
    if (name === 'username') setNameError(error);
    if (name === 'useremail') setEmailError(error);
    if (name === 'usermobile') setMobileError(error);
    if (name === 'usergender') setGenderError(error);
    if (name === 'userdob') setDobError(error);
  };

  const clearInputs = () => {
    setUserName('');
    setUserEmail('');
    setUserMobile('');
    setUserGender('');
    setUserDob('');

    setNameError('');
    setEmailError('');
    setMobileError('');
    setGenderError('');
    setDobError('');
  };

  const handleData = () => {
    const userData = {
      userName,
      userEmail,
      userMobile,
      userGender,
      userDob,
    };

    let errCount = 0;

    if (!userName) {
      setNameError('Invalid Name!');
      errCount++;
    }

    if (!userEmail) {
      setEmailError('Invalid Email!');
      errCount++;
    }
    if (!userMobile) {
      setMobileError('Invalid Mobile!');
      errCount++;
    }

    if (!userGender) {
      setGenderError('Invalid Gender!');
      errCount++;
    }

    if (!userDob) {
      setDobError('Invalid Date!');
      errCount++;
    }

    if (errCount) {
      return false;
    }

    onSubmit(userData);
  };

  const handleGender = (value) => {
    if (value === 'M') {
      setUserGender('male');
    } else if (value === 'F') {
      setUserGender('female');
    } else {
      setUserGender('others');
    }
  };

  return (
    <AuthTemplate screenName='Edit Profile'>
      <View style={styles.titleContainer}>
        <Text style={styles.sectionTitle}>Update</Text>
      </View>
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
          <View style={styles.inputsBox}>
            <MasterInput
              inputLabel='User Name'
              textColor='light'
              onInput={getValue}
              onBlur={blurHandler}
              startIcon='user'
              iconFamily='Entypo'
              name='username'
              type='text'
              value={userName}
              error={nameError}
              rounded={true}
              size='large'
              animated={false}
              placeholder='Enter your full name'
            />
            <MasterInput
              inputLabel='Email ID'
              textColor='light'
              onInput={getValue}
              onBlur={blurHandler}
              startIcon='email'
              iconFamily='Entypo'
              name='useremail'
              type='email'
              value={userEmail}
              error={emailError}
              rounded={true}
              size='large'
              animated={false}
              placeholder='Enter your email id'
            />
            <MasterInput
              inputLabel='User Mobile'
              textColor='light'
              onInput={getValue}
              onBlur={blurHandler}
              startIcon='mobile'
              iconFamily='Entypo'
              name='usermobile'
              type='number'
              value={userMobile}
              error={mobileError}
              rounded={true}
              size='large'
              animated={false}
              placeholder='Enter your mobile number'
            />
            <GenderSelector error={genderError} onSelect={handleGender} />
            <MasterInput
              inputLabel='Date of birth'
              textColor='light'
              onInput={getValue}
              onBlur={blurHandler}
              startIcon='calendar-number'
              iconFamily='Ionicons'
              name='userdob'
              type='text'
              value={userDob}
              error={dobError}
              rounded={true}
              size='large'
              animated={false}
              placeholder='Select your date of birth'
            />
            <View style={styles.groupActions}>
              <MasterButton
                onPress={onCancel}
                title={cancelText}
                variant='light'
                textColor='black'
                height='large'
                width='44%'
              ></MasterButton>
              <MasterButton
                onPress={handleData}
                title={submitText}
                variant='success'
                height='large'
                width='44%'
              ></MasterButton>
            </View>
          </View>
        )}
      </ScrollView>
    </AuthTemplate>
  );
};

export default UpdateDetails;

const styles = StyleSheet.create({
  bodyContent: {
    justifyContent: 'center',
    alignItems: 'center',
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
  sectionTitle: {
    fontSize: 32,
    paddingVertical: Sizes.$ieRegularPadding,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  titleContainer: {
    borderBottomWidth: 1,
  },
  doneView: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  inputsBox: {
    width: '100%',
    paddingTop: Sizes.$ieLargePadding,
  },
});
