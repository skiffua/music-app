import React from "react";
import { Link, NavLink } from 'react-router-dom';

import './header.scss';

const Header = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light top-bar">
            <div className="container">
                <Link to="/" className="navbar-brand">
                    Гарбуз чарт
                </Link>


                <ul className="navbar-nav ml-auto flex-nowrap pull-xs-right">
                    <li className="nav-item">
                        <NavLink to='/' className="nav-link" exact>
                            Home
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to='/chart' className="nav-link">
                            Chart
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to='/about' className="nav-link">
                            About
                        </NavLink>
                    </li>

                </ul>
            </div>
        </nav>
    )
};

export default Header
