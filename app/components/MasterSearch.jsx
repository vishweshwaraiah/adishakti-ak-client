import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  TextInput,
  Animated,
  Easing,
  Keyboard,
} from 'react-native';
import MasterIcon from '@/components/MasterIcon';
import useMasterStyle from '@/utils/useMasterStyle';
import { useTheme } from '@/themes/ThemeProvider';
import Sizes from '@/utils/Sizes';

const MasterSearch = (props) => {
  const {
    onInput = () => {},
    onBlur = () => {},
    onFocus = () => {},
    iconFamily = '',
    value = '',
    autofocus = false,
    spacing = 0,
    size = 'regular',
    placeholder = 'Type here...',
  } = props;

  const duration = 200;
  const { theme } = useTheme();
  const mStyles = useMasterStyle();

  const inputRef = useRef(null);
  const widthRef = useRef(new Animated.Value(0)).current;
  const colorRef = useRef(new Animated.Value(0)).current;

  const [inputValue, setInputValue] = useState('');
  const [inputHeight, setInputHeight] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const [searchIcon, setSearchIcon] = useState('search');

  const animateInput = (to) => {
    let toValue = to;
    Animated.timing(widthRef, {
      toValue,
      duration,
      useNativeDriver: true,
      easing: Easing.bezier(0.1, 0.5, 0.8, 0.5),
    }).start();

    Animated.timing(colorRef, {
      toValue,
      duration,
      useNativeDriver: true,
      easing: Easing.bezier(0.1, 0.5, 0.8, 0.5),
    }).start();
  };

  const handleFocus = () => {
    if (!inputValue) {
      animateInput(1);
    }
    onFocus();
  };

  const handleBlur = () => {
    onBlur();
  };

  const onChangeText = (enteredValue) => {
    setInputValue(enteredValue);
    animateInput(1);
  };

  const toggleCollapse = () => {
    if (expanded) {
      animateInput(0);
      setSearchIcon('search');
      setInputValue('');
      Keyboard.dismiss();
    } else {
      setSearchIcon('close');
      animateInput(1);
      focusInput();
    }
    setExpanded(!expanded);
  };

  const focusInput = () => {
    inputRef.current?.focus();
  };

  const inputScale = widthRef.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const barColor = colorRef.interpolate({
    inputRange: [0, 1],
    outputRange: [theme.trans, theme.itemBg],
  });

  useEffect(() => {
    if (size === 'regular') {
      setInputHeight(Sizes.$ieRegularHeight);
    }

    if (size === 'large') {
      setInputHeight(Sizes.$ieLargeHeight);
    }

    if (size === 'xlarge') {
      setInputHeight(Sizes.$ieXLargeHeight);
    }
  }, [size]);

  useEffect(() => {
    onInput(inputValue);
  }, [inputValue]);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  useEffect(() => {
    animateInput(0);
    if (autofocus) focusInput();
  }, []);

  const styles = StyleSheet.create({
    inputContainer: {
      position: 'absolute',
      right: 0,
      width: '100%',
      backgroundColor: barColor,
      borderRadius: Sizes.$ieRegularRadius,
      marginVertical: spacing,
      zIndex: 201,
      ...mStyles.commonShadow,
    },
    searchIcon: {
      position: 'absolute',
      right: 0,
      top: 0,
      bottom: 0,
    },
    searchBox: {
      width: '90%',
      height: inputHeight,
      transform: [{ scale: inputScale }],
      paddingHorizontal: Sizes.$ieLargePadding,
      maxHeight: Sizes.$ieMaxHeight,
    },
    textInput: {
      flex: 1,
      fontSize: Sizes.$ieRegularFont,
      maxHeight: Sizes.$ieMaxHeight,
      color: theme.itemColor,
      justifyContent: 'center',
      height: inputHeight,
    },
  });

  return (
    <Animated.View style={styles.inputContainer}>
      <MasterIcon
        iconFamily={iconFamily}
        iconName={searchIcon}
        iconSize={Sizes.$startIconSize}
        iconColor={theme.itemColor}
        iconStyles={styles.searchIcon}
        isInteractive={true}
        onPress={toggleCollapse}
        iconBgColor={theme.itemBg}
      />
      <Animated.View style={styles.searchBox}>
        <TextInput
          ref={inputRef}
          value={inputValue}
          onBlur={handleBlur}
          onFocus={handleFocus}
          onChangeText={onChangeText}
          keyboardType='default'
          autoCapitalize='none'
          placeholder={placeholder}
          placeholderTextColor={theme.placeHolder}
          editable={true}
          style={styles.textInput}
        />
      </Animated.View>
    </Animated.View>
  );
};

export default MasterSearch;
