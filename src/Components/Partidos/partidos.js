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
        <div className="columns columns-fix">
            <nav className="panel column is-3">
                <p className="panel-heading">Partidos</p>
                <div className="panel-block">
                    <p className="control has-icons-left">
                        <form className="search" onSubmit={handleSubmit}>
                            <div className="field has-addons">
                                <div className="control">
                                    <input
                                        className="input"
                                        placeholder="Buscar partido pela sigla"
                                        value={initials}
                                        onChange={e => setInitials(e.target.value)}
                                    />
                                </div>
                                <div className="control">
                                    <button className="button is-info">Buscar</button>
                                </div>
                            </div>
                        </form>
                    </p>
                </div>
                <Link className="panel-block" onClick={() => setParam('ordenarPor', 'id')}>
                    ID
                </Link>
                <Link className="panel-block" onClick={() => setParam('ordenarPor', 'sigla')}>
                    Sigla
                </Link>
                <Link className="panel-block" onClick={() => setParam('ordenarPor', 'nome')}>
                    Nome
                </Link>
                <Link className="panel-block" onClick={() => setParam('ordenarPor', 'dataInicio')}>
                    Data de inicio
                </Link>
                <Link className="panel-block" onClick={() => setParam('ordenarPor', 'dataFim')}>
                    Data de fim
                </Link>
            </nav>

            <div className="partidos-lista columns-fix">
                <div className={`columns is-multiline ${partidos.length > 2 ? 'is-centered' : ''} `}>
                    {partidos.map(partido => (
                        <div className="column is-4">
                            <article key={partido.id} className="card">
                                <div className="card-content">
                                    <div className="media">
                                        <div className="media-content">
                                            <p className="title is-6">
                                                {partido.nome}
                                            </p>
                                            <p className="subtitle is-8">
                                                {partido.sigla}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <footer className="card-footer">
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
