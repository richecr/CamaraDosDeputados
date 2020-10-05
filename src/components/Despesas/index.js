import React, { useRef } from 'react';
import { useDadosAbertos } from '../../helpers';
import Paginacao from '../paginacao';
import Loader from '../Loader';
import Tag from '../Tag';

import './despesas.css';

const Despesas = ({ id }) => {
  const {
    params,
    prevPage,
    lastPage,
    nextPage,
    firstPage,
    loading,
    data: despesas,
  } = useDadosAbertos(`/deputados/${id}/despesas`, {
    ordem: 'DESC',
    ordenarPor: 'dataDocumento',
  });
  const ref = useRef(null);

  if (loading) return <Loader />;

  if (ref.current) {
    window.scrollTo(0, ref.current.offsetTop);
  }

  return (
    <section className="info-card" ref={ref}>
      <h2 className="title is-4">Despesas</h2>
      {despesas.map((despesa) => {
        return (
          <div
            className="box despesa"
            key={despesa.codDocumento || despesa.numDocumento}
          >
            <Tag label="Fornecedor: " value={despesa.nomeFornecedor} primary />
            <Tag
              label="Tipo de despesa: "
              value={despesa.tipoDespesa}
              primary
            />
            <Tag label="Data: " value={despesa.dataDocumento} primary />
            <Tag label="Valor: " value={despesa.valorDocumento} primary />
          </div>
        );
      })}
      <div>
        <Paginacao
          prevPage={prevPage}
          nextPage={nextPage}
          pagina={params.pagina}
          firstPage={firstPage}
          lastPage={lastPage}
        />
      </div>
    </section>
  );
};

export default Despesas;
