import React from 'react';
import { FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import illustration01 from '../../assets/homeIllustration01.svg';

import './styles.scss';

const Home = () => {
  function goTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <>
      <section className="main-section">
        <div className="left-side">
          <h1>
            Lorem ipsum dolor sit amet,
            <br /> consectetur adipiscing elit.
            <br /> Morbi pellentesque
          </h1>
          <button type="button">Pesquisar</button>
        </div>
        <div className="right-side">
          <img src={illustration01} alt="devices" />
        </div>
      </section>

      <section className="search-section">
        <h1>
          Faça uma pesquisa pelo
          <br /> deputado:
        </h1>
        <div className="search-input">
          <input type="text" />
          <FaSearch className="FaSearch" size="30" />
        </div>
      </section>

      <section className="info-section">
        <div className="left-side">
          <h1>Câmara dos Deputados</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
            condimentum felis purus, eu vehicula nisi imperdiet vestibulum. Sed
            vitae consequat enim.
          </p>
        </div>
        <div className="right-side">
          <h1>Sobre nós</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
            condimentum felis purus, eu vehicula nisi imperdiet vestibulum. Sed
            vitae consequat enim.
          </p>
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
