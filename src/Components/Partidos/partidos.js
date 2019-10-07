import React from 'react';
import '../Partidos/partidos.css';
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
        <div className="partidos-lista">
            <form className="search" onSubmit={handleSubmit}>
                <input
                    placeholder="Buscar partido pela sigla"
                    value={initials}
                    onChange={e => setInitials(e.target.value)}
                />
                <button className="search-button">Buscar</button>
            </form>
            <div className="partidos-ordenacao">
                <strong>Ordernar por</strong>
                <div className="buttons">
                    <div>
                        <button onClick={() => setParam('ordenarPor', 'id')}>Id</button>
                        <button onClick={() => setParam('ordenarPor', 'sigla')}>Sigla</button>
                        <button onClick={() => setParam('ordenarPor', 'nome')}>Nome</button>
                    </div>
                    <div>
                        <button onClick={() => setParam('ordenarPor', 'dataInicio')}>Data de inicio</button>
                        <button onClick={() => setParam('ordenarPor', 'dataFim')}>Data de fim</button>
                    </div>
                </div>
            </div>
            {partidos.map(partido => (
                <article key={partido.id}>
                    <strong>{partido.nome} - {partido.sigla}</strong>
                    <br></br>
                    <Link to={'/partido/' + partido.id}>Ver Detalhes</Link>
                </article>
            ))}
            <div className="partidos-buttons">
                <button disabled={params.pagina <= firstPage} onClick={prevPage}>Anterior</button>
                <button disabled={params.pagina >= lastPage} onClick={nextPage}>Próxima</button>
            </div>
        </div>
    );
};

export default Partidos;
