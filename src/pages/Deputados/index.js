import React, { useState } from 'react';

import { useDadosAbertos } from '../../helpers';
import Search from '../../components/Search';
import DeputadoCard from '../../components/DeputadoCard';

const Deputados = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { data: deputados, setParam, loading, ...pagination } = useDadosAbertos(
    'deputados',
    {
      nome: searchTerm,
      ordenarPor: 'nome',
    }
  );

  const handleSubmit = (event) => {
    event.preventDefault();

    setParam('nome', searchTerm);
  };

  const filters = [
    {
      name: 'id',
      displayName: 'ID',
    },
    {
      name: 'idLegislatura',
      displayName: 'Id da Legislatura',
    },
    {
      name: 'nome',
      displayName: 'Nome',
    },
    {
      name: 'siglaUF',
      displayName: 'Sigla de UF',
    },
    {
      name: 'siglaPartido',
      displayName: 'Sigla do Partido',
    },
  ];

  return (
    <Search
      title="Deputados"
      placeholder="Buscar por nome"
      pagination={pagination}
      filters={filters}
      handleSubmit={handleSubmit}
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
      setParam={setParam}
      loading={loading}
    >
      {deputados.map(({ id, nome, siglaPartido, urlFoto }) => (
        <div
          className="column is-two-fifths-tablet is-one-third-desktop is-one-quarter-widescreen"
          key={id}
        >
          <DeputadoCard
            id={id}
            nome={nome}
            siglaPartido={siglaPartido}
            urlFoto={urlFoto}
          />
        </div>
      ))}
    </Search>
  );
};

export default Deputados;
