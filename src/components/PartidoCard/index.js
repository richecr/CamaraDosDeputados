import './PartidoCard.scss';
import React from 'react';
import { Link } from 'react-router-dom';

const PartidoCard = ({ id, nome, sigla }) => {
  return (
    <article key={id} className="partido-card card">
      <div className="card-content">
        <div className="media">
          <div className="media-content">
            <p className="title">{nome}</p>
            <p className="subtitle">{sigla}</p>
          </div>
        </div>
      </div>
      <footer className="card-footer">
        <Link className="detalhes-link card-footer-item" to={`/partido/${id}`}>
          Ver Detalhes
        </Link>
      </footer>
    </article>
  );
};

export default PartidoCard;
