import React from 'react';
import { FaSearch } from 'react-icons/fa';
import PropTypes from 'prop-types';
import Tooltip from 'react-tooltip-lite';

import './styles.scss';

const Search = ({ handleSubmit }) => {
  function keyPress({ key, target }) {
    if (key === 'Enter') {
      handleSubmit(target.value);
    }
  }

  return (
    <div className="search__container">
      <h2 className="title__label">Resultado da Pesquisa:</h2>

      <div className="search__field__container">
        <Tooltip
          content="Digite o nome e pressione enter"
          arrow={false}
          direction="down"
        >
          <input
            type="text"
            placeholder="Pesquise pelo nome"
            onKeyPress={keyPress}
          />
        </Tooltip>
        <FaSearch />
      </div>
    </div>
  );
};

Search.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

export default Search;
