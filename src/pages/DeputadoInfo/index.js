import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Despesas from '../../components/Despesas';
import Tag from '../../components/Tag';

import noImage from '../../assets/placeholder-user.png';

import './styles.scss';

const DeputadoInfo = ({ match }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [deputado, setDeputado] = useState(null);
  const { id } = match.params;

  useEffect(() => {
    async function fetchDeputado() {
      const { data } = await axios.get(
        `https://dadosabertos.camara.leg.br/api/v2/deputados/${id}`
      );

      setIsLoading(false);
      console.log(data.dados);
      setDeputado(data.dados);
    }

    fetchDeputado();
  }, [id]);

  return (
    <div className="deputado">
      {!isLoading && deputado !== null && (
        <>
          <div className="title">
            <div className="basic-info"></div>
          </div>
          <div className="info-deputado">
            <section className="avatar"></section>
            <section className="info-card">
              <div className="info-card-container">
                <div className="info-card-avatar">
                  <figure className="deputado-photo">
                    <img
                      width="114"
                      height="152"
                      id="avatar"
                      alt={deputado.nomeCivil}
                      src={deputado.ultimoStatus.urlFoto}
                      onError={(e) => {
                        e.currentTarget.src = noImage;
                      }}
                    />
                  </figure>

                  <Tag
                    label="Condição Eleitoral: "
                    value={deputado.ultimoStatus.condicaoEleitoral}
                    white
                    info
                  />

                  {deputado.ultimoStatus.situacao && (
                    <Tag
                      label="Situação: "
                      value={deputado.ultimoStatus.situacao}
                      white
                      info
                    />
                  )}
                </div>
                <div className="info-card-data">
                  <div className="info-card-data-personal">
                    <div className="info-card-data-header">
                      <h2 className="title is-4">{deputado.nomeCivil}</h2>
                    </div>
                    <div className="info-card-data-section bordered">
                      <div className="info-card-data-subsection">
                        <p className="info">
                          Estado: {deputado.ultimoStatus.siglaUf}
                        </p>
                        <p className="info">
                          Nome: {deputado.ultimoStatus.nome}
                        </p>
                        <p className="info">CPF: {deputado.cpf}</p>
                        <p className="info">
                          Sigla Partido: {deputado.ultimoStatus.siglaPartido}
                        </p>
                      </div>
                      <div className="info-card-data-subsection">
                        <p className="info">
                          ID Legislatura: {deputado.ultimoStatus.idLegislatura}
                        </p>
                        <p className="info">
                          Data de Nascimento: {deputado.dataNascimento}
                        </p>
                        <p className="info">
                          Naturalidade: {deputado.municipioNascimento}
                        </p>
                        <p className="info">
                          Nível de escolaridade: {deputado.escolaridade}
                        </p>
                      </div>
                    </div>
                    <hr className="divider" />
                    <div className="info-card-data-header">
                      <h3 className="title is-4">Gabinete</h3>
                    </div>
                    <div className="info-card-data-section">
                      <div className="info-card-data-subsection">
                        <p className="info">
                          Nome: {deputado.ultimoStatus.gabinete.nome}
                        </p>
                        <p className="info">
                          Prédio: {deputado.ultimoStatus.gabinete.predio}
                        </p>
                        <p className="info">
                          Sala: {deputado.ultimoStatus.gabinete.sala}
                        </p>
                      </div>
                      <div className="info-card-data-subsection">
                        <p className="info">
                          Andar: {deputado.ultimoStatus.gabinete.andar}
                        </p>
                        <p className="info">
                          Telefone: {deputado.ultimoStatus.gabinete.telefone}
                        </p>
                        <p className="info">
                          Email: {deputado.ultimoStatus.gabinete.email}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <Despesas id={id} />
          </div>
        </>
      )}
    </div>
  );
};

DeputadoInfo.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      name: PropTypes.string.isRequired,
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }),
  }).isRequired,
};

export default DeputadoInfo;
