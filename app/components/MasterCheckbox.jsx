import { TouchableOpacity, StyleSheet, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import MasterIcon from '@/components/MasterIcon';
import Sizes from '@/utils/Sizes';
import { useTheme } from '@/themes/ThemeProvider';

const MasterCheckbox = (props) => {
  const {
    isChecked = false,
    isIntermediate = false,
    size = 'regular',
    iconColor,
  } = props;

  const { theme } = useTheme();

  const [inputSize, setInputSize] = useState(0);

  const iconName = isChecked ? 'check-square' : 'square';

  const isInter = 'minus-square';

  useEffect(() => {
    if (size === 'large') {
      setInputSize(32);
    } else {
      setInputSize(24);
    }
  }, [size]);

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

      <MasterIcon
        iconName={isIntermediate ? isInter : iconName}
        iconSize={inputSize}
        iconColor={iconColor}
        iconFamily='Feather'
      />
    </TouchableOpacity>
  );
};

export default MasterCheckbox;
