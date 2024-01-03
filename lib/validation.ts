export const isValidNepaliPhoneNumber = (value: string): boolean => {
  const nepaliPhoneNumberRegex = /^[9]\d{9}$/; // 10-digit Nepali phone number regex starting with 9
  return nepaliPhoneNumberRegex.test(value);
};
