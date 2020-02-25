import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

import Form from 'react-bootstrap/Form';
import {Container} from "react-bootstrap";
import Button from 'react-bootstrap/Button';

import './authentication.scss';

const Authentication = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
    };

    useEffect(() => {
        if (!isSubmitting) {
            return;
        }
       console.log('effect trigger');
    }, );

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
                        <Form.Group controlId="formGroupPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                placeholder="Password" />
                        </Form.Group>

                        <Button
                            variant="primary"
                            className="float-right"
                            type="submit"
                            disabled={isSubmitting}
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
