import React, { useEffect, useState } from 'react';
import {
  Alert,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import MasterButton from '@/components/MasterButton';
import { Ionicons } from '@expo/vector-icons';
import Sizes from '@/utils/Sizes';
import MasterInput from '../../components/MasterInput';
import AuthTemplate from '@/wrappers/AuthTemplate';
import { router } from 'expo-router';
import GenderSelector from '@/components/GenderSelector';
import { useSelector, useDispatch } from 'react-redux';
import { resetUserStatus, updateUser } from '@/redux/slice/userData';
import { useTheme } from '@/themes/ThemeProvider';

const screenWidth = Dimensions.get('window').width;

const UpdateDetails = () => {
  const dispatch = useDispatch();
  const { user, userStatus, userMessage } = useSelector(
    (state) => state.userSlice
  );

  const { theme } = useTheme();

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

  const [afterAction, setAfterAction] = useState('initial');
  const [statusIcon, setStatusIcon] = useState('warning');

  const [dataChanged, setDataChanged] = useState(false);

  const getValue = (obj) => {
    if (obj.name === 'username') {
      if (obj.value !== user.userName) {
        setUserName(obj.value);
        setDataChanged(true);
      } else {
        setDataChanged(false);
      }
    }

    if (obj.name === 'useremail') {
      if (obj.value !== user.userEmail) {
        setUserEmail(obj.value);
        setDataChanged(true);
      } else {
        setDataChanged(false);
      }
    }

    if (obj.name === 'usermobile') {
      if (obj.value !== user.userMobile) {
        setUserMobile(obj.value);
        setDataChanged(true);
      } else {
        setDataChanged(false);
      }
    }

    if (obj.name === 'userdob') {
      if (obj.value !== user.userDob) {
        setUserDob(obj.value);
        setDataChanged(true);
      } else {
        setDataChanged(false);
      }
    }
  };

  const onCancel = () => {
    clearInputs();
    setAfterAction('initial');
    dispatch(resetUserStatus());
    if (router.canGoBack()) {
      router.back();
    } else {
      router.push('sub_views/account/ProfileScreen');
    }
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

  const handleSubmitData = () => {
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

    if (dataChanged) {
      dispatch(updateUser(userData));
    } else {
      Alert.alert('Nothing much to update!');
    }
  };

  const handleGender = (value) => {
    if (value !== user.userGender) {
      setDataChanged(true);
      setUserGender(value);
    } else {
      setDataChanged(false);
    }
  };

  useEffect(() => {
    if (userStatus === 'updatinguser') {
      setAfterAction('done');
      setStatusIcon('warning');
    }

    if (userStatus === 'updateduser') {
      setAfterAction('done');
      setStatusIcon('checkmark-circle');
    }

    if (userStatus === 'error') {
      setAfterAction('error');
      setStatusIcon('warning');
    }
  }, [userStatus]);

  useEffect(() => {
    setUserName(user.userName);
    setUserEmail(user.userEmail);
    setUserMobile(user.userMobile);
    setUserGender(user.userGender);
    setUserDob(user.userDob);
  }, [user]);

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
      color: theme.titleColor,
    },
    titleContainer: {
      borderBottomWidth: 1,
    },
    doneView: {
      justifyContent: 'center',
      alignItems: 'center',
      gap: 10,
      paddingTop: Sizes.$ieLargePadding,
    },
    inputsBox: {
      width: screenWidth,
      maxHeight: '60%',
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: Sizes.$ieLargePadding,
    },
  });

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
            <Ionicons name={statusIcon} size={72} color='black' />
            <Text style={styles.actionText}>{userMessage}</Text>
            <MasterButton
              onPress={onCancel}
              title='Return'
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
              spacing={10}
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
              spacing={10}
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
              spacing={10}
            />
            <GenderSelector
              error={genderError}
              onSelect={handleGender}
              spacing={10}
              required={true}
              value={userGender}
            />
            <MasterInput
              inputLabel='Date of birth'
              textColor='light'
              onInput={getValue}
              onBlur={blurHandler}
              startIcon='calendar-number'
              iconFamily='Ionicons'
              name='userdob'
              type='date'
              value={userDob}
              error={dobError}
              rounded={true}
              size='large'
              animated={false}
              placeholder='Select your date of birth'
              spacing={10}
            />

            <View style={styles.groupActions}>
              <MasterButton
                onPress={onCancel}
                title='Cancel'
                variant='light'
                textColor='black'
                height='large'
                width='44%'
              ></MasterButton>
              <MasterButton
                onPress={handleSubmitData}
                title='Submit'
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
