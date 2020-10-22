import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';
import { useDadosAbertos } from '../../helpers';
import Search from '../../components/Search';
import Hr from '../../components/HorizontalRule';
import DeputadoCard from '../../components/DeputadoCard';
import NotFound from '../../components/NotFound';
import Loader from '../../components/Loader';

import './styles.scss';

const Deputados = () => {
  const [searchTerm, setSearchTerm] = useState('silva');
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

  // não removi para uma futura implementação
  const filters = [
    {
      name: 'id',
      displayName: 'ID',
    },
    {
      name: 'idLegislatura',
      displayName: 'Id da Legislatura',
    },
    {
      name: 'nome',
      displayName: 'Nome',
    },
    {
      name: 'siglaUF',
      displayName: 'Sigla de UF',
    },
    {
      name: 'siglaPartido',
      displayName: 'Sigla do Partido',
    },
  ];

  return (
    <div className="container">
      <Search handleSubmit={handleSubmit} />
      <Hr />
      {loading && <Loader />}
      <div className="content__list">
        {deputados.map((deputado) => (
          <DeputadoCard
            key={deputado.id}
            id={deputado.id}
            nome={deputado.nome}
            siglaPartido={deputado.siglaPartido}
            urlFoto={deputado.urlFoto}
            siglaUf={deputado.siglaUf}
          />
        ))}
        {deputados.length === 0 && !loading && <NotFound />}
      </div>

      <div>
        <ReactPaginate
          pageCount={totalPages}
          pageRangeDisplayed={5}
          marginPagesDisplayed={1}
          onPageChange={gotToPage}
          containerClassName="paginate__container"
          previousClassName="paginate__previous"
          nextClassName="paginate__next"
          activeClassName="paginate__active"
          pageClassName="paginate__numbers"
          nextLabel="Proxima"
          previousLabel="Anterior"
        />
      </div>
    </div>
  );
};

export default Deputados;
