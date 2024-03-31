import React, { useEffect, useState } from 'react';
import {
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
  const {
    onSendClick = () => {},
    numbersList = [],
    selectOptions = [],
    resetAction = {},
  } = props;

  const defaultSelect = {
    label: 'Select an option',
    value: 'default',
  };

  const [textMessage, setTextMessage] = useState('');
  const [phonesArray, setPhonesArray] = useState([]);
  const [enteredList, setEnteredList] = useState([]);
  const [groupList, setGroupList] = useState([]);
  const [selected, setSelected] = useState(undefined);
  const [sendType, setSendType] = useState(undefined);
  const [defLabel, setDefLabel] = useState(defaultSelect);

  const resetForm = () => {
    setTextMessage('');
    setPhonesArray([]);
    setEnteredList([]);
    setSelected(undefined);
    setSendType(undefined);
    setDefLabel(defaultSelect);
  };

  const messageHandler = (value) => {
    setTextMessage(value);
  };

  const sendMessage = () => {
    const smsContent = {
      phonesArray,
      textMessage,
      sendType,
    };
    onSendClick(smsContent);
  };

  const getNumbersList = (numbers) => {
    setGroupList([]);
    if (numbers?.length) setEnteredList(numbers);
  };

  const getGroupList = (group) => {
    setEnteredList([]);
    if (group?.length) setGroupList(group);
  };

  useEffect(() => {
    if (selected) {
      setSendType(selected.value);
    }
  }, [selected]);

  useEffect(() => {
    setPhonesArray([]);

    if (sendType === 'to_all' && numbersList.length) {
      setPhonesArray(numbersList);
    }

    if (sendType === 'to_few' && enteredList.length) {
      setPhonesArray(enteredList);
    }

    if (sendType === 'to_group' && groupList.length) {
      setPhonesArray(groupList);
    }
  }, [sendType, numbersList, enteredList, groupList]);

  useEffect(() => {
    resetForm();
  }, [resetAction]);

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
            defaultSelect={defLabel}
            selectData={selectOptions}
            onSelect={setSelected}
          />
          {selected?.value === 'to_few' && (
            <SendToFew getList={getNumbersList} />
          )}
          {selected?.value === 'to_group' && (
            <SendToGroup getList={getGroupList} />
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
    padding: Sizes.$ieRegularPadding,
    height: '100%',
  },
  mainBox: {
    position: 'relative',
    backgroundColor: Colors.$white,
    padding: Sizes.$ieExtraPadding,
    borderRadius: Sizes.$ieRegularRadius,
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
    padding: Sizes.$ieRegularPadding,
    borderTopColor: Colors.$secondary,
    borderTopWidth: 1,
    marginTop: Sizes.$ieRegularMargin,
    marginBottom: Sizes.$ieRegularMargin * 2,
  },
  sendIcon: {
    position: 'absolute',
    right: Sizes.$ieRegularPadding,
    top: Sizes.$ieRegularPadding,
    marginTop: Sizes.$ieRegularMargin,
    marginBottom: Sizes.$ieRegularMargin,
  },
  pressedBtn: {
    opacity: 0.5,
    transform: [{ scale: 1.5 }],
  },
  mbRegular: {
    marginBottom: Sizes.$ieRegularMargin,
  },
});
