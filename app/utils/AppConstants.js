import Constants from 'expo-constants';

export const phoneRegex = /^(?:[0-9\-\\(\\)\\.]\s?){11}[0-9]{1}$/;
export const clearRegex = /[^0-9+]+/g;
export const emailRegex =
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
export const passwordRegex =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

// server url for local api endpoints
export const LocalServerUri = Constants?.expoConfig?.hostUri
  ? 'http://' +
    Constants.expoConfig.hostUri.split(`:`).shift().concat(`:8000/api/`)
  : 'http://localhost:8000/api/';

// server url for production api endpoints
export const ProductionServerUri = 'http://13.126.248.37/api/';

const AppConstants = {
  phoneRegex,
  clearRegex,
  emailRegex,
  passwordRegex,
  LocalServerUri,
  ProductionServerUri,
};

export default AppConstants;
