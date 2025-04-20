import React from 'react';

import { BASE_RESPONSE, ValidationError } from '../apis/types/apis.type';

import { ErrorMessageProps } from './types/errorMessage.type';
import Error from './ui/Error';
import { ValidationErrorString } from '../constants/variables';

/**
 * Renders an error message based on the provided error object.
 *
 * If the error has a non-null `status` property and its `message` property is not
 * 'Validation error', it renders the error message with the status code.
 *
 * If the error has a non-null `error` property and its `message` property is
 * 'Validation error', it renders the validation errors.
 *
 * @param {{ error: BASE_RESPONSE | undefined }} props - The error object.
 * @returns {React.ReactElement} A React element displaying the error message.
 */
const ErrorMessage = ({ error }: ErrorMessageProps): React.ReactElement => {
  const TYPED_ERROR = error as unknown as BASE_RESPONSE;

  return (
    <>
      {TYPED_ERROR && TYPED_ERROR.message !== ValidationErrorString && (
        <Error.Message
          statusCode={TYPED_ERROR?.status}
          msg={TYPED_ERROR?.message}
        />
      )}

      {error?.error && error.message === ValidationErrorString && (
        <Error.ValidationErrors data={error?.error as ValidationError[]} />
      )}
    </>
  );
};

export default ErrorMessage;
