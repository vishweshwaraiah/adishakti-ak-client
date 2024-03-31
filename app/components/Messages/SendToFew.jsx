import React, { useEffect, useState } from 'react';
import {
  Alert,
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Text,
  SafeAreaView,
} from 'react-native';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import MasterInput from '@/components/MasterInput';
import Sizes from '@/utils/Sizes';
import Colors from '@/utils/Colors';
import MasterStyles from '@/utils/MasterStyles';

const numColumns = 2;
const size = Dimensions.get('window').width / numColumns;
const screenHeight = Dimensions.get('window').height;

const SendToFew = (props) => {
  const { getList } = props;

  const [phone, setPhone] = useState('');
  const [phoneError, setPhoneError] = useState(false);
  const [enteredList, setEnteredList] = useState([]);

  useEffect(() => {
    if (enteredList.length) getList(enteredList);
  }, [enteredList]);

  const getValue = (obj) => {
    if (obj.name === 'add_phone') {
      setPhone(obj.value);
    }
  };

  const blurHandler = (name, error) => {
    if (name === 'add_phone') setPhoneError(error);
  };

  const addPhoneNumber = () => {
    if (phone && phone.length === 10) {
      setEnteredList((currentArray) => [
        ...currentArray,
        {
          value: '+91' + phone,
          key: Math.random().toString(),
        },
      ]);
      setPhone('');
    } else {
      setPhoneError(true);
      Alert.alert('Wrong phone number!');
      return;
    }
  };

  const renderItem = ({ item, index }) => (
    <View style={index % 2 ? styles.styleLeft : styles.styleRight}>
      <TouchableOpacity
        style={styles.numBox}
        onPress={() => removePhoneNumber(item)}
      >
        <Text style={styles.contactNum}>{item.value}</Text>
        <Ionicons
          style={styles.removeIcon}
          name='remove-circle'
          size={16}
          color='white'
        />
      </TouchableOpacity>
    </View>
  );

  const removePhoneNumber = (item) => {
    const filteredList = enteredList?.filter((i) => {
      return i.key !== item.key;
    });
    setEnteredList(filteredList);
  };

  return (
    <SafeAreaView>
      <View style={styles.contactsBox}>
        <MasterInput
          clearButtonMode='always'
          style={styles.numberInput}
          inputLabel='Enter a number'
          textColor='light'
          onInput={getValue}
          onBlur={blurHandler}
          startIcon='phone'
          iconFamily='AntDesign'
          name='add_phone'
          type='number'
          value={phone}
          error={phoneError}
          rounded={true}
          width='80%'
          textBefore='+91'
          maxLength={10}
          size='large'
        />
        <View style={styles.shadowProp}>
          <TouchableOpacity onPress={addPhoneNumber} style={styles.addIcon}>
            <MaterialIcons name='add-circle' size={24} color='black' />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.phonesList}>
        <FlatList
          data={enteredList}
          renderItem={renderItem}
          keyExtractor={(item) => item.key}
          numColumns={numColumns}
        />
      </View>
    </SafeAreaView>
  );
};

export default SendToFew;

const styles = StyleSheet.create({
  contactsBox: {
    flexDirection: 'row',
    gap: 'auto',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: Sizes.$ieRegularRadius,
    overflow: 'hidden',
    minHeight: 80,
    maxHeight: 200,
  },
  numberInput: {
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  shadowProp: {
    paddingHorizontal: 2,
    width: '18%',
    ...MasterStyles.commonShadow,
  },
  addIcon: {
    backgroundColor: Colors.$white,
    borderRadius: Sizes.$ieRegularRadius,
    paddingVertical: 12,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    height: Sizes.$ieLargeHeight,
  },
  phonesList: {
    flexDirection: 'row',
    maxHeight: screenHeight / 5,
  },
  styleLeft: {
    width: size - Sizes.$ieRegularPadding,
    paddingLeft: Sizes.$ieRegularPadding,
    paddingBottom: Sizes.$ieRegularPadding,
  },
  styleRight: {
    width: size - Sizes.$ieRegularPadding,
    paddingRight: Sizes.$ieRegularPadding,
    paddingBottom: Sizes.$ieRegularPadding,
  },
  numBox: {
    backgroundColor: Colors.$black,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    overflow: 'hidden',
    borderRadius: Sizes.$ieLargeRadius,
    height: Sizes.$ieRegularHeight,
  },
  contactNum: {
    color: Colors.$white,
    paddingVertical: Sizes.$ieExtraPadding,
    paddingHorizontal: Sizes.$ieRegularPadding,
  },
  removeIcon: {
    paddingRight: Sizes.$ieRegularPadding,
  },
});
