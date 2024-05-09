import Colors from '@/utils/Colors';
import React, { useEffect, useState } from 'react';
import { View, Switch, StyleSheet } from 'react-native';

const MasterSwitch = (props) => {
  const { onChange = () => {}, defValue = false } = props;

  const { $trackFalse, $trackTrue, $thumbTrue, $thumbFalse, $iOsBgColor } =
    Colors;

  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    if (defValue === true) {
      setIsEnabled(true);
    } else {
      setIsEnabled(false);
    }
  }, [defValue]);

  const toggleSwitch = () => {
    setIsEnabled((previousState) => !previousState);
    onChange(!isEnabled);
  };

  const styles = StyleSheet.create({
    container: {},
    trackColor: {
      false: $trackFalse,
      true: $trackTrue,
    },
  });

  return (
    <View style={styles.container}>
      <Switch
        trackColor={styles.trackColor}
        thumbColor={isEnabled ? $thumbTrue : $thumbFalse}
        ios_backgroundColor={$iOsBgColor}
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
    </View>
  );
};

export default MasterSwitch;
