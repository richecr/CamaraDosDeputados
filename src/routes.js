import React from "react";

import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Main from "./Components/main";
import Deputados from "./Components/Deputados/deputados.js";
import Deputado from "./Components/Deputados/pageDeputado.js"
import Partidos from "./Components/Partidos/partidos.js";
import Partido from "./Components/Partidos/pagePartido.js";

export default class Router extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <Main />
                <Switch>
                    <Route path="/deputados/" component={Deputados} />
                    <Route path="/deputado/:id" component={Deputado} />
                    <Route path="/partidos/" component={Partidos} />
                    <Route path="/partido/:id" component={Partido} />
                </Switch>
            </BrowserRouter>
        )
    }
}
