import { TouchableOpacity, StyleSheet, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Sizes from '@/utils/Sizes';
import { useTheme } from '@/themes/ThemeProvider';

const MasterCheckbox = (props) => {
  const { isChecked, isIntermediate, size = 'regular', color } = props;

  const { theme } = useTheme();

  const [inputSize, setInputSize] = useState(0);
  const [inputColor, setInputColor] = useState(theme.black);

  const iconName = isChecked ? 'checkbox-marked' : 'checkbox-blank-outline';

  const isInter = 'checkbox-intermediate';

  useEffect(() => {
    if (size === 'large') {
      setInputSize(32);
    } else {
      setInputSize(24);
    }
  }, [size]);

  useEffect(() => {
    if (color === 'light') {
      setInputColor(theme.white);
    } else {
      setInputColor(theme.black);
    }
  }, [color]);

  const styles = StyleSheet.create({
    container: {
      justifyContent: 'flex-start',
      alignItems: 'center',
      flexDirection: 'row',
      marginHorizontal: Sizes.$ieRegularMargin / 2,
    },
    title: {
      marginLeft: Sizes.$ieRegularMargin / 2,
    },
  });

  return (
    <TouchableOpacity style={styles.container} onPress={props.onPress}>
      <Text style={styles.title}>{props.title}</Text>
      <MaterialCommunityIcons
        name={isIntermediate ? isInter : iconName}
        size={inputSize}
        color={inputColor}
      />
    </TouchableOpacity>
  );
};

export default MasterCheckbox;
