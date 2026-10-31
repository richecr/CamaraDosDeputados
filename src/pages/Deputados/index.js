import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDadosAbertos } from '../../helpers';
import Search from '../../components/Search';
import Hr from '../../components/HorizontalRule';
import DeputadoCard from '../../components/DeputadoCard';
import NotFound from '../../components/NotFound';
import Loader from '../../components/Loader';
import Pagination from '../../components/Pagination';
import RequestError from '../../components/RequestError';

import './styles.scss';

const Deputados = () => {
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get('nome') || '';
  const {
    data: deputados,
    setParam,
    loading,
    error,
    retry,
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
      <Search
        handleSubmit={handleSubmit}
        initialValue={searchTerm}
        submitLabel="Pesquisar deputados"
      />
      <Hr />
      {loading && <Loader />}
      {error && !loading && (
        <RequestError onRetry={retry} message="Não foi possível carregar os deputados." />
      )}
      {!loading && !error && (
        <>
          <div className="content__list">
            {deputados.map((deputado) => (
              <div
                className="column is-4-desktop is-6-tablet is-12-mobile"
                key={deputado.id}
              >
                <DeputadoCard
                  id={deputado.id}
                  nome={deputado.nome}
                  siglaPartido={deputado.siglaPartido}
                  urlFoto={deputado.urlFoto}
                  siglaUf={deputado.siglaUf}
                />
              </div>
            ))}
            {deputados.length === 0 && <NotFound />}
          </div>

          <Pagination onPageChange={gotToPage} totalPages={totalPages} />
        </>
      )}
    </div>
  );
};

export default Deputados;
