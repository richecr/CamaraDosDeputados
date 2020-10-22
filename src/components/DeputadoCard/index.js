import React from 'react';
import { Link } from 'react-router-dom';
import {
  AiOutlineRise,
  AiOutlinePushpin,
  AiOutlineClockCircle,
} from 'react-icons/ai';
import Tooltip from 'react-tooltip-lite';
import { formatDistance, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import PropTypes from 'prop-types';
import ItemFooter from './components/CardFooterItem';
import { useDadosAbertos } from '../../helpers';
import Tag from '../Tag';

import noImage from '../../assets/placeholder-user.png';

import './styles.scss';

const DeputadoCard = ({ id, nome, siglaPartido, urlFoto, siglaUf }) => {
  const { data: despesas } = useDadosAbertos(`deputados/${id}/despesas`, {
    ordenarPor: 'dataDocumento',
    ordem: 'DESC',
    ano: 2020,
    itens: 1,
  });

  function formatDate() {
    return (
      (despesas.length > 0 &&
        formatDistance(parseISO(despesas[0].dataDocumento), new Date(), {
          locale: ptBR,
        })) ||
      'Não informado'
    );
  }

  return (
    <Link
      to={`/deputado/${id}`}
      className="deputado-card column is-mobile is-full-mobile is-one-third"
    >
      <div className="card">
        <div className="card-image">
          <figure className="image">
            <img
              className="deputado-img"
              src={urlFoto || noImage}
              onError={(e) => {
                e.currentTarget.src = noImage;
              }}
              alt={`Deputado ${nome}`}
            />
          </figure>
        </div>
        <div className="card-content">
          <div className="media">
            <div className="media-content deputado-info">
              <p className="title">{nome}</p>

              <Tag label="Partido:" value={siglaPartido} warning />
            </div>
          </div>
        </div>
        <div className="card-footer">
          <Tooltip content="Quantidade de despesas" arrow={false}>
            <ItemFooter label="123" icon={<AiOutlineRise />} />
          </Tooltip>
          <Tooltip content="Estado" arrow={false}>
            <ItemFooter label={siglaUf} icon={<AiOutlinePushpin />} />
          </Tooltip>
          <Tooltip content="Ultima despesa" arrow={false}>
            <ItemFooter label={formatDate()} icon={<AiOutlineClockCircle />} />
          </Tooltip>
        </div>
      </div>
    </Link>
  );
};

DeputadoCard.propTypes = {
  id: PropTypes.number.isRequired,
  nome: PropTypes.string.isRequired,
  siglaPartido: PropTypes.string.isRequired,
  urlFoto: PropTypes.string.isRequired,
};

export default DeputadoCard;
