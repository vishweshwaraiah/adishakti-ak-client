import {
  phoneRegex,
  clearRegex,
  emailRegex,
  passwordRegex,
  LocalServerUri,
  ProductionServerUri,
} from '@/utils/AppConstants';

// enable(make true) here to use local api endpoints
const localEnv = false;

export const ProdServerUri = localEnv ? LocalServerUri : ProductionServerUri;

export const ValidNumber = (num) => {
  const clearNum = num?.replace(clearRegex, '');
  return phoneRegex.test(clearNum);
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
