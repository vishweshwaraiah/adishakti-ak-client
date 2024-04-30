export const phoneRegex = /^[+]{1}(?:[0-9\-\\(\\)\\/.]\s?){11}[0-9]{1}$/;
export const clearRegex = /[^0-9+]+/g;
export const emailRegex =
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
export const passwordRegex =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
