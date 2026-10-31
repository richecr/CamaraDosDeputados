import React from 'react';
import PropTypes from 'prop-types';

function Tag({
  label,
  value,
  info = false,
  primary = false,
  white = false,
  warning = false,
}) {
  return (
    <h3 className="tags has-addons info-text">
      <span className={`tag  ${primary && 'is-primary'} ${info && 'is-info'}`}>
        {label}
      </span>
      <span
        className={`tag  ${white && 'is-white'} ${warning && 'is-warning'}`}
      >
        {value || 'Não informado'}
      </span>
    </h3>
  );
}

Tag.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  info: PropTypes.bool,
  primary: PropTypes.bool,
  white: PropTypes.bool,
  warning: PropTypes.bool,
};

export default Tag;
