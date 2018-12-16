import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import "../Partidos/partidos.css";

export default class Partidos extends Component {

    state = {
        partidos : [],
    }

    async componentDidMount() {
        const response = await axios.get("https://dadosabertos.camara.leg.br/api/v2/partidos?ordem=ASC&ordenarPor=nome&pagina=1&itens=40");
        const { dados } = response.data;
        this.setState({ partidos : dados });
    }

    render() {
        const { partidos } = this.state;

        return (
            <div className="partidos-lista">
                { partidos.map(partido => (
                    <article key={ partido.id } >
                        <strong>{ partido.nome } - { partido.sigla }</strong>
                        <br></br>
                        <Link to={ "/partido/"+partido.id }>Page</Link>
                    </article>
                )) }
            </div>
        )
    }

}