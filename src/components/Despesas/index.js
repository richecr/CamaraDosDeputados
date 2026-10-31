import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { extractParamFromUrl } from '../../helpers';
import Paginacao from '../Pagination';
import Loader from '../Loader';
import NotFound from '../NotFound';
import RequestError from '../RequestError';
import { MdAttachMoney } from 'react-icons/md';

import './styles.scss';

const Despesas = ({ id }) => {
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [despesas, setDespesas] = useState([]);
  const [error, setError] = useState(null);
  const [requestId, setRequestId] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    (async () => {
      setLoading(true);
      setError(null);
      try {
        const {
          data: { dados, links },
        } = await axios.get(
          `https://dadosabertos.camara.leg.br/api/v2/deputados/${id}/despesas`,
          {
            params: {
              ordem: 'DESC',
              ordenarPor: 'dataDocumento',
              itens: 10,
              pagina: currentPage,
            },
            signal: controller.signal,
          }
        );

        if (controller.signal.aborted) return;

        const lastUrl = Array.isArray(links)
          ? links.find((link) => link.rel === 'last')
          : null;

        if (lastUrl) {
          setTotalPages(extractParamFromUrl('pagina', lastUrl.href) || 1);
        }
        setDespesas(dados);
      } catch (requestError) {
        if (!controller.signal.aborted) {
          setError(requestError);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    })();

    return () => controller.abort();
  }, [id, currentPage, requestId]);

  if (loading) return <Loader />;

  if (error) {
    return (
      <div className="despesas">
        <h2 className="title is-4">Despesas</h2>
        <RequestError
          message="Não foi possível carregar as despesas."
          onRetry={() => setRequestId((currentRequestId) => currentRequestId + 1)}
        />
      </div>
    );
  }

  const onPageChange = (data) => {
    const selectedPage = data.selected + 1;
    setCurrentPage(selectedPage);
  };

  return (
    <div className="despesas">
      <h2 className="title is-4">Despesas</h2>
      {despesas.length === 0 && (
        <NotFound text="Nenhuma despesa encontrada para este período." />
      )}
      {despesas.map((despesa) => {
        return (
          <div
            className="box despesa"
            key={despesa.codDocumento || despesa.numDocumento}
          >
            <div className="despesa-section">
              <div className="icon">
                <MdAttachMoney />
              </div>
            </div>
            <div className="despesa-section">
              <p className="description">Tipo de despesa:</p>
              <p className="content">{despesa.tipoDespesa}</p>
            </div>
            <div className="despesa-section">
              <p className="description">Valor:</p>
              <p className="content">{despesa.valorDocumento}</p>
            </div>
            <div className="despesa-section">
              <p className="description">Data:</p>
              <p className="content">{despesa.dataDocumento}</p>
            </div>
            <div className="despesa-section">
              <p className="description">Fornecedor:</p>
              <p className="content">{despesa.nomeFornecedor}</p>
            </div>
          </div>
        );
      })}
      {totalPages > 1 && (
        <Paginacao
          totalPages={totalPages}
          onPageChange={onPageChange}
          forcePage={currentPage - 1}
        />
      )}
    </div>
  );
};

Despesas.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default Despesas;
