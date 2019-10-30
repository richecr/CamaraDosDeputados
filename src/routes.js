import React from "react";
import { Partidos, Deputados } from "./containers";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Main from "./Components/main";
import Deputado from "./Components/Deputados/pageDeputado.js";
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
    );
  }
}
