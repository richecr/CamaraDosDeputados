import React from "react";
import { Link } from "react-router-dom";

import "./styles.css";

export default class Main extends React.Component {
    render () {
        return (
            <div className="principal">
                <ul>
                    <li><Link to={"/deputados/"} >Deputados</Link></li>
                    <li><Link to={"/partidos/"} >Partidos</Link></li>
                </ul>
			</div>
        )
    }
} 