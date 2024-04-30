import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import Sizes from '@/utils/Sizes';
import Colors from '@/utils/Colors';
import MasterStyles from '@/utils/MasterStyles';
import { Ionicons } from '@expo/vector-icons';

const GenderSelector = (props) => {
  const { error = '', onSelect = () => {} } = props;

  const [genderError, setGenderError] = useState('');

  const handleGender = (value) => {
    onSelect(value);
    if (value) setGenderError('');
  };

  useEffect(() => {
    setGenderError(error);
  }, [error]);

  const styles = StyleSheet.create({
    genderContainer: {
      width: '90%',
      justifyContent: 'center',
      alignSelf: 'center',
      marginTop: Sizes.$ieRegularMargin,
    },
    genderBox: {
      flexDirection: 'row',
      gap: Sizes.$ieFlexGapLarge,
      marginTop: Sizes.$ieRegularMargin,
      alignSelf: 'center',
      justifyContent: 'space-between',
      ...MasterStyles.commonShadow,
    },
    genderBtn: {
      flex: 1,
      marginVertical: Sizes.$ieSmallMargin,
      backgroundColor: Colors.$light,
      borderRadius: Sizes.$ieRegularRadius,
      overflow: 'hidden',
      height: Sizes.$ieLargeHeight,
      alignItems: 'center',
      alignSelf: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      gap: Sizes.$ieFlexGap,
    },
    genderText: {
      color: Colors.$secondary,
      fontSize: Sizes.$ieSmallFont,
      lineHeight: Sizes.$ieSmallFont,
    },
    errorText: {
      fontSize: Sizes.$ieSmallFont,
      color: Colors.$danger,
      textAlign: 'left',
      alignSelf: 'flex-start',
    },
    inputError: {
      borderColor: Colors.$danger,
      borderWidth: 2,
    },
  });
  return (
    <View style={styles.genderContainer}>
      <Text style={styles.genderText}>Select Gender</Text>
      <View style={styles.genderBox}>
        <TouchableOpacity
          style={styles.genderBtn}
          onPress={() => handleGender('M')}
        >
          <Ionicons name='male' size={20} color='black' />
          <Text style={styles.genderText}>Male</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.genderBtn}
          onPress={() => handleGender('F')}
        >
          <Ionicons name='female' size={20} color='black' />
          <Text style={styles.genderText}>Female</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.genderBtn}
          onPress={() => handleGender('O')}
        >
          <Ionicons name='male-female' size={20} color='black' />
          <Text style={styles.genderText}>Others</Text>
        </TouchableOpacity>
      </View>
      {genderError && <Text style={styles.errorText}>Invalid Gender!</Text>}
    </View>
  );
};

export default GenderSelector;
