import React, { useEffect, useState } from "react";
import axios from "axios";

import './stylesPageDeputado.css'

const Deputado = ({
  match,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [deputado, setDeputado] = useState(null);

  useEffect(() => {
    async function fetchDeputado() {
      const { id } = match.params;
      const { data } = await axios.get(`https://dadosabertos.camara.leg.br/api/v2/deputados/${id}`);
  
      setIsLoading(false);
      setDeputado(data.dados);
    }

    fetchDeputado();
  }, [match]);

  return (
    <div className="deputado">
      {!isLoading && deputado !== null &&
        <>
          <div className="titulo">
            <h1>{ deputado.nomeCivil } - { deputado.ufNascimento }</h1>
          </div>
          <div className="info-deputado">   
            <section className="info-dados">
              <h1>Informações</h1>
              <h3>Nome: { deputado.ultimoStatus.nome }</h3>
              <h3>CPF: { deputado.cpf }</h3>
              <h3>Sigla do Partido: {deputado.ultimoStatus.siglaPartido }</h3>
              <h3>UF: { deputado.ultimoStatus.siglaUf }</h3>
              <h3>ID Legislatura: { deputado.ultimoStatus.idLegislatura }</h3>
              <h3>Data de Nascimento: { deputado.dataNascimento }</h3>
              <h3>Município de Nascimento: { deputado.municipioNascimento }</h3>
              <h3>Escolaridade: { deputado.escolaridade }</h3>
            </section>
            <section className="info-gabinete">
              <h1>Gabinete</h1>
              <h3>Nome: { deputado.ultimoStatus.gabinete.nome }</h3>
              <h3>Prédio: { deputado.ultimoStatus.gabinete.predio }</h3>
              <h3>Sala: { deputado.ultimoStatus.gabinete.sala }</h3>
              <h3>Andar: { deputado.ultimoStatus.gabinete.andar }</h3>
              <h3>Telefone: { deputado.ultimoStatus.gabinete.telefone }</h3>
              <h3>E-mail: { deputado.ultimoStatus.gabinete.email }</h3>
            </section>
            <section className="info-situacao">
              <h1>situação</h1>
              <h3>situação: { deputado.ultimoStatus.situacao }</h3>
              <h3>Condição Eleitoral: { deputado.ultimoStatus.condicaoEleitoral }</h3>
              { deputado.ultimoStatus.situacao && <h3>situação: { deputado.ultimoStatus.situacao }</h3> }
            </section>
          </div>
        </>
      }
    </div>
  );
};

export default Deputado;
