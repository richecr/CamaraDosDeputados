import React from 'react';
import { BiError } from 'react-icons/bi';
import PropTypes from 'prop-types';

import './styles.scss';

const NotFound = ({ text = 'Nenhum registro encontrado' }) => {
  return (
    <div className="not-found">
      <BiError />
      <h4>{text}</h4>
    </div>
  );
};

NotFound.propTypes = {
  text: PropTypes.string,
};

export default NotFound;
