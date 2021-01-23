import React, { useState } from 'react';

import { useDadosAbertos } from '../../helpers';
import Search from '../../components/Search';
import PartidoCard from '../../components/PartidoCard';
import Hr from '../../components/HorizontalRule';
import NotFound from '../../components/NotFound';
import Loader from '../../components/Loader';
import Pagination from '../../components/Pagination';

const Partidos = () => {
  const [searchTerm] = useState('');
  const {
    data: partidos,
    setParam,
    loading,
    totalPages,
    setPage,
  } = useDadosAbertos('partidos', {
    sigla: searchTerm,
    ordenarPor: 'nome',
  });

  const handleSubmit = (value) => {
    setParam('sigla', value);
  };

  const gotToPage = (page) => {
    setPage(page.selected + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="container">
      <Search handleSubmit={handleSubmit} />

      <Hr />
      {loading && <Loader />}
      <div className="content__list">
        {partidos.map(({ id, nome, sigla }) => (
          <div className="column is-4" key={id}>
            <PartidoCard id={id} nome={nome} sigla={sigla} />
          </div>
        ))}
        {partidos.length === 0 && !loading && <NotFound />}
      </div>

      <div>
        <Pagination onPageChange={gotToPage} totalPages={totalPages} />
      </div>
    </div>
  );
};

export default Partidos;
