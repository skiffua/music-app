import React from "react";
import { Link, NavLink } from 'react-router-dom';
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import {Container} from "react-bootstrap";

// import './header.scss';

const Header = () => {
    return (
        <Navbar bg="dark" expand="sm">
            <Container>
                <Navbar.Brand href="/">Гарбуз</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="chart">Чарт</Nav.Link>
                        <Nav.Link href="about">Про нас</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>




        // <nav className="navbar navbar-expand-sm navbar-dark bg-dark top-bar">
        //     <div className="container">
        //         <Link to="/" className="navbar-brand">
        //             Гарбуз
        //         </Link>
        //
        //
        //         <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
        //                 aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        //             <span className="navbar-toggler-icon"></span>
        //         </button>
        //
        //         <div className="collapse navbar-collapse" id="navbarNav">
        //             <ul className="navbar-nav ml-auto flex-nowrap">
        //                 <li className="nav-item">
        //                     <NavLink to='/' className="nav-link" exact>
        //                         Home
        //                     </NavLink>
        //                 </li>
        //                 <li className="nav-item">
        //                     <NavLink to='/chart' className="nav-link">
        //                         Chart
        //                     </NavLink>
        //                 </li>
        //                 <li className="nav-item">
        //                     <NavLink to='/about' className="nav-link">
        //                         About
        //                     </NavLink>
        //                 </li>
        //             </ul>
        //         </div>
        //
        //
        //     </div>
        // </nav>
    )
};

export default Header
