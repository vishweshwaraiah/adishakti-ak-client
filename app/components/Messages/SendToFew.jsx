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
import MasterInput from '@/components/MasterInput';
import MasterIcon from '@/components/MasterIcon';
import Sizes from '@/utils/Sizes';
import useMasterStyle from '@/utils/useMasterStyle';
import { useTheme } from '@/themes/ThemeProvider';

const numColumns = 2;
const size = Dimensions.get('window').width / numColumns;
const screenHeight = Dimensions.get('window').height;

const SendToFew = (props) => {
  const { getList } = props;

  const { theme } = useTheme();
  const mStyles = useMasterStyle();

  const [phone, setPhone] = useState('');
  const [phoneError, setPhoneError] = useState('');
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
          key: Math.random().toString(),
          phoneNumber: '91' + phone, // allow only indian numbers
        },
      ]);
      setPhone('');
      setPhoneError('');
    } else {
      setPhoneError('Mobile number is required!');
      Alert.alert('Wrong phone number!');
    }
  };

  const renderItem = ({ item, index }) => (
    <View style={index % 2 ? styles.styleLeft : styles.styleRight}>
      <TouchableOpacity
        style={styles.numBox}
        onPress={() => removePhoneNumber(item)}
      >
        <Text style={styles.contactNum}>{item.phoneNumber}</Text>
        <MasterIcon
          iconName='remove-circle'
          iconSize={16}
          iconFamily='Ionicons'
          iconColor={theme.itemColor}
          iconStyles={styles.removeIcon}
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

  const styles = StyleSheet.create({
    contactsBox: {
      flexDirection: 'row',
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
      ...mStyles.commonShadow,
    },
    addIcon: {
      backgroundColor: theme.primary,
      borderRadius: Sizes.$ieRegularRadius,
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
      backgroundColor: theme.itemBg,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      overflow: 'hidden',
      borderRadius: Sizes.$ieRegularRadius,
      height: Sizes.$ieRegularHeight,
    },
    contactNum: {
      color: theme.itemColor,
      paddingVertical: Sizes.$ieExtraPadding,
      paddingHorizontal: Sizes.$ieRegularPadding,
    },
    removeIcon: {
      paddingRight: Sizes.$ieRegularPadding,
    },
  });

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
          showError={false}
          rounded={true}
          inputWidth='80%'
          textBefore='+91'
          maxLength={10}
          size='large'
        />
        <View style={styles.shadowProp}>
          <TouchableOpacity onPress={addPhoneNumber} style={styles.addIcon}>
            <MasterIcon
              iconName='add-circle'
              iconSize={24}
              iconFamily='MaterialIcons'
              iconColor={theme.white}
            />
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
