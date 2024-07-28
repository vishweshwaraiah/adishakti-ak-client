import React, { memo } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import MasterIcon from '@/components/MasterIcon';
import Sizes from '@/utils/Sizes';
import { useTheme } from '@/themes/ThemeProvider';

const ContactItem = (props) => {
  const { contact, onPress = () => {}, noActions = false } = props;

  const { theme } = useTheme();

  const handlePress = () => {
    if (!noActions) {
      contact.selected = !contact?.selected;
      onPress(contact);
    }
  };

  const styles = StyleSheet.create({
    contactContainer: {
      gap: Sizes.$ieFlexGap,
      backgroundColor: theme.itemBg,
      padding: Sizes.$ieRegularPadding,
      borderRadius: Sizes.$ieRegularRadius,
      overflow: 'hidden',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'row',
      width: '96%',
      margin: Sizes.$ieRegularMargin,
    },
    placeholder: {
      width: 55,
      height: 55,
      borderRadius: 30,
      overflow: 'hidden',
      backgroundColor: theme.itemColor,
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'center',
    },
    contactData: {
      flex: 1,
      justifyContent: 'center',
      paddingLeft: 15,
      borderRadius: Sizes.$ieRegularRadius,
    },
    thumbTxt: {
      fontSize: 20,
      color: theme.itemBg,
    },
    contactName: {
      fontSize: 16,
      color: theme.itemColor,
    },
    phoneNumber: {
      color: theme.itemSelected,
    },
    isSelected: {
      opacity: 0.6,
      borderRadius: Sizes.$ieRegularRadius,
      borderBottomWidth: 0.5,
      borderBottomColor: theme.black,
    },
    isUnSelected: {
      backgroundColor: 'transparent',
      borderBottomWidth: 0.5,
      borderBottomColor: theme.black,
    },
  });

  return (
    <Pressable
      style={
        contact?.selected && !noActions
          ? styles.isSelected
          : styles.isUnSelected
      }
      onPress={handlePress}
    >
      <View style={styles.contactContainer}>
        <View style={styles.placeholder}>
          {contact?.selected && !noActions ? (
            <MasterIcon
              iconName='check-square'
              iconSize={32}
              iconColor={theme.itemBg}
              iconFamily='Feather'
            />
          ) : (
            <Text style={styles.thumbTxt}>{contact?.name?.[0]}</Text>
          )}
        </View>
        <View style={styles.contactData}>
          <Text style={styles.contactName}>{contact?.name || 'No Name'}</Text>
          <Text style={styles.phoneNumber}>
            {contact?.phoneNumber || 'No number!'}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

export default memo(ContactItem);
