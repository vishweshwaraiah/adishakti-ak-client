import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Colors from '@/utils/Colors';
import Sizes from '@/utils/Sizes';
import MasterStyles from '@/utils/MasterStyles';

const MasterError = (props) => {
  const { errorMsg, width = '95%' } = props;

  const styles = StyleSheet.create({
    errorContainer: {
      position: 'relative',
      borderWidth: 2,
      borderColor: Colors.$danger,
      width: width,
      padding: Sizes.$iePadding,
      borderRadius: Sizes.$ieBorderRadius,
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
      ...MasterStyles.commonShadow,
    },
    errorText: {
      color: Colors.$danger,
    },
  });

  return (
    <View style={styles.errorContainer}>
      <Text style={styles.errorText}>{errorMsg}</Text>
    </View>
  );
};

export default MasterError;
