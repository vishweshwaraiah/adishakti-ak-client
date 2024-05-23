import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Image,
  View,
  Dimensions,
  Text,
  Pressable,
  Keyboard,
  Alert,
  Animated,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { ValidEmail, ValidNumber, ValidPassword } from '@/utils/Globals';
import { registerUser, resetState } from '@/redux/slice/authData';
import { useRouter } from 'expo-router';
import MasterButton from '@/components/MasterButton';
import MasterInput from '@/components/MasterInput';
import BaseTemplate from '@/wrappers/BaseTemplate';
import { clearUser } from '@/redux/slice/userData';
import { useTheme } from '@/themes/ThemeProvider';
import MonoText from '@/components/MonoText';
import AlertModal from '@/components/Modals/AlertModal';
import Sizes from '@/utils/Sizes';

const screenWidth = Dimensions.get('window').width;

const AppRegister = () => {
  const router = useRouter();
  const { status, message } = useSelector((state) => state.authSlice);
  const dispatch = useDispatch();

  const { theme } = useTheme();

  const [userEmail, setUserEmail] = useState('');
  const [userMobile, setUserMobile] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [mobileError, setMobileError] = useState('');
  const [pwdError, setPwdError] = useState('');

  const [modalStatus, setModalStatus] = useState('close');
  const [statusMessage, setStatusMessage] = useState('');
  const [afterAction, setAfterAction] = useState('loading');

  const clearInputs = () => {
    setUserEmail('');
    setUserMobile('');
    setUserPassword('');
  };

  const blurHandler = (name, error) => {
    if (name === 'email') setEmailError(error);
    if (name === 'mobile') setMobileError(error);
    if (name === 'password') setPwdError(error);
  };

  const handleRegister = () => {
    const user = {
      userEmail: userEmail,
      userMobile: userMobile,
      userPassword: userPassword,
    };

    if (!userEmail) {
      setEmailError('Email is required!');
    } else {
      setEmailError('');
    }

    if (!userMobile) {
      setMobileError('Mobile is required!');
    } else {
      setMobileError('');
    }

    if (!userPassword) {
      setPwdError('Password is required!');
    } else {
      setPwdError('');
    }

    const noData = !userEmail || !userMobile || !userPassword;
    const hasErrs = emailError || mobileError || pwdError;

    if (noData || hasErrs) {
      return false;
    }

    dispatch(registerUser(user));
  };

  const handleCancel = () => {
    router.navigate('/auth/login');
    setModalStatus('close');
    setTimeout(() => {
      setAfterAction('initial');
    }, 500);
  };

  const handleSubmit = () => {
    console.log('Registered successfully!');
    setModalStatus('close');
    // after registration completed successfully
  };

  useEffect(() => {
    if (status === 'error') {
      Alert.alert('Registration Failed', message);
      setTimeout(() => dispatch(resetState()), 500);
    }

    if (status === 'registering') {
      setStatusMessage('Registration in progress!');
      setAfterAction('loading');
      setModalStatus('open');
    }

    if (status === 'registered') {
      setStatusMessage('Registration Success!');
      setAfterAction('done');
      setModalStatus('open');

      setTimeout(() => {
        dispatch(resetState());
        dispatch(clearUser());
      }, 500);

      clearInputs();
    }
  }, [status, message]);

  useEffect(() => {
    const indNumber = '+91' + userMobile;
    const validNum = ValidNumber(indNumber);

    if (userMobile && !validNum) {
      setMobileError('Invalid Mobile number!');
    } else {
      setMobileError('');
    }
  }, [userMobile]);

  useEffect(() => {
    const validEmail = ValidEmail(userEmail);

    if (userEmail && !validEmail) {
      setEmailError('Invalid Email ID!');
    } else {
      setEmailError('');
    }
  }, [userEmail]);

  useEffect(() => {
    const validPassword = ValidPassword(userPassword);

    if (userPassword && !validPassword) {
      setPwdError('Invalid Password!');
    } else {
      setPwdError('');
    }
  }, [userPassword]);

  const getValue = (obj) => {
    if (obj.name === 'email') {
      setUserEmail(obj.value);
      setEmailError('');
    }

    if (obj.name === 'mobile') {
      setUserMobile(obj.value);
      setMobileError('');
    }

    if (obj.name === 'password') {
      setUserPassword(obj.value);
      setPwdError('');
    }
  };

  const styles = StyleSheet.create({
    registerBox: {
      alignItems: 'center',
      justifyContent: 'center',
      width: screenWidth,
      height: '100%',
      gap: Sizes.$ieFlexGapXLarge,
    },
    topView: {
      justifyContent: 'center',
      alignSelf: 'center',
      width: screenWidth - 150,
      height: screenWidth - 150,
    },
    bottomView: {
      width: screenWidth,
      maxHeight: '60%',
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: Sizes.$ieRegularPadding,
    },
    brandImage: {
      alignSelf: 'center',
      width: '100%',
      height: '100%',
    },
    titleText: {
      alignSelf: 'center',
      alignItems: 'center',
      marginVertical: 0,
      opacity: 0.8,
      paddingHorizontal: Sizes.$ieLargePadding,
      width: screenWidth,
    },
    title: {
      color: theme.black,
      fontSize: Sizes.$ieTitleFont,
      textTransform: 'uppercase',
    },
    switchScreen: {
      marginVertical: Sizes.$ieLargeMargin,
    },
  });

  return (
    <BaseTemplate>
      <KeyboardAvoidingView behavior='position' style={styles.container}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={styles.registerBox}>
            <Animated.View style={styles.topView}>
              <Image
                style={styles.brandImage}
                source={require('@/assets/images/logo.png')}
              ></Image>
            </Animated.View>
            <View style={styles.titleText}>
              <MonoText style={styles.title}>Register!</MonoText>
            </View>
            <View style={styles.bottomView}>
              <MasterInput
                inputLabel='Email'
                textColor='light'
                onInput={getValue}
                onBlur={blurHandler}
                startIcon='email'
                name='email'
                type='email'
                value={userEmail}
                error={emailError}
                rounded={true}
                required={true}
                size='large'
                spacing={10}
              />
              <MasterInput
                inputLabel='Mobile'
                type='number'
                textColor='light'
                onInput={getValue}
                onBlur={blurHandler}
                startIcon='phone'
                name='mobile'
                value={userMobile}
                iconFamily='FontAwesome'
                error={mobileError}
                rounded={true}
                required={true}
                size='large'
                spacing={10}
              />
              <MasterInput
                inputLabel='Password'
                type='password'
                textColor='light'
                onInput={getValue}
                onBlur={blurHandler}
                startIcon='password'
                name='password'
                value={userPassword}
                error={pwdError}
                rounded={true}
                required={true}
                size='large'
                spacing={10}
              />

              <MasterButton
                marginTop={Sizes.$ieLargeMargin}
                width={Sizes.$ieElementWidth}
                title='Register'
                onPress={handleRegister}
                variant='secondary'
                shape='round'
                height='large'
              />
              <Pressable
                style={styles.switchScreen}
                onPress={() => router.replace('/auth/login')}
              >
                <Text>Already a member? Sign in!</Text>
              </Pressable>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
      <AlertModal
        onCancel={handleCancel}
        onSubmit={handleSubmit}
        modalStatus={modalStatus}
        statusMessage={statusMessage}
        onClose={handleCancel}
        closeTitle='Login'
        alertIcon='check-circle'
        iconFamily='Feather'
        afterAction={afterAction}
        isClosable={false}
      />
    </BaseTemplate>
  );
};

export default AppRegister;
