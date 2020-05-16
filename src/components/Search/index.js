import React from 'react';
import Paginacao from '../paginacao';
import Loader from '../Loader';

const Search = ({
  title = '',
  placeholder = '',
  filters = [],
  searchTerm = '',
  loading = false,
  pagination = {},
  children = [],
  setParam = () => {},
  setSearchTerm = () => {},
  handleSubmit = () => {},
}) => {
  return (
    <div className="columns columns-fix">
      <nav className="panel column is-3">
        <p className="panel-heading">{title}</p>
        <div className="panel-block">
          <p className="control has-icons-left">
            <form className="search" onSubmit={handleSubmit}>
              <div className="field has-addons">
                <div className="control">
                  <input
                    className="input"
                    placeholder={placeholder}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="control">
                  <button type="button" className="button is-info">
                    Buscar
                  </button>
                </div>
              </div>
            </form>
          </p>
        </div>
        {filters.map(({ name, displayName }) => {
          return (
            <button
              key={name}
              type="button"
              className="panel-block"
              onClick={() => setParam('ordenarPor', name)}
            >
              {displayName}
            </button>
          );
        })}
      </nav>

      {loading ? (
        <Loader />
      ) : (
        <div className="columns-fix">
          <div
            className={`columns is-multiline ${
              children.length > 2 ? 'is-centered' : ''
            } `}
          >
            {children}
          </div>
          <Paginacao
            prevPage={pagination.prevPage}
            nextPage={pagination.nextPage}
            pagina={pagination.params.pagina}
            firstPage={pagination.firstPage}
            lastPage={pagination.lastPage}
          />
        </div>
      )}
    </div>
  );
};

export default Search;
