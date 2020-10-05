import React from 'react';

function Tag({ label, value, info, primary, white }) {
  return (
    <h3 className="tags has-addons info-text">
      <span className={`tag  ${primary && 'is-primary'} ${info && 'is-info'}`}>
        {label}
      </span>
      <span className={`tag  ${white && 'is-white'}`}>
        {value || 'Não informado'}
      </span>
    </h3>
  );
}

export default Tag;
