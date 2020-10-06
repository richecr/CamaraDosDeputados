import './styles.scss';

import React from 'react';
import Spinner from '../../assets/spinner.svg';

const Loader = () => (
  <div className="loader-wrapper">
    <img src={Spinner} alt="Carregando..." />
  </div>
);

export default Loader;
