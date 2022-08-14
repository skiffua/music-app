import React, {useEffect, useRef} from "react";
import { Link, useLocation } from 'react-router-dom'
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import {Container} from "react-bootstrap";
import {connect} from "react-redux";
import {getSongsList} from "../store/actions/songsActions";
import useFetch from "../hooks/useFetch";
import {SERVER_ROUTES} from "../constants/api";

import pumpingWebpImg from "../assets/images/pumping.png";
import pumpingSmyleWebpImg from "../assets/images/pumping_2.png";

import './header.scss';
import {OPACITY_CHANGE} from "../constants/animations";

const Header = (props) => {
    const [{ response }, doFetch] = useFetch();
    const pumpingLogoSmyle = useRef(null);
    let location = useLocation();

    useEffect(() => {
            doFetch(SERVER_ROUTES.SONGS, { method: 'get'});
        },
        []);

    useEffect(() => {
            if (response) { props.getSongsListToProp(response.data);}
        },
        [response]);

    useEffect(() => {
            console.log('change', location);
            const { pathname } = location;
        }, [location]);

    useEffect(() => {
        if (pumpingLogoSmyle) {
            pumpingLogoSmyle.current.animate(
                OPACITY_CHANGE,
                {
                    duration: 20000,
                    iterations: Infinity,
                }
            )
        }
        console.log(pumpingLogoSmyle)
    }, [pumpingLogoSmyle]);

    return (
        <Navbar bg="dark" variant="dark" expand="sm">
            <Container>
                { location.pathname !== '/' && <Navbar.Brand href="/">Гарбуз</Navbar.Brand> }
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
                <Navbar.Brand href="/">
                    <div className="container-logo">
                        <picture>
                            <source srcSet={`${pumpingSmyleWebpImg}`}
                                    type="image/webp" />
                            <img
                                ref={ pumpingLogoSmyle }
                                className="pumping-logo pumping-logo-smyle"
                                 alt="pumping" src={pumpingSmyleWebpImg}
                                 srcSet={`${pumpingSmyleWebpImg}`}/>

                        </picture>
                        <picture>
                            <source srcSet={`${pumpingWebpImg}`}
                                    type="image/webp" />
                            <img className="pumping-logo"
                                 alt="pumping" src={pumpingWebpImg}
                                 srcSet={`${pumpingWebpImg}`}/>

                        </picture>
                    </div>
                </Navbar.Brand>
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
