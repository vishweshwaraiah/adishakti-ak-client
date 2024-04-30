import React, { useState, useRef, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Animated,
  Easing,
  Pressable,
} from 'react-native';
import {
  AntDesign,
  MaterialIcons,
  FontAwesome,
  Feather,
  Entypo,
  Ionicons,
} from '@expo/vector-icons';
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
    error = false,
    required = false,
    rounded = false,
    inputWidth = '90%',
    textBefore = '',
    maxLength,
    size = 'regular',
    compact = false,
    animated = true,
    placeholder = '',
  } = props;

  const duration = 200;

  const [inputValue, setInputValue] = useState('');
  const [inputType, setInputType] = useState('default');
  const [hasError, setHasError] = useState('');
  const [inputHeight, setInputHeight] = useState({});
  const [labelPos, setLabelPos] = useState({});
  const [eyeIcon, setEyeIcon] = useState(true);

  const inputRef = useRef(null);
  const moveText = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (value === '' || value === undefined) {
      animateText(0);
    } else {
      animateText(1);
    }
    setInputValue(value);
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
      width: '100%',
    },
    subContainer: {
      flexDirection: 'row',
      marginVertical: compact ? 0 : Sizes.$ieRegularMargin,
      backgroundColor: Colors.$light,
      paddingHorizontal: Sizes.$ieRegularPadding,
      alignSelf: 'center',
      maxHeight: Sizes.$ieMaxHeight,
      height: inputHeight,
      width: inputWidth,
      ...MasterStyles.commonShadow,
    },
    labelBox: {
      flexDirection: 'row',
      paddingHorizontal: Sizes.$ieRegularPadding + 5,
      maxHeight: Sizes.$ieMaxHeight,
    },
    labelPos: {
      position: 'relative',
      top: 6,
      left: 30,
      zIndex: 201,
    },
    labelText: {
      color: Colors.$secondary,
      fontSize: Sizes.$ieSmallFont,
      lineHeight: Sizes.$ieSmallFont,
      zIndex: 201,
      height: 'auto',
      maxHeight: Sizes.$ieMaxHeight,
      paddingHorizontal: Sizes.$ieRegularPadding,
    },
    animatedLabel: {
      position: 'absolute',
      backgroundColor: Colors.$light,
      borderRadius: 5,
      overflow: 'hidden',
      paddingVertical: Sizes.$ieRegularPadding,
    },
    inputBox: {
      flexDirection: 'row',
      gap: 10,
      alignItems: 'center',
      alignSelf: 'center',
    },
    textInput: {
      flex: 1,
      fontSize: inputValue ? Sizes.$ieRegularFont : Sizes.$ieSmallFont,
      maxHeight: Sizes.$ieMaxHeight,
      color: Colors.$black,
    },
    errorText: {
      fontSize: Sizes.$ieSmallFont,
      color: Colors.$danger,
      textAlign: 'left',
      alignSelf: 'center',
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
    <View stylele={styles.mainContainer}>
      {!animated && (
        <View style={styles.labelBox}>
          <Text style={styles.labelText}>{inputLabel}</Text>
        </View>
      )}
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
          <Text>{textBefore}</Text>
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
          />
          {type === 'password' && showPwdIcon()}
        </View>
      </View>
      {hasError && <Text style={styles.errorText}>{hasError}</Text>}
    </View>
  );
};
export default MasterInput;
