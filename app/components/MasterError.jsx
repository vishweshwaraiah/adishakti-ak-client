import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import Colors from '@/utils/Colors';
import Sizes from '@/utils/Sizes';
import MasterStyles from '@/utils/MasterStyles';

const MasterError = (props) => {
  const {
    errorMsg,
    width = '100%',
    timeout = 5,
    marginBottom = 0,
    textAlign = 'left',
  } = props;

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
      borderColor: Colors.$danger,
      width: width,
      padding: Sizes.$ieRegularPadding,
      borderRadius: Sizes.$ieRegularRadius,
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
      marginBottom: marginBottom,
      ...MasterStyles.commonShadow,
    },
    errorText: {
      color: Colors.$danger,
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
