import "./DeputadoCard.scss";
import React from "react";
import { Link } from "react-router-dom";

const DeputadoCard = ({ id, nome, siglaPartido, urlFoto }) => {
  return (
    <div class="deputado-card card">
      <div class="card-image">
        <figure class="image">
          <img className="deputado-img" src={urlFoto} />
        </figure>
      </div>
      <div class="card-content">
        <div class="media">
          <div class="media-content deputado-info">
            <p class="title">{nome}</p>
            <p class="tags has-addons">
              <span class="tag">Partido:</span>
              <span class="tag is-primary">{siglaPartido}</span>
            </p>
          </div>
        </div>
        <div class="content">
          <Link
            className="detalhes-link card-footer-item"
            to={"/deputado/" + id}
          >
            Ver Detalhes
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DeputadoCard;
