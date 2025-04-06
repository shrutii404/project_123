import { useState, useCallback } from 'react';
import { getErrorMessage } from '../error-handling/errorMessages';

interface ApiError {
  message: string;
  code?: string;
  status?: number;
}

export const useApiError = () => {
  const [error, setError] = useState<string | null>(null);

  const handleError = useCallback((error: unknown) => {
    if (typeof error === 'string') {
      setError(getErrorMessage(error));
      return;
    }

    const apiError = error as ApiError;
    if (apiError?.message) {
      setError(getErrorMessage(apiError.message));
      return;
    }

    setError(getErrorMessage('UNKNOWN_ERROR'));
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    error,
    handleError,
    clearError,
  };
};
