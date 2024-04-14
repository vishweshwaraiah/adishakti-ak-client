import Constants from 'expo-constants';
import { phoneRegex, clearRegex } from '@/utils/AppConstants';
export const ServerUri = Constants?.expoConfig?.hostUri
  ? 'http://' + Constants.expoConfig.hostUri.split(`:`).shift().concat(`:3000`)
  : `http://13.126.248.37/api`;

export const ValidNumber = (num) => {
  const clearNum = num.replace(clearRegex, '');
  return phoneRegex.test(clearNum);
};

export const trimmedText = (text, size = 15) => {
  if (!text) return false;

  const displayText =
    text.length <= size ? `${text}` : `${text.substring(0, size)}...`;

  return displayText;
};
