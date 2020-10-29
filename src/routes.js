import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Header from './components/Header';
import Deputados from './pages/Deputados';
import Home from './pages/Home';
import Partidos from './pages/Partidos';

import DeputadoInfo from './pages/DeputadoInfo';
import PartidoInfo from './pages/PartidoInfo';

export default function Router() {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/deputados/" component={Deputados} />
        <Route path="/deputado/:id" component={DeputadoInfo} />
        <Route path="/partidos/" component={Partidos} />
        <Route path="/partido/:id" component={PartidoInfo} />
      </Switch>
    </BrowserRouter>
  );
}
