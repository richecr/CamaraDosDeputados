import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Despesas from '../../components/Despesas';
import Tag from '../../components/Tag';
import Loader from '../../components/Loader';
import NotFound from '../../components/NotFound';
import RequestError from '../../components/RequestError';
import ProposicoesDeputado from '../../components/ProposicoesDeputado';

import noImage from '../../assets/placeholder-user.png';

import './styles.scss';

const DeputadoInfo = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [deputado, setDeputado] = useState(null);
  const [error, setError] = useState(null);
  const [requestId, setRequestId] = useState(0);
  const { id } = useParams();

  useEffect(() => {
    const controller = new AbortController();

    async function fetchDeputado() {
      setIsLoading(true);
      setError(null);

      try {
        const { data } = await axios.get(
          `https://dadosabertos.camara.leg.br/api/v2/deputados/${id}`,
          { signal: controller.signal }
        );

        if (!controller.signal.aborted) {
          setDeputado(data.dados || null);
        }
      } catch (requestError) {
        if (!controller.signal.aborted) {
          setError(requestError);
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    fetchDeputado();

    return () => controller.abort();
  }, [id, requestId]);

  return (
    <div className="deputado">
      {isLoading && <Loader />}
      {error && !isLoading && (
        <RequestError
          message="Não foi possível carregar os dados deste deputado."
          onRetry={() => setRequestId((currentRequestId) => currentRequestId + 1)}
        />
      )}
      {!isLoading && !error && !deputado && (
        <NotFound text="Deputado não encontrado." />
      )}
      {!isLoading && !error && deputado !== null && (
        <>
          <div className="info-deputado">
            <section className="avatar"></section>
            <section className="info-card">
              <div className="info-card-container">
                <div className="info-card-avatar">
                  <figure className="deputado-photo">
                    <img
                      width="150"
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
                    warning
                  />

                  {deputado.ultimoStatus.situacao && (
                    <Tag
                      label="Situação: "
                      value={deputado.ultimoStatus.situacao}
                      warning
                    />
                  )}
                </div>
                <div className="info-card-data">
                  <div className="info-card-data-personal">
                    <div className="info-card-data-header">
                      <h2 className="title is-4">{deputado.nomeCivil}</h2>
                      <h3 >{deputado.ultimoStatus.siglaPartido}</h3>
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

            <ProposicoesDeputado id={id} />
            <Despesas id={id} />
          </div>
        </>
      )}
    </div>
  );
};

export default DeputadoInfo;
