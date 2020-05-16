import React from 'react';
import { Link } from 'react-router-dom';

import './styles.scss';

export default function Main() {
  return (
    <div className="principal">
      <ul>
        <li>
          <Link to="/deputados/">Deputados</Link>
        </li>
        <li>
          <Link to="/partidos/">Partidos</Link>
        </li>
      </ul>
    </div>
  );
}
