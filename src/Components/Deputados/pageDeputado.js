import React from "react";
import axios from "axios";

export default class Deputado extends React.Component {

    state = {
        deputado : {},
    }

    async componentDidMount() {
        const { id } = this.props.match.params;
        const response = await axios.get('https://dadosabertos.camara.leg.br/api/v2/deputados/'+id);
        const { dados } = response.data;
        
        this.setState({ deputado : dados });
    }

    render() {
        const { deputado } = this.state;

        return (
            <div>
                <h1>{ deputado.nomeCivil }</h1>
            </div>
        )
    }
}