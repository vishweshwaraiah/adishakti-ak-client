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
import MasterSelect from '@/components/MasterSelect';
import useMasterStyle from '@/utils/useMasterStyle';
import SendToFew from '@/components/Messages/SendToFew';
import SendToGroup from '@/components/Messages/SendToGroup';
import { useTheme } from '@/themes/ThemeProvider';
import MasterIcon from '@/components/MasterIcon';

const MasterChats = (props) => {
  const {
    onSendClick = () => {},
    numbersList = [],
    selectOptions = [],
    resetAction = {},
  } = props;

  const { theme } = useTheme();
  const mStyles = useMasterStyle();

  const [textMessage, setTextMessage] = useState('');
  const [phonesArray, setPhonesArray] = useState([]);
  const [enteredList, setEnteredList] = useState([]);
  const [groupList, setGroupList] = useState([]);
  const [selected, setSelected] = useState(undefined);
  const [sendType, setSendType] = useState(undefined);

  const resetForm = () => {
    setTextMessage('');
    setPhonesArray([]);
    setEnteredList([]);
    setSelected(undefined);
    setSendType(undefined);
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

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: Sizes.$ieRegularPadding,
      height: '100%',
    },
    mainBox: {
      position: 'relative',
      backgroundColor: theme.itemBg,
      padding: Sizes.$ieExtraPadding,
      borderRadius: Sizes.$ieRegularRadius,
      ...mStyles.commonShadow,
    },
    inputBox: {
      justifyContent: 'center',
      flexWrap: 'wrap',
      minHeight: 80,
      maxHeight: 200,
      color: theme.itemColor,
    },
    sendIconBox: {
      position: 'relative',
      padding: Sizes.$ieRegularPadding,
      borderTopColor: theme.secondary,
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
    messageTitle: {
      fontSize: Sizes.$ieTitleFont,
      marginBottom: Sizes.$ieRegularMargin,
      fontWeight: 'bold',
      color: theme.titleColor,
    },
  });

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        enabled
        style={styles.container}
      >
        <Text style={styles.messageTitle}>Choose an option below</Text>
        <View style={styles.mbRegular}>
          <MasterSelect selectData={selectOptions} onSelect={setSelected} />
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
            placeholderTextColor={theme.itemColor}
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
              <MasterIcon
                iconFamily='FontAwesome'
                iconName='send-o'
                iconSize={24}
                iconColor={theme.itemColor}
              />
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default MasterChats;
