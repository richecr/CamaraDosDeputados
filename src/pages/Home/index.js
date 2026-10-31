import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Search from '../../components/Search';

import illustration01 from '../../assets/homeIllustration01.svg';

import './styles.scss';

const Home = () => {
  const navigate = useNavigate();

  function goTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function searchDeputies(value) {
    const query = new URLSearchParams();
    if (value) query.set('nome', value);
    const search = query.toString();
    navigate(`/deputados/${search ? `?${search}` : ''}`);
  }

  return (
    <>
      <section className="main-section">
        <div className="left-side">
          <h1>Acompanhe o trabalho dos deputados federais</h1>
          <p>Consulte despesas, partidos e informações públicas do mandato.</p>
          <Link className="home-cta" to="/deputados/">
            Consultar deputados
          </Link>
        </div>
        <div className="right-side">
          <img
            src={illustration01}
            alt="Pessoa consultando informações em um celular e tablet"
          />
        </div>
      </section>

      <section className="search-section">
        <Search
          className="search__container--home"
          title="Encontre um deputado"
          label="Nome do deputado"
          placeholder="Digite o nome do deputado"
          submitLabel="Pesquisar deputados"
          handleSubmit={searchDeputies}
        />
      </section>

      <section className="info-section">
        <div className="left-side">
          <h1>Câmara dos Deputados</h1>
          <p>Consulte dados legislativos e despesas divulgados pela Câmara dos Deputados.</p>
        </div>
        <div className="right-side">
          <h1>Sobre nós</h1>
          <p>As informações são públicas e devem ser avaliadas considerando sua fonte e período.</p>
        </div>
      </section>

      <footer>
        <ul className="link-list">
          <li>
            <Link onClick={goTop} to="/">
              Inicio
            </Link>
          </li>
          <li>
            <Link to="/deputados">Deputados</Link>
          </li>
          <li>
            <Link to="/partidos">Partidos</Link>
          </li>
          <li>
            <a
              href="https://github.com/richecr/CamaraDosDeputados"
              target="_blank"
              rel="noopener noreferrer"
              className="iconMenu"
            >
              Github
            </a>
          </li>
        </ul>
      </footer>
    </>
  );
};

export default Home;
