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
          <div className="box despesa" key={despesa.codDocumento || despesa.numDocumento}>
            <h3 class="info-text tags has-addons">
              <span class="tag is-primary ">Fornecedor: </span>
              <span class="tag">{despesa.nomeFornecedor}</span>
            </h3>
            <h3 class="info-text tags has-addons">
              <span class="tag is-primary ">Tipo de despesa: </span>
              <span class="tag">{despesa.tipoDespesa}</span>
            </h3>
            <h3 class="info-text tags has-addons">
              <span class="tag is-primary ">Data: </span>
              <span class="tag">{despesa.dataDocumento || 'Sem data'}</span>
            </h3>
            <h3 class="info-text tags has-addons">
              <span class="tag is-primary ">Valor: </span>
              <span class="tag">R$ {despesa.valorDocumento}</span>
            </h3>
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
