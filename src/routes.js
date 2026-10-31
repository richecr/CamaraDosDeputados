import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Deputados from './pages/Deputados';
import Home from './pages/Home';
import Partidos from './pages/Partidos';

import DeputadoInfo from './pages/DeputadoInfo';
import PartidoInfo from './pages/PartidoInfo';
import NotFound from './components/NotFound';

export default function Router() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/deputados/" element={<Deputados />} />
        <Route path="/deputado/:id" element={<DeputadoInfo />} />
        <Route path="/partidos/" element={<Partidos />} />
        <Route path="/partido/:id" element={<PartidoInfo />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
