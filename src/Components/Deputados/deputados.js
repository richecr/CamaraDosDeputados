/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import "./deputados.css";

const Deputados = () => {
    const [deputados, setDeputados] = useState([]);
    const [page, setPage] = useState(1);
    const [order, setOrder] = useState("nome")

    const fetchData = async (page, order) => {
        const response = await axios.get(`https://dadosabertos.camara.leg.br/api/v2/deputados?ordem=ASC&ordenarPor=${order}&pagina=${page}&itens=20`);
        const { dados } = response.data;

        setDeputados(dados);
        setPage(page);
    }

    useEffect (() => {
        fetchData(page, order)
    }, [page, order]);

    const prevPage = () => {
        if (page === 1) return;

        const pageNumber = page - 1;
        setPage(pageNumber);
    }

    const nextPage = () => {
        if (page === 26) return;

        const pageNumber = page + 1;
        setPage(pageNumber);
    }

    const orderBy = (field) => {
        setPage(1);
        setOrder(field)
    }
        
    return (
        <div className="deputados-lista">
            <div className="deputados-ordenacao">
                <strong>Ordernar por</strong>
                <div className="buttons">
                    <div>
                        <button onClick={() => { orderBy("id") }}>Id</button>
                        <button onClick={() => { orderBy("idLegislatura") }}>Id da Legislatura</button>
                        <button onClick={() => { orderBy("nome") }}>Nome</button>
                    </div>
                    <div>
                        <button onClick={() => { orderBy("siglaUF") }}>Sigla de UF</button>
                        <button onClick={() => { orderBy("siglaPartido") }}>Sigla do Partido</button>
                    </div>
                </div>
            </div>
            { deputados.map(deputado => (
                <article key={ deputado.id }>
                    <strong>{ deputado.nome } - { deputado.siglaPartido }</strong>
                    <p></p>
                    <img width="114" height="152" src={ deputado.urlFoto }></img>
                    <p></p>
                    <Link to={"/deputado/"+deputado.id}>Ver Detalhes</Link>
                </article>
            )) }
            <div className="deputados-buttons">
                <button disabled={ page === 1 } onClick={ prevPage } >Anterior</button>
                <button disabled={ page === 26 } onClick={ nextPage } >Próxima</button>
            </div>
        </div>
    )   
}

export default Deputados;