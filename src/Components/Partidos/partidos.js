import '../Partidos/partidos.scss';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDadosAbertos } from '../../helpers';

const Partidos = () => {
    const [initials, setInitials] = useState('');
    const {
        params,
        prevPage,
        setParam,
        lastPage,
        nextPage,
        firstPage,
        data: partidos,
    } = useDadosAbertos('partidos', {
        sigla: initials,
        ordenarPor: 'nome',
    },
    );

    const handleSubmit = (event) => {
        event.preventDefault();

        setParam('sigla', initials);
    };

    return (
        <div className="columns">
            <nav class="panel column is-3">
                <p class="panel-heading">Partidos</p>
                <div class="panel-block">
                    <p class="control has-icons-left">
                        <form className="search" onSubmit={handleSubmit}>
                            <div class="field has-addons">
                                <div class="control">
                                    <input
                                        className="input"
                                        placeholder="Buscar partido pela sigla"
                                        value={initials}
                                        onChange={e => setInitials(e.target.value)}
                                    />
                                </div>
                                <div class="control">
                                    <button className="button is-info">Buscar</button>
                                </div>
                            </div>
                        </form>
                    </p>
                </div>
                <Link class="panel-block" onClick={() => setParam('ordenarPor', 'id')}>
                    ID
                </Link>
                <Link class="panel-block" onClick={() => setParam('ordenarPor', 'sigla')}>
                    Sigla
                </Link>
                <Link class="panel-block" onClick={() => setParam('ordenarPor', 'nome')}>
                    Nome
                </Link>
                <Link class="panel-block" onClick={() => setParam('ordenarPor', 'dataInicio')}>
                    Data de inicio
                </Link>
                <Link class="panel-block" onClick={() => setParam('ordenarPor', 'dataFim')}>
                    Data de fim
                </Link>
            </nav>

            <div className="partidos-lista">
                <div className="columns is-multiline is-centered">
                    {partidos.map(partido => (
                        <div className="column is-4">
                            <article key={partido.id} className="card">
                                <div className="card-content">
                                    <div class="media">
                                        <div class="media-content">
                                            <p class="title is-6">
                                                {partido.nome}
                                            </p>
                                            <p class="subtitle is-8">
                                                {partido.sigla}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <footer class="card-footer">
                                    <Link className="detalhes-link card-footer-item" to={'/partido/' + partido.id}>Ver Detalhes</Link>
                                </footer>
                            </article>
                        </div>
                    ))}
                </div>
                <div className="partidos-buttons">
                    <button disabled={params.pagina <= firstPage} onClick={prevPage}>Anterior</button>
                    <button disabled={params.pagina >= lastPage} onClick={nextPage}>Próxima</button>
                </div>
            </div>
        </div>
    );
};

export default Partidos;
