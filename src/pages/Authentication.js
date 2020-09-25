import React, { useState, useEffect, useContext } from "react";
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import { Link } from 'react-router-dom';
import FormGroup from 'react-bootstrap/FormGroup';
import FormLabel from 'react-bootstrap/FormLabel';
import FormText from 'react-bootstrap/FormText';
import { Container,  Row, Col } from "react-bootstrap";
import Button from 'react-bootstrap/Button';

import { SERVER_ROUTES, USER_FIELDS } from '../constants/api';
import '../styles/authentication.scss';

import { FormTextInput, RadioInput } from '../components/formik';

import useFetch from "../hooks/useFetch";
import { cryptData, checkEquality } from '../utils/cryptData';

import { CurrentUserContext } from '../context/currentUser';

const Authentication = props => {
    const [password, setPassword] = useState('');
    const [isLoginPath, setPath] = useState(true);
    const [{isLoading, response, error}, doFetch] = useFetch(isLoginPath ? SERVER_ROUTES.LOGIN : SERVER_ROUTES.REGISTER );
    const [fetchResult, setResult] = useState(null);
    const [currentUserState, setCurrentUserState] = useContext(CurrentUserContext);

    const register = () => {
        if (!error) {
            if (response.status === 201) {
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
        const { email, password = '1111', nick, gender } = e;

        const loginData = {
            [USER_FIELDS.USER_EMAIL]: email,
            [USER_FIELDS.USER_PASSWORD]: cryptData(password)
        };
        const registerData = {
            ...loginData,
            [USER_FIELDS.USER_NICK]: nick,
            [USER_FIELDS.USER_GENDER]: gender,
        };

        if (isLoginPath) {
            setPassword(password);
            doFetch(loginData);
        } else {
            doFetch(registerData);
        }
    };

    const equalTo = (ref, msg) => {
        return Yup.mixed().test({
            name: 'equalTo',
            exclusive: false,
            message: msg || '${path} повинен бути такий самий як ${reference}',
            params: {
                reference: ref.path,
            },
            test: function(value) {
                return value === this.resolve(ref);
            },
        });
    };
    Yup.addMethod(Yup.string, 'equalTo', equalTo);

    const loginFields = {
        email: '',
        password: ''
    };
    const registerFields = {
        ...loginFields,
        nick: '',
        gender: 'u',
        confirmPassword: ''
    };


    return (
        <Container className="mt-3">
            <Formik
                initialValues = {
                   Object.assign({
                       email: '',
                       password: ''},
                       isLoginPath && registerFields)
                }
                validationSchema = {Yup.object(
                    Object.assign({
                        email: Yup.string()
                            .email('Електронна пошта введено не вірно')
                            .required('Будь ласка заповніть це поле'),
                        password: Yup.string()
                            .matches(/^[a-z0-9_\-+!*.]+$/,
                                'Ви ввели недопустимий символ або пропуски')
                            .min(5, 'Пароль повинен бути довшим як 5 символів')
                            .required('Пароль не може бути пустим')
                    },
                        !isLoginPath && {
                            nick: Yup.string()
                                .matches(/^[a-z][a-z0-9_\-+!*.]*$/,
                                    'Ви ввели недопустимий символ або пропуски. Перший символ - англійська літера')
                                .min(3, 'Псевдо має бути довшим як 3 символи')
                                .max(15, 'Ваше псевдо має складатись із менш як 15 символів')
                                .required('Це поле обовязкове'),
                            gender: Yup.string()
                                .required('Це поле обовязкове'),

                            confirmPassword: Yup.string()
                                .equalTo(Yup.ref('password'), 'Паролі повинні співпадати')
                                .required('Повторіть будь ласка пароль')
                        })
                )}
                onSubmit = { onSubmit }
                onChange = { (e) => {console.log(e)}}

            >
                <Form
                    autoComplete="off"
                >
                    <Row>
                        <div className="col-md-6 offset-md-3 col-xs-12">
                            <h1 className="text-center">
                                { isLoginPath ? 'Увійти' : 'Зареєструватись' }
                            </h1>
                            { isLoginPath &&
                            <p className="text-center">
                                <Link to="register">Сворити акаунт?</Link>
                            </p>}

                            <FormTextInput
                                controlid="formGroupEmail"
                                label="Електронна адреса"
                                name="email"
                                type="text"
                                placeholder="Введіть свою електронну адресу"
                            />

                            { !isLoginPath &&
                                <>
                                <FormTextInput
                                    controlid="formGroupNick"
                                    label="Нік"
                                    name="nick"
                                    type="text"
                                    placeholder="Перша літера англійська"
                                    autoComplete="off"
                                    title="Використовуйте цифри, англійські літери, символи - _ . ! *"
                                />
                            </>}

                            {!isLoginPath &&
                                <FormGroup controlId="formGroupGender">
                                    <FormLabel>Стать</FormLabel>
                                    <Row>
                                        <Col>
                                            <RadioInput
                                                id="girl"
                                                name="gender"
                                                value="g"
                                            >
                                                дівчина
                                            </RadioInput>
                                        </Col>
                                        <Col>
                                            <RadioInput
                                                id="boy"
                                                name="gender"
                                                value="b"
                                            >
                                                хлопець
                                            </RadioInput>
                                        </Col>
                                        <Col>
                                            <RadioInput
                                                id="undefined"
                                                name="gender"
                                                value="u"
                                            >
                                                не визначено
                                            </RadioInput>
                                        </Col>
                                    </Row>
                                </FormGroup>
                            }

                            <FormTextInput
                                controlid="formGroupPassword"
                                label="Пароль"
                                name="password"
                                type="password"
                                placeholder="Введіть пароль"
                                title="Використовуйте цифри, англійські літери, символи - _ . ! *"
                            />

                            {!isLoginPath &&
                                <>
                                    <FormTextInput
                                        controlid="formGroupConfirmPassword"
                                        label="Повторіть пароль"
                                        name="confirmPassword"
                                        type="password"
                                        placeholder="Повторіть пароль"
                                    />
                                </>
                            }
                            { fetchResult &&
                            <FormGroup controlId="formGroupServerMessages">
                                <FormText className={fetchResult.class}>
                                    { fetchResult.message }
                                </FormText>
                            </FormGroup>
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
                    </Row>
                </Form>
            </Formik>
        </Container>
    )
};

export default Authentication
