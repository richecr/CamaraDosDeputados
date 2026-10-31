import React from 'react';
import { Link } from 'react-router-dom';
import { AiOutlinePushpin, AiOutlineArrowRight } from 'react-icons/ai';
import PropTypes from 'prop-types';
import ItemFooter from './components/CardFooterItem';
import Tag from '../Tag';

import noImage from '../../assets/placeholder-user.png';

import './styles.scss';

const DeputadoCard = ({ id, nome, siglaPartido, urlFoto, siglaUf }) => {
  return (
    <Link
      to={`/deputado/${id}`}
      className="deputado-card"
    >
      <article className="card">
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
              <p className="title is-6">{nome}</p>
              <Tag label="Partido:" value={siglaPartido} warning />
            </div>
          </div>
        </div>
        <div className="card-footer">
          <ItemFooter
            label={siglaUf || 'UF não informada'}
            icon={<AiOutlinePushpin />}
            title="Estado"
          />
          <span className="deputado-card__action">
            Ver perfil <AiOutlineArrowRight aria-hidden="true" />
          </span>
        </div>
      </article>
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
