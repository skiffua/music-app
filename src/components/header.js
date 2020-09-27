import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import {Container} from "react-bootstrap";

// import './header.scss';

const Header = () => {
    return (
        <Navbar bg="dark" variant="dark" expand="sm">
            <Container>
                <Navbar.Brand href="/">Гарбуз</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        <Nav.Link href="/">Домівка</Nav.Link>
                        <Nav.Link href="chart">Чарт</Nav.Link>
                        <Nav.Link href="register">Реєстрація</Nav.Link>
                        <Nav.Link href="login">Вхід</Nav.Link>
                        <Nav.Link>Вихід</Nav.Link>
                        <Nav.Link href="about">Про нас</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
};

export default Header
