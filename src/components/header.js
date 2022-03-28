import React, {useEffect} from "react";
import { Link } from 'react-router-dom'
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import {Container} from "react-bootstrap";
import {connect} from "react-redux";
import {getSongsList} from "../store/actions/songsActions";
import useFetch from "../hooks/useFetch";
import {SERVER_ROUTES} from "../constants/api";

// import './header.scss';

const Header = (props) => {
    const [{ response }, doFetch] = useFetch();

    useEffect(() => {
            doFetch(SERVER_ROUTES.SONGS, { method: 'get'});
        },
        []);

    useEffect(() => {
            if (response) { props.getSongsListToProp(response.data);}
        },
        [response]);

    return (
        <Navbar bg="dark" variant="dark" expand="sm">
            <Container>
                <Navbar.Brand href="/">Гарбуз</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-center">
                    <Nav className="ml-auto">
                        <Nav.Link as={Link} to="/">Домівка</Nav.Link>
                        <Nav.Link as={Link} to="chart">Чарт</Nav.Link>
                        <Nav.Link as={Link} to="register">Реєстрація</Nav.Link>
                        <Nav.Link as={Link} to="login">Вхід</Nav.Link>
                        <Nav.Link>Вихід</Nav.Link>
                        <Nav.Link as={Link} to="about">Про нас</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
};

export default connect(
    undefined,
    {
        getSongsListToProp: getSongsList,
    }
)(Header)
