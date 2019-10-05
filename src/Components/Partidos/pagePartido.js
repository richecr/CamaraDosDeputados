/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import "../Partidos/stylePagePartido.css";


const Partido = (props) => {
    const [partido, setPartido] = useState({});
    const [status, setStatus] = useState({});
    const [lider, setLider] = useState({});

    const fetchData = async () => {
        const { id } = props.match.params;
        const response = await axios.get("https://dadosabertos.camara.leg.br/api/v2/partidos/"+id);
        const { dados } = response.data;
        console.log(1)

        setPartido(dados);
        setStatus(dados.status);
        setLider(dados.status.lider);
    }

    useEffect(() => {
        fetchData();
    });

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
    );

}

export default Partido;
