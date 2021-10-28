import React, { useState } from 'react';
import { useDadosAbertos } from '../../helpers';
import Search from '../../components/Search';
import Hr from '../../components/HorizontalRule';
import DeputadoCard from '../../components/DeputadoCard';
import NotFound from '../../components/NotFound';
import Loader from '../../components/Loader';
import Pagination from '../../components/Pagination';

import './styles.scss';

const Deputados = () => {
  const [searchTerm] = useState('');
  const {
    data: deputados,
    setParam,
    loading,
    totalPages,
    setPage,
  } = useDadosAbertos('deputados', {
    nome: searchTerm,
    ordenarPor: 'nome',
    itens: 12,
  });

  const handleSubmit = (value) => {
    setParam('nome', value);
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
        {deputados.map((deputado) => (
          <div className="column is-4" key={deputado.id}>
            <DeputadoCard
              key={deputado.id}
              id={deputado.id}
              nome={deputado.nome}
              siglaPartido={deputado.siglaPartido}
              urlFoto={deputado.urlFoto}
              siglaUf={deputado.siglaUf}
            />
          </div>
        ))}
        {deputados.length === 0 && !loading && <NotFound />}
      </div>

      <div>
        <Pagination onPageChange={gotToPage} totalPages={totalPages} />
      </div>
    </div>
  );
};

export default Deputados;
