import React, { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import AuthTemplate from '@/wrappers/AuthTemplate';
import ContactsList from '@/components/Contacts/ContactsList';
import Sizes from '@/utils/Sizes';
import { useTheme } from '@/themes/ThemeProvider';

const ContactsScreen = () => {
  const { theme } = useTheme();

  const [selected, setSelected] = useState(0);
  const [total, setTotal] = useState(0);

  const handleSelect = (details) => {
    setSelected(details.selected);
    setTotal(details.total);
  };

  const styles = StyleSheet.create({
    titleContainer: {
      borderBottomWidth: 1,
    },
    sectionTitle: {
      fontSize: Sizes.$ieTitleFont,
      paddingHorizontal: Sizes.$ieLargePadding,
      paddingVertical: Sizes.$ieRegularPadding,
      fontWeight: 'bold',
      color: theme.titleColor,
    },
    contactsList: {
      flex: 1,
      paddingHorizontal: Sizes.$ieRegularPadding,
    },
    selectionText: {
      paddingHorizontal: Sizes.$ieLargePadding,
      paddingBottom: Sizes.$ieRegularPadding,
      gap: Sizes.$ieFlexGap,
      flexDirection: 'row',
    },
  });

  return (
    <AuthTemplate screenName='Contacts'>
      <View style={styles.titleContainer}>
        <Text style={styles.sectionTitle}>Contacts</Text>
        <View style={styles.selectionText}>
          {!!selected && <Text>{selected} Selected</Text>}
          <Text>Total {total} Contacts</Text>
        </View>
      </View>
      <View style={styles.contactsList}>
        <ContactsList onSelectText={handleSelect} />
      </View>
    </AuthTemplate>
  );
};

export default ContactsScreen;
