import React from 'react';
import AuthTemplate from '@/wrappers/AuthTemplate';
import ContactsList from '@/components/Contacts/ContactsList';

const ContactsScreen = () => {
  return (
    <AuthTemplate screenName='Contacts'>
      <ContactsList sceenTitle='Conatcts' />
    </AuthTemplate>
  );
};

export default ContactsScreen;
