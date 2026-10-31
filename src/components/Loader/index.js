import './styles.scss';

import React from 'react';

const Loader = () => (
  <div className="loader-wrapper" role="status" aria-live="polite">
    <span className="loader-spinner" aria-hidden="true" />
    <h4>Carregando...</h4>
  </div>
);

export default Loader;
