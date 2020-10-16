import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

import noImage from '../../assets/placeholder-user.png';
import './styles.scss';

const PartidoInfo = ({ match }) => {
  const [partido, setPartido] = useState({});
  const [status, setStatus] = useState({});
  const [lider, setLider] = useState({});
  const { id } = match.params;

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(
        `https://dadosabertos.camara.leg.br/api/v2/partidos/${id}`
      );
      const { dados } = response.data;

      setPartido(dados);
      setStatus(dados.status);
      setLider(dados.status.lider);
    }

    fetchData();
  }, [id]);

  return (
    <div className="divPartido">
      <div className="infoPartido">
        <div className="partido">
          <div>
            <h1>
              {partido.sigla} - {partido.nome}
            </h1>
            <img
              className="deputado-img"
              src={partido.urlLogo}
              onError={(e) => {
                e.currentTarget.src = noImage;
              }}
              alt="Logo do partido"
            />
          </div>
        </div>
        <div className="status">
          <div>
            <h1>Informações</h1>
          </div>
          <div>
            <label>Situação: </label>
            <label className="backgroundYellow">{status.situacao}</label>
            <label>Total de posse: </label>
            <label className="backgroundYellow">{status.totalPosse}</label>
            <label>Total de membros: </label>
            <label className="backgroundYellow">{status.totalMembros}</label>
          </div>
        </div>
      </div>

      <div className="infoPresidente">
        <div>
          <h1 className="">Presidente</h1>
          <img
            className="image-lider"
            src={lider.urlFoto}
            onError={(e) => {
              e.currentTarget.src = noImage;
            }}
            alt="Foto do líder"
          />
          <p>{lider.nome}</p>
        </div>
      </div>
    </div>
  );
};

PartidoInfo.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      name: PropTypes.string.isRequired,
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }),
  }).isRequired,
};

export default PartidoInfo;
