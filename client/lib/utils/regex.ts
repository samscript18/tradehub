export const REGEX = {
  EMAIL: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  PASSWORD: /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d])[A-Za-z\d[!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]]{8,}$/,
  PHONE_NUMBER: /^\+?[0-9,]+$/
}