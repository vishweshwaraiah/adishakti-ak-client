import React, { useEffect, useState } from 'react';
import { View, Switch, StyleSheet } from 'react-native';
import { useTheme } from '@/themes/ThemeProvider';

const MasterSwitch = (props) => {
  const { onChange = () => {}, defValue = false } = props;

  const { theme } = useTheme();

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
      false: theme.trackFalse,
      true: theme.trackTrue,
    },
  });

  return (
    <View style={styles.container}>
      <Switch
        trackColor={styles.trackColor}
        thumbColor={isEnabled ? theme.thumbTrue : theme.thumbFalse}
        ios_backgroundColor={theme.iOsBgColor}
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
    </View>
  );
};

export default MasterSwitch;
