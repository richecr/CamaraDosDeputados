import React, { useRef } from 'react';
import { useDadosAbertos } from '../../helpers';
import Paginacao from '../paginacao';
import Loader from '../loader';

import './despesas.css';

const Despesas = ({ id }) => {
  const { params, prevPage, lastPage, nextPage, firstPage, loading, data: despesas } = useDadosAbertos(`/deputados/${id}/despesas`, {
    ordem: 'ASC',
    ordenarPor: 'dataDocumento'
  });
  const ref = useRef(null);

  if (loading) return <Loader />;

  if (ref.current) {
    window.scrollTo(0, ref.current.offsetTop);
  }

  return (
    <section className="info-card" ref={ref}>
      <h2 class="title is-4">Despesas</h2>
      {despesas.map(despesa => {
        return (
          <div className="despesa" key={despesa.codDocumento || despesa.numDocumento}>
            <div>
              <span className="has-text-weight-bold	">Fornecedor: </span>
              {despesa.nomeFornecedor}
            </div>
            <div>
              <span className="has-text-weight-bold	">Tipo de despesa: </span>
              {despesa.tipoDespesa}
            </div>
            <div>
              <span className="has-text-weight-bold	">Data: </span>
              {despesa.dataDocumento || 'Sem data'}
            </div>
            <div>
              <span className="has-text-weight-bold	">Valor: </span>
              R$ {despesa.valorDocumento}
            </div>
          </div>
        );
      })}
      <div>
        <Paginacao prevPage={prevPage} nextPage={nextPage} pagina={params.pagina} firstPage={firstPage} lastPage={lastPage} />
      </div>
    </section>
  );
};

export default Despesas;
