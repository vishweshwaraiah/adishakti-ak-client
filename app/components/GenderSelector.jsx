import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import Sizes from '@/utils/Sizes';
import Colors from '@/utils/Colors';
import MasterStyles from '@/utils/MasterStyles';
import { Ionicons } from '@expo/vector-icons';

const GenderSelector = (props) => {
  const {
    error = '',
    onSelect = () => {},
    spacing = 0,
    value = '',
    required = false,
  } = props;

  const [genderValue, setGenderValue] = useState('');
  const [genderError, setGenderError] = useState('');

  const handleGender = (value) => {
    if (!value && required) {
      setGenderError('This is a required field!');
    }
    onSelect(value);
    setGenderValue(value);
  };

  useEffect(() => {
    setGenderError(error);
  }, [error]);

  useEffect(() => {
    setGenderValue(value);
  }, [value]);

  const styles = StyleSheet.create({
    genderContainer: {
      width: '90%',
      justifyContent: 'center',
      alignSelf: 'center',
    },
    genderBox: {
      flexDirection: 'row',
      gap: Sizes.$ieFlexGapLarge,
      alignSelf: 'center',
      justifyContent: 'space-between',
      ...MasterStyles.commonShadow,
    },
    genderBtn: {
      flex: 1,
      marginBottom: spacing,
      marginTop: spacing ? spacing / 2 : 0,
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
    labelText: {
      fontSize: Sizes.$ieSmallFont,
      lineHeight: Sizes.$ieSmallFont,
      marginTop: spacing,
      color: Colors.$secondary,
    },
    genderText: {
      fontSize: Sizes.$ieSmallFont,
      lineHeight: Sizes.$ieSmallFont,
      color: Colors.$secondary,
    },
    errorText: {
      fontSize: Sizes.$ieSmallFont,
      color: Colors.$danger,
      textAlign: 'left',
      alignSelf: 'flex-start',
    },
    inputSelected: {
      borderColor: Colors.$secondary,
      borderWidth: 2,
    },
  });
  return (
    <View style={styles.genderContainer}>
      <Text style={styles.labelText}>Select Gender</Text>
      <View style={styles.genderBox}>
        <TouchableOpacity
          style={[
            styles.genderBtn,
            genderValue === 'Male' && styles.inputSelected,
          ]}
          onPress={() => handleGender('Male')}
        >
          <Ionicons name='male' size={20} color='black' />
          <Text style={styles.genderText}>Male</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.genderBtn,
            genderValue === 'Female' && styles.inputSelected,
          ]}
          onPress={() => handleGender('Female')}
        >
          <Ionicons name='female' size={20} color='black' />
          <Text style={styles.genderText}>Female</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.genderBtn,
            genderValue === 'Others' && styles.inputSelected,
          ]}
          onPress={() => handleGender('Others')}
        >
          <Ionicons name='male-female' size={20} color='black' />
          <Text style={styles.genderText}>Others</Text>
        </TouchableOpacity>
      </View>
      {genderError && <Text style={styles.errorText}>{genderError}</Text>}
    </View>
  );
};

export default GenderSelector;
