import React, { useState } from "react";
import { useDadosAbertos } from "../../helpers";
import { Search } from "../../Components";
import { PartidoCard } from "../../Components";

const Partidos = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { data: partidos, setParam, loading, ...pagination } = useDadosAbertos(
    "partidos",
    {
      sigla: searchTerm,
      ordenarPor: "nome"
    }
  );

  const handleSubmit = event => {
    event.preventDefault();

    setParam("sigla", searchTerm);
  };

  const filters = [
    {
      name: "id",
      displayName: "ID"
    },
    {
      name: "sigla",
      displayName: "Sigla"
    },
    {
      name: "nome",
      displayName: "Nome"
    },
    {
      name: "dataInicio",
      displayName: "Data de inicio"
    },
    {
      name: "dataFim",
      displayName: "Data de fim"
    }
  ];

  return (
    <Search
      title="Partidos"
      placeholder="Buscar partido pela sigla"
      pagination={pagination}
      filters={filters}
      handleSubmit={handleSubmit}
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
      setParam={setParam}
      loading={loading}
    >
      {partidos.map(({ id, nome, sigla }) => (
        <div className="column is-4" key={id}>
          <PartidoCard id={id} nome={nome} sigla={sigla} />
        </div>
      ))}
    </Search>
  );
};

export default Partidos;
