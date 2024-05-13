import Constants from 'expo-constants';
import {
  phoneRegex,
  clearRegex,
  emailRegex,
  passwordRegex,
} from '@/utils/AppConstants';

// server url for production api endpoints
// export const ProdServerUri = 'http://13.126.248.37/api/';

// server url for local api endpoints
export const ProdServerUri = Constants?.expoConfig?.hostUri
  ? 'http://' +
    Constants.expoConfig.hostUri.split(`:`).shift().concat(`:8000/api/`)
  : 'http://localhost:8000/api/';

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
