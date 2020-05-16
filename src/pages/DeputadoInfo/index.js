import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Despesas from '../../components/Despesas';

import './stylesPageDeputado.css';

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
      setDeputado(data.dados);
    }

    fetchDeputado();
  }, [id]);

  return (
    <div className="deputado">
      {!isLoading && deputado !== null && (
        <>
          <div className="title">
            <figure className="deputado-photo">
              <img
                width="114"
                height="152"
                alt={deputado.nomeCivil}
                src={deputado.ultimoStatus.urlFoto}
              />
            </figure>
            <h1>
              {deputado.nomeCivil} - {deputado.ufNascimento}
            </h1>
            <div className="basic-info">
              <h3 className="info-text tags has-addons">
                <span className="tag is-info ">Condição Eleitoral: </span>
                <span className="tag is-white">
                  {deputado.ultimoStatus.condicaoEleitoral}
                </span>
              </h3>
              {deputado.ultimoStatus.situacao && (
                <h3 className="info-text tags has-addons">
                  <span className="tag is-info ">Situação: </span>
                  <span className="tag is-white">
                    {deputado.ultimoStatus.situacao}
                  </span>
                </h3>
              )}
            </div>
          </div>
          <div className="info-deputado">
            <section className="info-card">
              <h2 className=" title is-4">Informações</h2>
              <div className="info-card-container">
                <h3 className="tags has-addons info-text">
                  <span className="tag is-primary ">Nome:</span>
                  <span className="tag">{deputado.ultimoStatus.nome}</span>
                </h3>
                <h3 className="info-text tags has-addons">
                  <span className="tag is-primary ">CPF: </span>
                  <span className="tag">{deputado.cpf}</span>
                </h3>
                <h3 className="info-text tags has-addons">
                  <span className="tag is-primary ">Sigla do Partido: </span>
                  <span className="tag">
                    {deputado.ultimoStatus.siglaPartido}
                  </span>
                </h3>
                <h3 className="info-text tags has-addons">
                  <span className="tag is-primary ">UF: </span>
                  <span className="tag">{deputado.ultimoStatus.siglaUf}</span>
                </h3>
                <h3 className="info-text tags has-addons">
                  <span className="tag is-primary ">ID Legislatura: </span>
                  <span className="tag">
                    {deputado.ultimoStatus.idLegislatura}
                  </span>
                </h3>
                <h3 className="info-text tags has-addons">
                  <span className="tag is-primary ">Data de Nascimento: </span>
                  <span className="tag">{deputado.dataNascimento}</span>
                </h3>
                <h3 className="info-text tags has-addons">
                  <span className="tag is-primary ">
                    Município de Nascimento:{' '}
                  </span>
                  <span className="tag">{deputado.municipioNascimento}</span>
                </h3>
                <h3 className="info-text tags has-addons">
                  <span className="tag is-primary ">Escolaridade: </span>
                  <span className="tag">{deputado.escolaridade}</span>
                </h3>
              </div>
            </section>

            <section className="info-card">
              <h2 className="title is-4">Gabinete</h2>
              <div className="info-card-container">
                <h3 className="info-text tags has-addons">
                  <span className="tag is-primary ">Nome: </span>
                  <span className="tag">
                    {deputado.ultimoStatus.gabinete.nome}
                  </span>
                </h3>
                <h3 className="info-text tags has-addons">
                  <span className="tag is-primary ">Prédio: </span>
                  <span className="tag">
                    {deputado.ultimoStatus.gabinete.predio}
                  </span>
                </h3>
                <h3 className="info-text tags has-addons">
                  <span className="tag is-primary ">Sala: </span>
                  <span className="tag">
                    {deputado.ultimoStatus.gabinete.sala}
                  </span>
                </h3>
                <h3 className="info-text tags has-addons">
                  <span className="tag is-primary ">Andar: </span>
                  <span className="tag">
                    {deputado.ultimoStatus.gabinete.andar}
                  </span>
                </h3>
                <h3 className="info-text tags has-addons">
                  <span className="tag is-primary ">Telefone: </span>
                  <span className="tag">
                    {deputado.ultimoStatus.gabinete.telefone}
                  </span>
                </h3>
                <h3 className="info-text tags has-addons">
                  <span className="tag is-primary ">E-mail: </span>
                  <span className="tag">
                    {deputado.ultimoStatus.gabinete.email}
                  </span>
                </h3>
              </div>
            </section>
            <Despesas id={id} />
          </div>
        </>
      )}
    </div>
  );
};

export default DeputadoInfo;
