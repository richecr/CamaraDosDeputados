import React from 'react';
import PropTypes from 'prop-types';
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import { useDadosAbertos } from '../../helpers';
import Loader from '../Loader';
import NotFound from '../NotFound';
import Pagination from '../Pagination';
import RequestError from '../RequestError';

import './styles.scss';

const formatDate = (value) => {
  if (!value) return null;

  try {
    return format(parseISO(value), 'dd/MM/yyyy', { locale: ptBR });
  } catch {
    return null;
  }
};

const ProposicoesDeputado = ({ id }) => {
  const {
    data: proposicoes,
    loading,
    error,
    retry,
    params,
    totalPages,
    setPage,
  } = useDadosAbertos('proposicoes', {
    idDeputadoAutor: id,
    itens: 5,
    pagina: 1,
    ordem: 'DESC',
  });

  const handlePageChange = ({ selected }) => {
    setPage(selected + 1);
  };

  return (
    <section className="proposicoes-deputado" aria-labelledby="proposicoes-title">
      <header className="proposicoes-deputado__header">
        <div>
          <h2 className="title is-4" id="proposicoes-title">
            Proposições
          </h2>
          <p>Autoria registrada pela Câmara dos Deputados</p>
        </div>
      </header>

      {loading && <Loader />}
      {error && !loading && (
        <RequestError
          message="Não foi possível carregar as proposições."
          onRetry={retry}
        />
      )}
      {!loading && !error && proposicoes.length === 0 && (
        <NotFound text="Nenhuma proposição de autoria encontrada." />
      )}
      {!loading && !error && proposicoes.length > 0 && (
        <>
          <div className="proposicoes-deputado__list" role="list">
            {proposicoes.map((proposicao) => {
              const reference = `${proposicao.siglaTipo} ${proposicao.numero}${
                proposicao.ano > 0 ? `/${proposicao.ano}` : ''
              }`;
              const date = formatDate(proposicao.dataApresentacao);

              return (
                <article
                  className="proposicoes-deputado__item"
                  key={proposicao.id}
                  role="listitem"
                >
                  <div className="proposicoes-deputado__summary">
                    <h3>{reference}</h3>
                    <p>{proposicao.ementa || 'Ementa não informada.'}</p>
                    {date && (
                      <time dateTime={proposicao.dataApresentacao}>
                        Apresentada em {date}
                      </time>
                    )}
                  </div>
                  <a
                    href={`https://www.camara.leg.br/proposicoesWeb/fichadetramitacao?idProposicao=${proposicao.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Abrir ficha oficial: ${reference}`}
                  >
                    Ficha oficial
                  </a>
                </article>
              );
            })}
          </div>
          {totalPages > 1 && (
            <Pagination
              totalPages={totalPages}
              onPageChange={handlePageChange}
              forcePage={(params.pagina || 1) - 1}
            />
          )}
        </>
      )}

      <p className="proposicoes-deputado__source">
        Fonte: API de Dados Abertos da Câmara dos Deputados.
      </p>
    </section>
  );
};

ProposicoesDeputado.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default ProposicoesDeputado;