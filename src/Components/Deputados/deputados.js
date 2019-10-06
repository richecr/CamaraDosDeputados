import './deputados.css';
/* eslint-disable jsx-a11y/alt-text */
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import { useDadosAbertos } from '../../helpers';

const Deputados = () => {
    const [name, setName] = useState('');
    const {
        params,
        prevPage,
        setParam,
        lastPage,
        nextPage,
        firstPage,
        data: deputados,
    } = useDadosAbertos('deputados', {
            nome: name,
            ordenarPor: 'nome',
        },
    );

    return (
        <div className="deputados-lista">
            <form className="search" onSubmit={() => setParam('nome', name)}>
                <input
                    placeholder="Buscar por nome"
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
                <button className="search-button">Buscar</button>
            </form>
            <div className="deputados-ordenacao">
                <strong>Ordernar por</strong>
                <div className="buttons">
                    <div>
                        <button onClick={() => setParam('ordenarPor', 'id')}>Id</button>
                        <button onClick={() => setParam('ordenarPor', 'idLegislatura')}>Id da Legislatura</button>
                        <button onClick={() => setParam('ordenarPor', 'nome')}>Nome</button>
                    </div>
                    <div>
                        <button onClick={() => setParam('ordenarPor', 'siglaUF')}>Sigla de UF</button>
                        <button onClick={() => setParam('ordenarPor', 'siglaPartido')}>Sigla do Partido</button>
                    </div>
                </div>
            </div>
            {deputados.map(deputado => (
                <article key={deputado.id}>
                    <strong>{deputado.nome} - {deputado.siglaPartido}</strong>
                    <p></p>
                    <img width="114" height="152" src={deputado.urlFoto}></img>
                    <p></p>
                    <Link to={"/deputado/" + deputado.id}>Ver Detalhes</Link>
                </article>
            ))}
            <div className="deputados-buttons">
                <button disabled={params.pagina <= firstPage} onClick={prevPage} >Anterior</button>
                <button disabled={params.pagina >= lastPage} onClick={nextPage} >Próxima</button>
            </div>
        </div>
    );
}

export default Deputados;
