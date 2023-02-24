import {Result} from './Result';
import {showMessage} from 'react-native-flash-message';

export function getDefaultError<T>(error?: any, caller?: string): Result<T> {
  if (error) {
    if (__DEV__) {
      // eslint-disable-next-line no-console
      console.log(`API Error::${caller}`, error);
    }
  }

  return Result.fail<T>('Something went wrong');
}

export async function resolver<T>(
  promise: Promise<T>,
): Promise<[T | null, any]> {
  try {
    const value = await promise;
    return [value as T, null];
  } catch (error) {
    return [null, error];
  }
}

export const showErrorMessage = (message?: string) => {
  showMessage({message: message ?? 'Something went wrong', type: 'danger'});
};

export const showSuccessMessage = (message?: string) => {
  showMessage({message: message ?? 'Successful', type: 'success'});
};
