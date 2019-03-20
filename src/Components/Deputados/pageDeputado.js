import React from "react";
import axios from "axios";

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
                    <h1>{ deputado.nomeCivil } - { deputado.cpf }</h1>
                </div>

                {load &&
                <div className="info-deputado">   
                    <section className="dadosInfo">
                        <h1>Informações</h1>
                        <h3>Nome: { deputado.ultimoStatus.nome }</h3>
                        <h3>Sigla do Partido: {deputado.ultimoStatus.siglaPartido }</h3>
                        <h3>UF: { deputado.ultimoStatus.siglaUf }</h3>
                        <h3>ID Legislatura: { deputado.ultimoStatus.idLegislatura }</h3>
                    </section>

                    <section>
                        <h1>Gabinete</h1>
                        <h3>Nome: { deputado.ultimoStatus.gabinete.nome }</h3>
                        <h3>Prédio: { deputado.ultimoStatus.gabinete.predio }</h3>
                        <h3>Sala: { deputado.ultimoStatus.gabinete.predio }</h3>
                    </section>
                </div>
                }
            </div>
        )
    }
}