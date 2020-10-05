import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Despesas from '../../components/Despesas';
import Tag from '../../components/Tag';

import noImage from '../../assets/placeholder-user.png';

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
                onError={(e) => {
                  e.currentTarget.src = noImage;
                }}
              />
            </figure>
            <h1>
              {deputado.nomeCivil} - {deputado.ufNascimento}
            </h1>
            <div className="basic-info">
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
          </div>
          <div className="info-deputado">
            <section className="info-card">
              <h2 className=" title is-4">Informações</h2>
              <div className="info-card-container">
                <Tag
                  label="Nome: "
                  value={deputado.ultimoStatus.nome}
                  primary
                />
                <Tag label="CPF: " value={deputado.ultimoStatus.cpf} primary />
                <Tag
                  label="Sigla do Partido: "
                  value={deputado.ultimoStatus.siglaPartido}
                  primary
                />
                <Tag
                  label="UF: "
                  value={deputado.ultimoStatus.siglaUf}
                  primary
                />
                <Tag
                  label="ID Legislatura: "
                  value={deputado.ultimoStatus.idLegislatura}
                  primary
                />
                <Tag
                  label="Data de Nascimento: "
                  value={deputado.ultimoStatus.dataNascimento}
                  primary
                />
                <Tag
                  label=" Município de Nascimento: "
                  value={deputado.ultimoStatus.municipioNascimento}
                  primary
                />
                <Tag
                  label="Escolaridade: "
                  value={deputado.ultimoStatus.escolaridade}
                  primary
                />
              </div>
            </section>

            <section className="info-card">
              <h2 className="title is-4">Gabinete</h2>
              <div className="info-card-container">
                <Tag
                  label="Nome: "
                  value={deputado.ultimoStatus.gabinete.nome}
                  primary
                />
                <Tag
                  label="Prédio: "
                  value={deputado.ultimoStatus.gabinete.predio}
                  primary
                />
                <Tag
                  label="Sala: "
                  value={deputado.ultimoStatus.gabinete.sala}
                  primary
                />
                <Tag
                  label="Andar: "
                  value={deputado.ultimoStatus.gabinete.andar}
                  primary
                />
                <Tag
                  label="Telefone: "
                  value={deputado.ultimoStatus.gabinete.telefone}
                  primary
                />
                <Tag
                  label="E-mail: "
                  value={deputado.ultimoStatus.gabinete.email}
                  primary
                />
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
