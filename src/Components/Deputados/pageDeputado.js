import React from "react";
import axios from "axios";

import './stylesPageDeputado.css'

export default class Deputado extends React.Component {

    state = {
        deputado : {},
        load: false
    }

    async componentDidMount() {
        const { id } = this.props.match.params;
        const response = await axios.get('https://dadosabertos.camara.leg.br/api/v2/deputados/'+id);
        const { dados } = response.data;
        this.setState({ deputado : dados, load: true });
    }

    render() {
        const { deputado, load } = this.state;

        return (
            <div className="deputado">
                <div className="titulo">
                    <h1>{ deputado.nomeCivil } - { deputado.ufNascimento }</h1>
                </div>

                {load &&
                <div className="info-deputado">   
                    <section className="info-dados">
                        <h1>Informações</h1>
                        <h3>Nome: { deputado.ultimoStatus.nome }</h3>
                        <h3>CPF: { deputado.cpf }</h3>
                        <h3>Sigla do Partido: {deputado.ultimoStatus.siglaPartido }</h3>
                        <h3>UF: { deputado.ultimoStatus.siglaUf }</h3>
                        <h3>ID Legislatura: { deputado.ultimoStatus.idLegislatura }</h3>
                        <h3>Data de Nascimento: { deputado.dataNascimento }</h3>
                        <h3>Município de Nascimento: { deputado.municipioNascimento }</h3>
                        <h3>Escolaridade: { deputado.escolaridade }</h3>
                    </section>

                    <section className="info-gabinete">
                        <h1>Gabinete</h1>
                        <h3>Nome: { deputado.ultimoStatus.gabinete.nome }</h3>
                        <h3>Prédio: { deputado.ultimoStatus.gabinete.predio }</h3>
                        <h3>Sala: { deputado.ultimoStatus.gabinete.sala }</h3>
                        <h3>Andar: { deputado.ultimoStatus.gabinete.andar }</h3>
                        <h3>Telefone: { deputado.ultimoStatus.gabinete.telefone }</h3>
                        <h3>E-mail: { deputado.ultimoStatus.gabinete.email }</h3>
                    </section>

                    <section className="info-situacao">
                        <h1>situação</h1>
                        <h3>situação: { deputado.ultimoStatus.situacao }</h3>
                        <h3>Condição Eleitoral: { deputado.ultimoStatus.condicaoEleitoral }</h3>
                        { deputado.ultimoStatus.situacao && <h3>situação: { deputado.ultimoStatus.situacao }</h3> }
                    </section>

                </div>
                }
            </div>
        )
    }
}