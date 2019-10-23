import "./deputados.css";
/* eslint-disable jsx-a11y/alt-text */
import { Link } from "react-router-dom";
import React, { useState } from "react";
import { useDadosAbertos } from "../../helpers";

import Paginacao from '../paginacao'

const Deputados = () => {
	const [name, setName] = useState("");
	const {
		params,
		prevPage,
		setParam,
		lastPage,
		nextPage,
		firstPage,
		data: deputados
	} = useDadosAbertos("deputados", {
		nome: name,
		ordenarPor: "nome"
	});

	const handleSubmit = event => {
		event.preventDefault();

		setParam("nome", name);
	};

	return (
		<div className="columns columns-fix">
			<nav className="panel column is-3">
				<p className="panel-heading">Deputados</p>
				<div className="panel-block">
					<p className="control has-icons-left">
						<form className="search" onSubmit={handleSubmit}>
							<div className="field has-addons">
								<div className="control">
									<input
										className="input"
										placeholder="Buscar por nome"
										value={name}
										onChange={e => setName(e.target.value)}
									/>
								</div>
								<div className="control">
									<button className="button is-info">Buscar</button>
								</div>
							</div>
						</form>
					</p>
				</div>
				<Link
					className="panel-block"
					onClick={() => setParam("ordenarPor", "id")}
				>
					ID
				</Link>
				<Link
					className="panel-block"
					onClick={() => setParam("ordenarPor", "idLegislatura")}
				>
					Id da Legislatura
				</Link>
				<Link
					className="panel-block"
					onClick={() => setParam("ordenarPor", "nome")}
				>
					Nome
				</Link>
				<Link
					className="panel-block"
					onClick={() => setParam("ordenarPor", "siglaUF")}
				>
					Sigla de UF
				</Link>
				<Link
					className="panel-block"
					onClick={() => setParam("ordenarPor", "siglaPartido")}
				>
					Sigla do Partido
				</Link>
			</nav>

			<div className="partidos-lista columns-fix">
				<div className="columns">
					<div className="columns is-multiline is-mobile">
						{deputados.map(deputado => (
							<div className="column deputados-lista is-two-fifths">
								<div class="card" key={deputado.id}>
									<div class="card-image">
										<figure class="image is-4by3">
											<img
												width="114"
												height="152"
												className="deputado-img"
												src={deputado.urlFoto}
											/>
										</figure>
									</div>
									<div class="card-content">
										<div class="media">
											<div class="media-content deputado-info">
												<p class="title is-4">{deputado.nome}</p>
												<p class="tags has-addons">
													<span class="tag">Partido:</span>
													<span class="tag is-primary">
														{deputado.siglaPartido}
													</span>
												</p>
											</div>
										</div>
                                        <div class="content">
                                            <Link className="detalhes-link card-footer-item" to={"/deputado/" + deputado.id}>Ver Detalhes</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <Paginacao 
                    prevPage={prevPage}
                    nextPage={nextPage}
                    pagina={params.pagina}
                    firstPage={firstPage}
                    lastPage={lastPage}
                />
            </div>
        </div>
    );
};

export default Deputados;
