import {
  phoneRegex,
  clearRegex,
  emailRegex,
  passwordRegex,
  LocalServerUri,
  ProductionServerUri,
} from '@/utils/AppConstants';

// enable(make true) here to use local api endpoints
const localEnv = true;

const Globals = {
  localEnv,
};

export const ProdServerUri = localEnv ? LocalServerUri : ProductionServerUri;

export const ValidNumber = (number) => {
  if (!number) {
    return false;
  } else if (Number.isNaN(number)) {
    return false;
  } else {
    const clearNum = number?.replace(clearRegex, '');
    return phoneRegex.test(clearNum);
  }
};

export const ValidEmail = (email) => {
  const isValid = emailRegex.test(email);
  return isValid;
};

export const ValidPassword = (password) => {
  return passwordRegex.test(password);
};

export const trimmedText = (text, size = 15) => {
  if (!text) return false;

  const displayText =
    text.length <= size ? `${text}` : `${text.substring(0, size)}...`;

  return displayText;
};

export const OptimizeContacts = (rawContacts = []) => {
  if (!rawContacts.length) return false;

  const Optimized = rawContacts.map((x) => {
    const phoneNumber = x.phoneNumbers?.[0].number;
    const numFormat = phoneNumber?.replace(/\D/g, '');
    const contact = {
      id: x.id,
      firstName: x.firstName || '',
      lastName: x.lastName || '',
      name: x.name,
      phoneNumber: numFormat,
      selected: x.selected ? x.selected : false,
    };
    return contact;
  });

  return Optimized;
};

export default Globals;
