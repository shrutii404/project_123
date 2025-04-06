type ErrorMessage = { [key: string]: string };

export const ErrorMessages: ErrorMessage = {
  // Network Errors
  NETWORK_ERROR: 'Network error. Please check your internet connection.',
  SERVER_ERROR: 'Server error. Please try again later.',
  TIMEOUT_ERROR: 'Request timed out. Please try again.',

  // Authentication Errors
  INVALID_CREDENTIALS: 'Invalid email or password.',
  SESSION_EXPIRED: 'Your session has expired. Please login again.',
  UNAUTHORIZED: 'You are not authorized to perform this action.',

  // Form Validation Errors
  REQUIRED_FIELD: 'This field is required.',
  INVALID_EMAIL: 'Please enter a valid email address.',
  INVALID_PASSWORD: 'Password must be at least 8 characters long.',
  PASSWORD_MISMATCH: 'Passwords do not match.',

  // Data Errors
  DATA_NOT_FOUND: 'The requested data could not be found.',
  INVALID_DATA: 'Invalid data provided.',
  UPDATE_FAILED: 'Failed to update. Please try again.',

  // Generic Errors
  UNKNOWN_ERROR: 'An unexpected error occurred. Please try again.',
  OPERATION_FAILED: 'Operation failed. Please try again.',
  INVALID_PHONE: 'Please enter a valid phone number.',
  INVALID_OTP: 'Please enter a valid OTP code.'
} as const;

const errorKeys = {
  NETWORK_ERROR: 'NETWORK_ERROR',
  SERVER_ERROR: 'SERVER_ERROR',
  TIMEOUT_ERROR: 'TIMEOUT_ERROR',
  INVALID_CREDENTIALS: 'INVALID_CREDENTIALS',
  SESSION_EXPIRED: 'SESSION_EXPIRED',
  UNAUTHORIZED: 'UNAUTHORIZED',
  REQUIRED_FIELD: 'REQUIRED_FIELD',
  INVALID_EMAIL: 'INVALID_EMAIL',
  INVALID_PASSWORD: 'INVALID_PASSWORD',
  PASSWORD_MISMATCH: 'PASSWORD_MISMATCH',
  DATA_NOT_FOUND: 'DATA_NOT_FOUND',
  INVALID_DATA: 'INVALID_DATA',
  UPDATE_FAILED: 'UPDATE_FAILED',
  UNKNOWN_ERROR: 'UNKNOWN_ERROR',
  OPERATION_FAILED: 'OPERATION_FAILED',
  INVALID_PHONE: 'INVALID_PHONE',
  INVALID_OTP: 'INVALID_OTP',
} as const;

export type ErrorMessageKey = keyof typeof errorKeys;

export const getErrorMessage = (key: ErrorMessageKey | string, fallback?: string): string => {
  const errorKey = key as keyof typeof ErrorMessages;
  if (errorKey in ErrorMessages) {
    return ErrorMessages[errorKey];
  }
  if (typeof key === 'string' && key.trim()) {
    return key;
  }
  return fallback || ErrorMessages.UNKNOWN_ERROR;
};
