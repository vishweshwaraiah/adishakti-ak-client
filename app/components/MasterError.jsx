import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import Sizes from '@/utils/Sizes';
import useMasterStyle from '@/utils/useMasterStyle';
import { useTheme } from '@/themes/ThemeProvider';

const MasterError = (props) => {
  const {
    errorMsg,
    width = '100%',
    timeout = 5,
    marginBottom = 0,
    textAlign = 'left',
  } = props;

  const { theme } = useTheme();
  const mStyles = useMasterStyle();

  const [showError, setShowError] = useState(true);

  useEffect(() => {
    if (timeout) {
      const timer = setTimeout(() => {
        setShowError(false);
      }, timeout * 1000);

      return () => {
        clearTimeout(timer);
      };
    } else {
      setShowError(true);
    }
  }, []);

  const styles = StyleSheet.create({
    errorContainer: {
      position: 'relative',
      borderWidth: 2,
      borderColor: theme.danger,
      width: width,
      padding: Sizes.$ieRegularPadding,
      borderRadius: Sizes.$ieRegularRadius,
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
      marginBottom: marginBottom,
      ...mStyles.commonShadow,
    },
    errorText: {
      color: theme.danger,
      textAlign: textAlign,
    },
  });

  return (
    showError && (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{errorMsg}</Text>
      </View>
    )
  );
};

export default MasterError;
