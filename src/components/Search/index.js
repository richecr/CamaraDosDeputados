import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import PropTypes from 'prop-types';

import './styles.scss';

const Search = ({
  handleSubmit,
  title = 'Resultado da pesquisa',
  label = 'Nome do deputado',
  placeholder = 'Pesquise pelo nome',
  initialValue = '',
  className = '',
  submitLabel = 'Pesquisar',
}) => {
  const [value, setValue] = useState(initialValue);

  function submitSearch(event) {
    event.preventDefault();
    handleSubmit(value.trim());
  }

  return (
    <div className={`search__container ${className}`}>
      <h2 className="title__label">{title}</h2>
      <form className="search__field__container" onSubmit={submitSearch}>
        <label className="visually-hidden" htmlFor="deputy-search">
          {label}
        </label>
        <input
          id="deputy-search"
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(event) => setValue(event.target.value)}
        />
        <button type="submit" aria-label={submitLabel}>
          <FaSearch aria-hidden="true" />
        </button>
      </form>
    </div>
  );
};

Search.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  title: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  initialValue: PropTypes.string,
  className: PropTypes.string,
  submitLabel: PropTypes.string,
};

export default Search;
