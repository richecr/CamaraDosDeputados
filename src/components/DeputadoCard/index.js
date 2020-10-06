import './styles.scss';
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import noImage from '../../assets/placeholder-user.png';

const DeputadoCard = ({ id, nome, siglaPartido, urlFoto }) => {
  return (
    <div className="deputado-card card">
      <div className="card-image">
        <figure className="image">
          <img
            className="deputado-img"
            src={urlFoto}
            onError={(e) => {
              e.currentTarget.src = noImage;
            }}
            alt="Foto do deputado"
          />
        </figure>
      </div>
      <div className="card-content">
        <div className="media">
          <div className="media-content deputado-info">
            <p className="title">{nome}</p>
            <p className="tags has-addons">
              <span className="tag">Partido:</span>
              <span className="tag is-primary">{siglaPartido}</span>
            </p>
          </div>
        </div>
        <div className="content">
          <Link
            className="detalhes-link card-footer-item"
            to={`/deputado/${id}`}
          >
            Ver Detalhes
          </Link>
        </div>
      </div>
    </div>
  );
};

DeputadoCard.propTypes = {
  id: PropTypes.number.isRequired,
  nome: PropTypes.string.isRequired,
  siglaPartido: PropTypes.string.isRequired,
  urlFoto: PropTypes.string.isRequired,
};

export default DeputadoCard;
