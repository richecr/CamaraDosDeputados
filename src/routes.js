import React from "react";

import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Main from "./Components/main";
import Deputados from "./Components/Deputados/deputados.js";
import Deputado from "./Components/Deputados/pageDeputado.js"
import Partidos from "./Components/Partidos/partidos.js";

export default class Router extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={ Main } />
                    <Route path="/deputados/" component={ Deputados } />
                    <Route path="/deputado/:id" component={ Deputado } />
                    <Route path="/partidos/" component={ Partidos } />
                </Switch>
            </BrowserRouter>
        )
    }
}
