import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Main from './pages/Main';
import Deputados from './pages/Deputados';
import Partidos from './pages/Partidos';

import DeputadoInfo from './pages/DeputadoInfo';
import PartidoInfo from './pages/PartidoInfo';

export default function Router() {
  return (
    <BrowserRouter>
      <Main />
      <Switch>
        <Route path="/deputados/" component={Deputados} />
        <Route path="/deputado/:id" component={DeputadoInfo} />
        <Route path="/partidos/" component={Partidos} />
        <Route path="/partido/:id" component={PartidoInfo} />
      </Switch>
    </BrowserRouter>
  );
}
