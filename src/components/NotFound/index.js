import React from 'react';
import { BiError } from 'react-icons/bi';
import PropTypes from 'prop-types';

import './styles.scss';

const NotFound = ({ text }) => {
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

NotFound.defaultProps = {
  text: 'Nenhum registro encontrado',
};

export default NotFound;
