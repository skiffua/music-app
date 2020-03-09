import React, { useState, useEffect, useContext } from "react";

import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import {Container, Col} from "react-bootstrap";
import Button from 'react-bootstrap/Button';

import { SERVER_ROUTES, USER_FIELDS } from '../constants/api';
import '../styles/authentication.scss';

import useFetch from "../hooks/useFetch";
import { cryptData, checkEquality } from '../utils/cryptData';

import { CurrentUserContext } from '../context/currentUser';

const Authentication = props => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password_confirm, setPasswordConfirm] = useState('');
    const [gender, setGender] = useState('u');
    const [nick, setNick] = useState('');

    const [isLoginPath, setPath] = useState(true);
    const [{isLoading, response, error}, doFetch] = useFetch(isLoginPath ? SERVER_ROUTES.LOGIN : SERVER_ROUTES.REGISTER );
    const [fetchResult, setResult] = useState(null);
    const [currentUserState, setCurrentUserState] = useContext(CurrentUserContext);

    const register = () => {
        if (!error) {
            if (response.status === 201 && response.data.user) {
            setResult({
                user: Object.assign({}, response.data.user),
                message: 'користувач успішно зареєстрований',
                class: 'text-success'
            })
            } else if (response.status === 202) {
                setResult({
                    message: 'користувач з такою скринькою або ніком зареєстрований :(',
                    class: 'text-warning'
                });
            }} else {
                setResult({
                    message: 'ой, щось пішло не так, спробуйте ще раз :(',
                    user: null,
                    class: 'text-danger'
                })
            }
    };

    const login = () => {
        if (!error) {
            if (response.status === 200 && response.data.user) {
                let passwordHash = JSON.parse(response.data.user).password;
                let comparePassword = checkEquality(password, passwordHash);

                if (comparePassword){
                    setResult({
                        // user: Object.assign({}, response.data.user),
                        message: 'вхід успішний, йдемо на домашню сторінку :)',
                        class: 'text-success'
                    });
                    setCurrentUserState( state => ({
                        ...state,
                        isLoading: false,
                        isLoggenIn: true,
                        currentUser: Object.assign({}, JSON.parse(response.data.user))
                    }))
                } else {
                    setResult({
                        message: 'пароль не вірний :(',
                        class: 'text-warning'
                    })
                }
            } else if (response.status === 404) {
                setResult({
                    message: 'вибачте, користувач не знайдений',
                    class: 'text-danger'
                })
            }} else {
                setResult({
                    message: 'ой, щось пішло не так, спробуйте ще раз :(',
                    class: 'text-danger'
                })
            }
    };

    useEffect(() => {
        setPath(props.match.path === '/login')
    });

    useEffect(() => {
        if (response) {
            if (isLoginPath) {
                login();
            } else if (!isLoginPath) {
                register();
            }
        } else {setResult(null)}
    },[response, error]);

    const onSubmit = (e) => {
        e.preventDefault();
        const loginData = {
            [USER_FIELDS.USER_EMAIL]: email,
            [USER_FIELDS.USER_PASSWORD]: cryptData(password)
        };
        const registerData = {
            ...loginData,
            [USER_FIELDS.USER_NICK]: nick,
            [USER_FIELDS.USER_GENDER]: gender,
        };

        isLoginPath ? doFetch(loginData) : doFetch(registerData);
    };

    return (
        <Container className="mt-3">
            <Form onSubmit={onSubmit}>
                <Form.Row>
                    <div className="col-md-6 offset-md-3 col-xs-12">
                        <h1 className="text-center">
                            { isLoginPath ? 'Увійти' : 'Зареєструватись' }
                        </h1>
                        { isLoginPath &&
                        <p className="text-center">
                            <Link to="register">Сворити акаунт?</Link>
                        </p>}

                        <Form.Group controlId="formGroupEmail">
                            <Form.Label>Електронна адреса</Form.Label>
                            <Form.Control
                                type="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                placeholder="Введіть скриньку" />
                        </Form.Group>
                        { !isLoginPath &&
                        <Form.Group controlId="formGroupNick">
                            <Form.Label>Нік</Form.Label>
                            <Form.Control
                                type="text"
                                value={nick}
                                onChange={e => setNick(e.target.value)}
                                placeholder="Введіть нік"
                                autoComplete="off"
                            />
                        </Form.Group>}
                        { !isLoginPath &&
                        <Form.Group controlId="formGroupGender">
                            <Form.Label>Стать</Form.Label>
                            <Form.Row >
                                <Col>
                                <Form.Check
                                    type="radio"
                                    value="m"
                                    name="gender"
                                    label="чоловіча"
                                    id="r1"
                                    onChange={e => setGender(e.target.value)}
                                />
                                </Col>
                                <Col>
                                <Form.Check
                                    type="radio"
                                    value="w"
                                    name="gender"
                                    label="жіноча"
                                    id="r2"
                                    onChange={e => setGender(e.target.value)}
                                />
                                </Col>
                                <Col>
                                <Form.Check
                                    type="radio"
                                    value="u"
                                    name="gender"
                                    label="не визначано"
                                    id="r3"
                                    onChange={e => setGender(e.target.value)}
                                />
                                </Col>
                            </Form.Row>
                        </Form.Group>
                        }
                        <Form.Group controlId="formGroupPassword">
                            <Form.Label>Введіть пароль</Form.Label>
                            <Form.Control
                                type="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                placeholder="Пароль" />
                        </Form.Group>
                        {!isLoginPath &&
                        <Form.Group controlId="formGroupConfirmPassword">
                            <Form.Label>Підтвердіть пароль</Form.Label>
                            <Form.Control
                                type="password"
                                value={password_confirm}
                                onChange={e => setPasswordConfirm(e.target.value)}
                                placeholder="Повторіть пароль" />
                        </Form.Group>}
                        { fetchResult &&
                            <Form.Group controlId="formGroupServerMessages">
                                <Form.Text className={fetchResult.class}>
                                   { fetchResult.message }
                                </Form.Text>
                            </Form.Group>
                        }
                        <Button
                            variant="primary"
                            className="float-right"
                            type="submit"
                            disabled={isLoading}
                        >
                            { isLoginPath ? 'Увійти' : 'Реєстрація' }
                        </Button>

                    </div>
                </Form.Row>
            </Form>
        </Container>
    )
};

export default Authentication
