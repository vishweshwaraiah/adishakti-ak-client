import React, { useState, useRef, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Animated,
  Easing,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import {
  AntDesign,
  MaterialIcons,
  FontAwesome,
  Feather,
  Entypo,
  Ionicons,
} from '@expo/vector-icons';
import MasterPicker from '@/components/MasterPicker';
import Colors from '@/utils/Colors';
import Sizes from '@/utils/Sizes';
import MasterStyles from '@/utils/MasterStyles';

const MasterInput = (props) => {
  const {
    onInput = () => {},
    onBlur = () => {},
    startIcon = '',
    iconFamily = '',
    type,
    name = 'input',
    inputLabel = '',
    value = '',
    showError = false,
    error = false,
    required = false,
    rounded = false,
    inputWidth = '90%',
    textBefore = '',
    maxLength,
    size = 'regular',
    spacing = 0,
    animated = true,
    placeholder = '',
    editable = true,
    onFocus = () => {},
  } = props;

  const duration = 200;

  const [inputValue, setInputValue] = useState('');
  const [inputType, setInputType] = useState('default');
  const [hasError, setHasError] = useState('');
  const [inputHeight, setInputHeight] = useState({});
  const [labelPos, setLabelPos] = useState({});
  const [eyeIcon, setEyeIcon] = useState(true);
  const [modalStatus, setModalStatus] = useState('close');

  const inputRef = useRef(null);
  const moveText = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (value === '' || value === undefined) {
      animateText(0);
    } else {
      animateText(1);
    }
    if (inputType === 'date') {
      const newDate = new Date(value);
      const strDate = newDate.toDateString();
      setInputValue(strDate);
    } else {
      setInputValue(value);
    }
  }, [value]);

  useEffect(() => {
    if (type === 'text') {
      setInputType('default');
    } else if (type === 'number') {
      setInputType('number-pad');
    } else if (type === 'email') {
      setInputType('email-address');
    } else if (type === 'phone') {
      setInputType('phone-pad');
    } else if (type === 'password') {
      setInputType('default');
    } else if (type === 'url') {
      setInputType('url');
    } else if (type === 'date') {
      setInputType('date');
    } else {
      setInputType('default');
    }
  }, [type]);

  useEffect(() => {
    onInput({
      name,
      value: inputValue,
    });

    if (!inputValue && required) {
      setHasError('This is a required field!');
    } else {
      setHasError('');
    }
  }, [inputValue]);

  useEffect(() => {
    setHasError(error);
  }, [error]);

  useEffect(() => {
    if (size === 'regular') {
      setInputHeight({
        height: Sizes.$ieRegularHeight,
      });
      setLabelPos({
        active: 4,
        inactive: -8,
      });
    }

    if (size === 'large') {
      setInputHeight({
        height: Sizes.$ieLargeHeight,
      });
      setLabelPos({
        active: 8,
        inactive: -4,
      });
    }

    if (size === 'xlarge') {
      setInputHeight({
        height: Sizes.$ieXLargeHeight,
      });
      setLabelPos({
        active: 12,
        inactive: 0,
      });
    }
  }, [size]);

  const onFocusHandler = () => {
    if (!inputValue) {
      animateText(1);
    }
    onFocus();
  };

  const onBlurHandler = (e) => {
    if (!inputValue) {
      animateText(0);
    }

    let error;
    if (required) {
      error = e.nativeEvent.text ? '' : 'This is a required field!';
      setHasError(error);
    }

    onBlur(name, error);
  };

  const handleLabelClick = () => {
    // Focus the input programmatically
    inputRef.current.focus();
  };

  const onChangeText = (enteredValue) => {
    setInputValue(enteredValue);
    if (enteredValue !== '') {
      animateText(1);
    } else if (inputValue === '') {
      animateText(0);
    }
  };

  const handleDate = () => {
    setModalStatus('open');
  };

  const handleSelect = (date) => {
    const val = date.toDateString();
    setInputValue(val);
    setModalStatus('close');
  };

  const handleCancel = () => {
    setModalStatus('close');
  };

  const animateText = (to) => {
    let toValue = to;
    if (to !== 0) {
      toValue = 2;
    }
    Animated.timing(moveText, {
      toValue,
      duration,
      useNativeDriver: true,
      easing: Easing.ease,
    }).start();
  };

  const yVal = moveText.interpolate({
    inputRange: [0, 1],
    outputRange: [labelPos?.active || 0, labelPos?.inactive || 0],
  });

  const xVal = moveText.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -16],
  });

  const animationStyle = {
    transform: [{ translateY: yVal }, { translateX: xVal }],
  };

  const getIcon = () => {
    if (iconFamily === 'AntDesign') {
      return (
        <AntDesign name={startIcon} size={Sizes.$startIconSize} color='#000' />
      );
    } else if (iconFamily === 'FontAwesome') {
      return (
        <FontAwesome
          name={startIcon}
          size={Sizes.$startIconSize}
          color='#000'
        />
      );
    } else if (iconFamily === 'Entypo') {
      return (
        <Entypo name={startIcon} size={Sizes.$startIconSize} color='#000' />
      );
    } else if (iconFamily === 'Ionicons') {
      return (
        <Ionicons name={startIcon} size={Sizes.$startIconSize} color='#000' />
      );
    } else {
      return (
        <MaterialIcons
          name={startIcon}
          size={Sizes.$startIconSize}
          color='#000'
        />
      );
    }
  };

  const showPwd = () => {
    setEyeIcon(!eyeIcon);
  };

  const showPwdIcon = () => {
    return eyeIcon ? (
      <Feather onPress={() => showPwd()} name='eye' size={24} color='black' />
    ) : (
      <Feather
        onPress={() => showPwd()}
        name='eye-off'
        size={24}
        color='black'
      />
    );
  };

  const styles = StyleSheet.create({
    mainContainer: {
      width: inputWidth,
      justifyContent: 'flex-start',
    },
    labelBox: {
      flexDirection: 'row',
      maxHeight: Sizes.$ieMaxHeight,
      marginTop: spacing,
    },
    labelText: {
      color: Colors.$secondary,
      fontSize: Sizes.$ieSmallFont,
      lineHeight: Sizes.$ieSmallFont,
      zIndex: 201,
      height: 'auto',
      maxHeight: Sizes.$ieMaxHeight,
    },
    inputHolder: {
      height: inputHeight,
      width: '100%',
      marginBottom: spacing,
      marginTop: spacing,
      ...MasterStyles.commonShadow,
    },
    subContainer: {
      flexDirection: 'row',
      marginBottom: spacing ? spacing / 2 : 0,
      backgroundColor: Colors.$light,
      paddingHorizontal: Sizes.$ieRegularPadding,
      maxHeight: Sizes.$ieMaxHeight,
    },
    labelPos: {
      position: 'relative',
      top: 6,
      left: 30,
      zIndex: 201,
    },
    animatedLabel: {
      position: 'absolute',
      backgroundColor: Colors.$light,
      borderRadius: 5,
      overflow: 'hidden',
      paddingVertical: Sizes.$ieRegularPadding,
      paddingHorizontal: Sizes.$ieRegularPadding,
    },
    inputBox: {
      flexDirection: 'row',
      alignItems: 'center',
      alignSelf: 'center',
      gap: 10,
    },
    textInput: {
      flex: 1,
      fontSize: inputValue ? Sizes.$ieRegularFont : Sizes.$ieSmallFont,
      maxHeight: Sizes.$ieMaxHeight,
      color: Colors.$black,
      justifyContent: 'center',
    },
    placeHolder: {
      fontSize: Sizes.$ieSmallFont,
      color: Colors.$gray,
    },
    errorText: {
      fontSize: Sizes.$ieSmallFont,
      color: Colors.$danger,
      textAlign: 'left',
      width: inputWidth,
    },
    inputError: {
      borderColor: Colors.$danger,
      borderWidth: 2,
    },
    isRounded: {
      borderRadius: Sizes.$ieRegularRadius,
    },
  });

  return (
    <View style={styles.mainContainer}>
      {!animated && (
        <View style={styles.labelBox}>
          <Text style={styles.labelText}>{inputLabel}</Text>
        </View>
      )}
      <View style={styles.inputHolder}>
        <View
          style={[
            styles.subContainer,
            hasError && styles.inputError,
            rounded && styles.isRounded,
          ]}
        >
          {animated && (
            <Animated.View style={[styles.labelPos, animationStyle]}>
              <Pressable onPress={handleLabelClick}>
                <Animated.Text style={[styles.labelText, styles.animatedLabel]}>
                  {inputLabel}
                </Animated.Text>
              </Pressable>
            </Animated.View>
          )}
          <View style={styles.inputBox}>
            {getIcon()}
            {textBefore && <Text>{textBefore}</Text>}
            {inputType === 'date' ? (
              <TouchableOpacity
                onPress={handleDate}
                style={[styles.textInput, inputHeight]}
              >
                {inputValue ? (
                  <Text>{inputValue}</Text>
                ) : (
                  <Text style={styles.placeHolder}>Select a date!</Text>
                )}
                <MasterPicker
                  modalStatus={modalStatus}
                  onSelect={handleSelect}
                  onCancel={handleCancel}
                  inputDefDate={inputValue}
                />
              </TouchableOpacity>
            ) : (
              <TextInput
                ref={inputRef}
                value={inputValue}
                onBlur={onBlurHandler}
                style={[styles.textInput, inputHeight]}
                onFocus={onFocusHandler}
                onChangeText={onChangeText}
                clearButtonMode='while-editing'
                secureTextEntry={type === 'password' && eyeIcon}
                keyboardType={inputType}
                name={name}
                autoCapitalize='none'
                maxLength={maxLength}
                placeholder={placeholder}
                editable={editable}
              />
            )}

            {type === 'password' && showPwdIcon()}
          </View>
        </View>
        {hasError && showError && (
          <Text style={styles.errorText}>{hasError}</Text>
        )}
      </View>
    </View>
  );
};
export default MasterInput;
