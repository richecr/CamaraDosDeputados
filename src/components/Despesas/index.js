import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Axios from 'axios';
import {extractParamFromUrl} from '../../helpers'
import Paginacao from '../Pagination';
import Loader from '../Loader';
import { MdAttachMoney } from 'react-icons/md';

import './styles.scss';

const Despesas = ({ id }) => {
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [despesas, setDespesas] = useState([]);


  useEffect(() => {
    (async () => getDespesas())();
  }, [currentPage])

  const getDespesas = async () => {
      setLoading(true);
      try {
        const {
          data: {dados, links}
        } = await Axios.get(
          `https://dadosabertos.camara.leg.br/api/v2/deputados/${id}/despesas`,
          {
            params: {

          ordem: 'DESC',
          ordenarPor: 'dataDocumento',
          itens: 10,
          pagina: currentPage,
            }
          }
        );

        const lastUrl = links.find((link) => link.rel === 'last');

        setTotalPages(extractParamFromUrl('pagina', lastUrl.href))
        setDespesas(dados);

      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
      };
  
  const ref = useRef(null);

  if (loading) return <Loader />;

  if (ref.current) {
    window.scrollTo(0, ref.current.offsetTop);
  }
  
  const onPageChange = (data) => {
    const selectedPage = data.selected + 1;
    setCurrentPage(selectedPage);
  }



  return (
    <div className="despesas">
      <h2 className="title is-4">Despesas</h2>
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
      <div>
        <Paginacao
          totalPages={totalPages}
          onPageChange={onPageChange}
          forcePage={currentPage - 1}
        />
      </div>

    </div>
  );
};

Despesas.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default Despesas;
