import React from 'react';
import { useSearchParams } from 'react-router-dom';

import { useDadosAbertos } from '../../helpers';
import Search from '../../components/Search';
import PartidoCard from '../../components/PartidoCard';
import Hr from '../../components/HorizontalRule';
import NotFound from '../../components/NotFound';
import Loader from '../../components/Loader';
import Pagination from '../../components/Pagination';
import RequestError from '../../components/RequestError';

const Partidos = () => {
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get('sigla') || '';
  const {
    data: partidos,
    setParam,
    loading,
    error,
    retry,
    params,
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
      <Search
        title="Resultado da pesquisa de partidos"
        label="Sigla do partido"
        placeholder="Pesquise pela sigla"
        initialValue={searchTerm}
        submitLabel="Pesquisar partidos"
        handleSubmit={handleSubmit}
      />

      <Hr />
      {loading && <Loader />}
      {error && !loading && (
        <RequestError onRetry={retry} message="Não foi possível carregar os partidos." />
      )}
      {!loading && !error && (
        <>
          <div className="content__list">
            {partidos.map(({ id, nome, sigla }) => (
              <div className="column is-4" key={id}>
                <PartidoCard id={id} nome={nome} sigla={sigla} />
              </div>
            ))}
            {partidos.length === 0 && <NotFound />}
          </div>

          {totalPages > 1 && (
            <Pagination
              onPageChange={gotToPage}
              totalPages={totalPages}
              forcePage={(params.pagina || 1) - 1}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Partidos;
