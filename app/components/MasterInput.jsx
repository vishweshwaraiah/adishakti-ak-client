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
import Colors from '@/utils/Colors';
import Sizes from '@/utils/Sizes';
import {
  AntDesign,
  MaterialIcons,
  FontAwesome,
  Feather,
} from '@expo/vector-icons';
import MasterStyles from '@/utils/MasterStyles';

const MasterInput = (props) => {
  const {
    onInput = () => {},
    onBlur = () => {},
    startIcon,
    iconFamily,
    type,
    name = 'input',
    inputLabel,
    value,
    error = false,
    required = false,
    rounded = false,
    width = '90%',
    textBefore,
    maxLength,
    size = 'regular',
  } = props;

  const duration = 200;

  const [inputValue, setInputValue] = useState('');
  const [inputType, setInputType] = useState('default');
  const [hasError, setHasError] = useState(false);
  const [inputWidth, setInputWidth] = useState({});
  const [inputHeight, setInputHeight] = useState({});
  const [labelPos, setLabelPos] = useState({});
  const [eyeIcon, setEyeIcon] = useState(true);

  const inputRef = useRef(null);
  const moveText = useRef(new Animated.Value(0)).current;

  useEffect(() => {
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
      setHasError(true);
    } else {
      setHasError(false);
    }
  }, [inputValue]);

  useEffect(() => {
    setHasError(error);
  }, [error]);

  useEffect(() => {
    setInputWidth({
      width: width,
    });
  }, [width]);

  useEffect(() => {
    if (size === 'regular') {
      setInputHeight({
        height: Sizes.$ieRegularHeight,
      });
      setLabelPos({
        active: 5,
        inactive: -8,
      });
    }

    if (size === 'large') {
      setInputHeight({
        height: Sizes.$ieLargeHeight,
      });
      setLabelPos({
        active: 10,
        inactive: -4,
      });
    }

    if (size === 'xlarge') {
      setInputHeight({
        height: Sizes.$ieXLargeHeight,
      });
      setLabelPos({
        active: 12,
        inactive: -4,
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

    let errorStatus;
    if (required) {
      errorStatus = e.nativeEvent.text ? false : true;
      setHasError(errorStatus);
    }

    onBlur(name, errorStatus);
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
      toValue = 1.8;
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

  const animStyle = {
    transform: [{ translateY: yVal }, { translateX: xVal }],
  };

  const getIcon = () => {
    if (iconFamily === 'AntDesign') {
      return <AntDesign name={startIcon} size={20} color='#000' />;
    } else if (iconFamily === 'FontAwesome') {
      return <FontAwesome name={startIcon} size={20} color='#000' />;
    } else {
      return <MaterialIcons name={startIcon} size={20} color='#000' />;
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

  return (
    <View
      style={[
        styles.container,
        inputWidth,
        inputHeight,
        hasError && styles.inputError,
        rounded && styles.isRounded,
      ]}
    >
      <Animated.View style={[styles.labelPos, animStyle]}>
        <Pressable onPress={handleLabelClick}>
          <Animated.Text style={styles.labelText}>{inputLabel}</Animated.Text>
        </Pressable>
      </Animated.View>
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
        />
        {type === 'password' && showPwdIcon()}
      </View>
    </View>
  );
};
export default MasterInput;

const styles = StyleSheet.create({
  container: {
    marginVertical: Sizes.$ieRegularMargin,
    backgroundColor: Colors.$white,
    paddingHorizontal: Sizes.$ieRegularPadding,
    alignSelf: 'center',
    maxHeight: Sizes.$ieMaxHeight,
    ...MasterStyles.commonShadow,
  },
  labelPos: {
    position: 'relative',
    top: 6,
    left: 30,
    zIndex: 201,
  },
  labelText: {
    position: 'absolute',
    height: 'auto',
    maxHeight: Sizes.$ieMaxHeight,
    color: 'grey',
    fontSize: Sizes.$ieSmallFont,
    lineHeight: Sizes.$ieSmallFont,
    paddingHorizontal: Sizes.$ieRegularPadding,
    paddingVertical: Sizes.$ieRegularPadding,
    backgroundColor: Colors.$white,
    borderRadius: 5,
    overflow: 'hidden',
    zIndex: 201,
  },
  inputBox: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    alignSelf: 'center',
  },
  textInput: {
    flex: 1,
    fontSize: Sizes.$ieRegularFont,
    maxHeight: Sizes.$ieMaxHeight,
    color: Colors.$black,
  },
  inputError: {
    borderColor: 'red',
    borderWidth: 2,
  },
  isRounded: {
    borderRadius: Sizes.$ieRegularRadius,
  },
});
