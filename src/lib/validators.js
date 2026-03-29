function digitsOnly(value) {
  return String(value || '').replace(/\D/g, '');
}

export const isEmailValid = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value || '').trim());
export const isPhoneValid = (value) => {
  const digits = digitsOnly(value);
  return digits.length >= 10 && digits.length <= 15;
};
export const isReasonableDogAge = (value) => Number(value) > 0 && Number(value) <= 25;
export const isReasonableDogWeight = (value) => Number(value) >= 1 && Number(value) <= 100;

export function formatCardNumber(value) {
  return digitsOnly(value)
    .slice(0, 16)
    .replace(/(.{4})/g, '$1 ')
    .trim();
}

export function formatExpiry(value) {
  const digits = digitsOnly(value).slice(0, 4);
  if (digits.length <= 2) return digits;
  return `${digits.slice(0, 2)}/${digits.slice(2)}`;
}

export function formatCvc(value) {
  return digitsOnly(value).slice(0, 4);
}

function passesLuhn(rawDigits) {
  let sum = 0;
  let shouldDouble = false;

  for (let index = rawDigits.length - 1; index >= 0; index -= 1) {
    let digit = Number(rawDigits[index]);
    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
    shouldDouble = !shouldDouble;
  }

  return sum % 10 === 0;
}

export const isCardNumberValid = (value) => {
  const digits = digitsOnly(value);
  return digits.length === 16 && passesLuhn(digits);
};

export const isCvcValid = (value) => {
  const digits = digitsOnly(value);
  return digits.length >= 3 && digits.length <= 4;
};

export function isExpiryValid(value, now = new Date()) {
  const [mm, yy] = String(value || '').split('/');
  if (!/^\d{2}$/.test(String(mm || '')) || !/^\d{2}$/.test(String(yy || ''))) return false;

  const month = Number(mm);
  const year = Number(yy);
  if (month < 1 || month > 12) return false;

  const fullYear = 2000 + year;
  const expiry = new Date(fullYear, month, 0, 23, 59, 59, 999);
  return expiry.getTime() >= now.getTime();
}
