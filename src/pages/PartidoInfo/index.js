import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Loader from '../../components/Loader';
import NotFound from '../../components/NotFound';
import RequestError from '../../components/RequestError';

import noImage from '../../assets/placeholder-user.png';
import './styles.scss';

const PartidoInfo = () => {
  const [partido, setPartido] = useState(null);
  const [status, setStatus] = useState({});
  const [lider, setLider] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [requestId, setRequestId] = useState(0);
  const { id } = useParams();

  useEffect(() => {
    const controller = new AbortController();

    async function fetchData() {
      setIsLoading(true);
      setError(null);

      try {
        const response = await axios.get(
          `https://dadosabertos.camara.leg.br/api/v2/partidos/${id}`,
          { signal: controller.signal }
        );
        const { dados } = response.data;

        if (!controller.signal.aborted) {
          setPartido(dados || null);
          setStatus(dados?.status || {});
          setLider(dados?.status?.lider || {});
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

    fetchData();
    return () => controller.abort();
  }, [id, requestId]);

  if (isLoading) return <Loader />;

  if (error) {
    return (
      <RequestError
        message="Não foi possível carregar os dados deste partido."
        onRetry={() => setRequestId((currentRequestId) => currentRequestId + 1)}
      />
    );
  }

  if (!partido) return <NotFound text="Partido não encontrado." />;

  return (
    <div className="columns divPartido">
      <div className="column is-two-fifths">
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
          <div className="informations">
            <div>
              <span>Situação: </span>
              <span className="backgroundYellow">{status.situacao}</span>
            </div>
            <div>
              <span>Total de posse: </span>
              <span className="backgroundYellow">{status.totalPosse}</span>
            </div>
            <div>
              <span>Total de membros: </span>
              <span className="backgroundYellow">{status.totalMembros}</span>
            </div>

          </div>
        </div>
      </div>

      <div className="column">
        <div className="infoPresidente">
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

export default PartidoInfo;
