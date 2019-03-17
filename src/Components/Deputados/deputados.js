/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from 'react';
import axios from "axios";
import { Link } from "react-router-dom";

import "./deputados.css";

export default class Deputados extends Component {

    state = {
        deputados : [],
        page : 1,
    }

    async componentDidMount() {
        await this.acessaApi();
    }

    async acessaApi(page = 1) {
        const response = await axios.get('https://dadosabertos.camara.leg.br/api/v2/deputados?ordem=ASC&ordenarPor=nome&pagina=' + page + '&itens=20');
        const { dados } = response.data;
        
        this.setState({ deputados : dados, page : page } );
    }

    prevPage = () => {
        const { page } = this.state;

        if (page === 1) return;
        
        const pageNumber = page - 1;
        this.acessaApi(pageNumber);
    }

    nextPage = () => {
        const { page } = this.state;

        if (page === 26) return;

        const pageNumber = page + 1;
        this.acessaApi(pageNumber);
    }

    render() {
        const { deputados, page } = this.state;
        
        return (
            <div className="deputados-lista">
                { deputados.map(deputado => (
                    <article key={ deputado.id }>
                        <strong>{ deputado.nome } - { deputado.siglaPartido }</strong>
                        <p></p>
                        <img src={ deputado.urlFoto }></img>
                        <p></p>
                        <Link to={"/deputado/"+deputado.id}>Ver Detalhes</Link>
                    </article>
                )) }
                <div>
                    <button disabled={ page === 1 } onClick={ this.prevPage } >Anterior</button>
                    <button disabled={ page === 26 } onClick={ this.nextPage } >Próxima</button>
                </div>
            </div>
        )
    }
}