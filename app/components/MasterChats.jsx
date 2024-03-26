import React, { useEffect, useState } from 'react';
import {
  Alert,
  StyleSheet,
  TextInput,
  Text,
  View,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  Pressable,
} from 'react-native';
import Sizes from '@/utils/Sizes';
import Colors from '@/utils/Colors';
import { FontAwesome } from '@expo/vector-icons';
import MasterSelect from '@/components/MasterSelect';
import MasterStyles from '@/utils/MasterStyles';
import SendToFew from '@/components/Messages/SendToFew';
import SendToGroup from '@/components/Messages/SendToGroup';

const MasterChats = (props) => {
  const { onGetData = () => {}, numbersList = [] } = props;

  const [textMessage, setTextMessage] = useState('');
  const [phonesArray, setPhonesArray] = useState([]);
  const [enteredList, setEnteredList] = useState([]);
  const [selected, setSelected] = useState(undefined);
  const [sendType, setSendType] = useState(undefined);
  const [selectLabel, setSelectLabel] = useState('Select an option');

  const selectOptions = [
    { label: 'Send to few numbers', value: 'to_few' },
    { label: 'Send to all contacts', value: 'to_all' },
    { label: 'Send to a group', value: 'to_group' },
  ];

  useEffect(() => {
    if (selected) {
      setSendType(selected.value);
    }
  }, [selected]);

  useEffect(() => {
    setPhonesArray([]);
    if (sendType === 'to_all' && numbersList.length) {
      setPhonesArray(numbersList);
    } else if (sendType === 'to_few' && enteredList.length) {
      setPhonesArray(enteredList);
    } else if (sendType === 'to_group') {
      setPhonesArray([]);
    }
  }, [sendType]);

  const sendMessage = () => {
    if (phonesArray.length && textMessage) {
      onGetData(phonesArray, textMessage, sendType);
      setTextMessage('');
      setPhonesArray([]);
      setSelected(undefined);
      setSendType(undefined);
      setSelectLabel('Default');
    } else {
      Alert.alert('Message and Numbers are required!');
    }
  };

  const messageHandler = (value) => {
    setTextMessage(value);
  };

  const getNumbersList = (numbers) => {
    if (numbers?.length) setEnteredList(numbers);
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        enabled
        style={styles.container}
      >
        <Text style={styles.mbRegular}>Choose numbers from</Text>
        <View style={styles.mbRegular}>
          <MasterSelect
            label={selectLabel}
            data={selectOptions}
            onSelect={setSelected}
          />
          {!!selected && selected.value === 'to_few' && (
            <SendToFew getList={getNumbersList} />
          )}
          {!!selected && selected.value === 'to_group' && (
            <SendToGroup getList={getNumbersList} />
          )}
        </View>
        <View style={styles.mainBox}>
          <TextInput
            placeholder='Type your message'
            clearButtonMode='always'
            style={styles.inputBox}
            multiline={true}
            onChangeText={messageHandler}
            name='text_message'
            value={textMessage}
          />
          <View style={styles.sendIconBox}>
            <Pressable
              onPress={sendMessage}
              style={({ pressed }) => [
                styles.sendIcon,
                pressed && styles.pressedBtn,
              ]}
            >
              <FontAwesome name='send-o' size={24} color='black' />
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default MasterChats;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Sizes.$iePadding,
    height: '100%',
  },
  mainBox: {
    position: 'relative',
    backgroundColor: Colors.$white,
    padding: Sizes.$ieExtraPadding,
    borderRadius: Sizes.$ieBorderRadius,
    ...MasterStyles.commonShadow,
  },
  inputBox: {
    justifyContent: 'center',
    flexWrap: 'wrap',
    minHeight: 80,
    maxHeight: 200,
  },
  sendIconBox: {
    position: 'relative',
    padding: Sizes.$iePadding,
    borderTopColor: Colors.$secondary,
    borderTopWidth: 1,
    marginTop: Sizes.$ieMargin,
    marginBottom: Sizes.$ieMargin * 2,
  },
  sendIcon: {
    position: 'absolute',
    right: Sizes.$iePadding,
    top: Sizes.$iePadding,
    marginTop: Sizes.$ieMargin,
    marginBottom: Sizes.$ieMargin,
  },
  pressedBtn: {
    opacity: 0.5,
    transform: [{ scale: 1.5 }],
  },
  mbRegular: {
    marginBottom: Sizes.$ieMargin,
  },
});
