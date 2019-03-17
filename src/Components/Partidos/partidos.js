import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import "../Partidos/partidos.css";

export default class Partidos extends Component {

    state = {
        partidos : [],
        page : 1
    }

    async componentDidMount() {
        await this.acessaApi();
    }

    acessaApi = async (page = 1) => {
        const response = await axios.get("https://dadosabertos.camara.leg.br/api/v2/partidos?ordem=ASC&ordenarPor=nome&pagina=" + page + "&itens=20");
        const { dados } = response.data;
        this.setState({ partidos : dados, page: page });
    }

    prevPage = () => {
        const { page } = this.state;

        if (page === 1) return;

        const pageNumber = page - 1;
        this.acessaApi(pageNumber);
    }

    nextPage = () => {
        const { page } = this.state;

        if (page === 2) return;

        const pageNumber = page + 1;
        this.acessaApi(pageNumber);
    }

    render() {
        const { partidos, page } = this.state;

        return (
            <div className="partidos-lista">
                { partidos.map(partido => (
                    <article key={ partido.id } >
                        <strong>{ partido.nome } - { partido.sigla }</strong>
                        <br></br>
                        <Link to={ "/partido/"+partido.id }>Ver Detalhes</Link>
                    </article>
                )) }
                <div>
                    <button disabled={ page === 1 } onClick={ this.prevPage } >Anterior</button>
                    <button disabled={ page === 2 } onClick={ this.nextPage } >Próxima</button>
                </div>
            </div>
        )
    }

}