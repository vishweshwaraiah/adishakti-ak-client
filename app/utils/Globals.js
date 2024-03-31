import Constants from 'expo-constants';
import { phoneRegex, clearRegex } from '@/utils/AppConstants';
export const ServerUri = Constants?.expoConfig?.hostUri
  ? 'http://' + Constants.expoConfig.hostUri.split(`:`).shift().concat(`:3000`)
  : `adishakti-kkmr.com`;

export const ValidNumber = (num) => {
  const clearNum = num.replace(clearRegex, '');
  return phoneRegex.test(clearNum);
};
