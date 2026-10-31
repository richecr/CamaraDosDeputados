import React from 'react';
import PropTypes from 'prop-types';

import './styles.scss';

const RequestError = ({
  message = 'Não foi possível carregar os dados. Tente novamente.',
  onRetry,
}) => (
  <div className="request-error" role="alert">
    <p>{message}</p>
    <button type="button" onClick={onRetry}>
      Tentar novamente
    </button>
  </div>
);

RequestError.propTypes = {
  message: PropTypes.string,
  onRetry: PropTypes.func.isRequired,
};

export default RequestError;