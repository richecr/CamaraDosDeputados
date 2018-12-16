/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from 'react';
import axios from 'axios';

import "../Partidos/stylePagePartido.css";

export default class Partido extends Component {
    
    state = {
        partido : {},
        status : {},
        lider : {},
    }

    async componentDidMount() {
        const { id } = this.props.match.params;
        const response = await axios.get("https://dadosabertos.camara.leg.br/api/v2/partidos/"+id);
        const { dados } = response.data;

        this.setState({ partido : dados, status : dados.status, lider : dados.status.lider });
    }

    formataData(data) {
        const d = data.split("-");
        return d[2] + "/" + d[1] + "/" + d[0];
    }

    render() {
        const { partido, status, lider } = this.state;
        
        return (
            <div className="partido">
                <div className="titulo">
                    <h1>{ partido.nome } - { partido.sigla }</h1>
                </div>

                <div className="titulo-img">
                    <img src={ partido.urlLogo } ></img>
                </div>

                <div className="status">
                    <h1>Status</h1>
                    <article key={partido.id} >
                        <strong>Situação: { status.situacao }</strong>
                        <br></br>
                        <strong>Total de posse: { status.totalPosse }</strong>
                        <br></br>
                        <strong>Total de membros: { status.totalMembros }</strong>
                    </article>
                </div>

                <br></br>

                <div className="lider">
                    <h1 id="title">Líder</h1>
                    <article key={ lider.nome }>
                        <strong>Nome: { lider.nome }</strong>
                        <br></br>
                        <strong>Sigla Partido: { lider.siglaPartido }</strong>
                        <br></br>
                        <img src={ lider.urlFoto }></img>
                    </article>
                </div>
            </div>
        )
    }
}