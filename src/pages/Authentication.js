import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import {Container} from "react-bootstrap";
import Button from 'react-bootstrap/Button';

import { SERVER_ROUTES, USERS_FIELDS } from '../constants/api';
import '../styles/authentication.scss';

import useFetch from "../hooks/useFetch";

const Authentication = () => {
    const [email, setEmail] = useState('');
    const [nick, setNick] = useState('');
    const [password, setPassword] = useState('');
    const [{response, isLoading, error}, doFetch] = useFetch(SERVER_ROUTES.REGISTER);

    const handleSubmit = (e) => {
        e.preventDefault();
        doFetch({
            [USERS_FIELDS.USER_EMAIL]: email,
            [USERS_FIELDS.USER_NICK]: nick,
            [USERS_FIELDS.USER_PASSWORD]: password
        })
    };

    return (
        <Container className="mt-3">
            <Form onSubmit={handleSubmit}>
                <Form.Row>
                    <div className="col-md-6 offset-md-3 col-xs-12">

                        <h1 className="text-center">Увійти</h1>
                        <p className="text-center">
                            <Link to="register">Сворити акаунт?</Link>
                        </p>

                        <Form.Group controlId="formGroupEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                placeholder="Enter email" />
                        </Form.Group>
                        <Form.Group controlId="formGroupNick">
                            <Form.Label>Nick</Form.Label>
                            <Form.Control
                                type="text"
                                value={nick}
                                onChange={e => setNick(e.target.value)}
                                placeholder="Enter nick"
                                autoComplete="off"
                            />
                        </Form.Group>
                        <Form.Group controlId="formGroupPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                placeholder="Password" />
                        </Form.Group>
                        {(response || error) &&
                            <Form.Group controlId="formGroupServerMessages">
                                <Form.Text className={response ? response.class : error.class}>
                                   {response ? response.message : error.message}
                                </Form.Text>
                            </Form.Group>
                        }
                        <Button
                            variant="primary"
                            className="float-right"
                            type="submit"
                            disabled={isLoading}
                        >
                            Вхід
                        </Button>

                    </div>
                </Form.Row>
            </Form>
        </Container>
    )
};

export default Authentication
