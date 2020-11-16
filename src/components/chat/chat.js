import React, { useEffect, useRef, useState } from "react";
import {subscribeToMessages, sendMessage, subscribeToErrorMessage} from '../../utils/socket';

import './chat.scss';
import { Container } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import AudioPlayer from '../audio-player/audio-player.js';

import { CHAT_USERS_FUNNY_NAMES } from './nick-names.constants';

import ChatMessageComponent from './chat-message.js';

const Chat = () => {
    const [message, setMessage] = useState('');
    const [userName, setUsername] = useState('');
    const [messagesFromServer, setMessageFromServer] = useState([]);
    const [errorChatMessage, setErrorChatMessage] = useState('');

    const test = useRef(null);

    useEffect(() => {
        subscribeToMessages((err, message) => {
            // setUsername(message.userName);
            return printNewMessage(message);
        });

        subscribeToErrorMessage((err, message) => {
            // setUsername(message.userName);
            return setErrorChatMessage(message.message);
        });
    }, []);

    useEffect(() => {
        scrollToBottom()
    }, [messagesFromServer]);

    const scrollToBottom = () => {
        test.current.scrollIntoView({ behavior: "smooth" })
    };

    const printNewMessage = (message) => {
        setMessage('');
        setMessageFromServer(messagesFromServer => [ ...messagesFromServer, message ]);
    };

    const onSendMessage = (e) => {
        e.preventDefault();
        let userNickName = userName;

        if (!message) return;
        if (!userName) {
            userNickName = generateFunnyUserName();
            setUsername(userNickName);
        }

        sendMessage(userNickName, message);
    };

    const resetErrorMessage = () => {
        setErrorChatMessage('')
    };

    const generateFunnyUserName = () => {
        return CHAT_USERS_FUNNY_NAMES[Math.floor(Math.random() * Math.floor(CHAT_USERS_FUNNY_NAMES.length - 1))];
    };

     return (
            <Container
                fluid
                className="d-flex flex-grow-1 flex-column justify-content-between chat p-0"
            >
                <Row>
                    <AudioPlayer />
                </Row>
                <Row className="m-0 chat-container flex-column flex-grow-1">
                    <Col
                        className="chat-items flex-grow-1"
                    >
                        { messagesFromServer.map((data, index) => (
                            <ChatMessageComponent
                                userName={data.userName}
                                message={data.message}
                                key={index}
                                currentUser={userName === data.userName}
                            />
                        )) }
                        <Row ref={test}/>
                    </Col>
                    <Form
                        className="d-flex align-items-end mb-2"
                    >
                        <Form.Group
                            controlId="formBasicEmail"
                            className="flex-grow-1 mb-0 mr-2 control-block"
                        >
                            <Form.Control
                                placeholder="назвись..."
                                type="text"
                                autoComplete="off"
                                value={ userName }
                                onChange={ (e) => { setUsername(e.target.value); }}
                                className="chat-input--user"
                            />
                            <span className="chat-error-message">{errorChatMessage}</span>
                            <Form.Control
                                value={ message }
                                type="text"
                                autoComplete="off"
                                onChange={ (e) => { setMessage(e.target.value); }}
                                onInput={() => resetErrorMessage()}
                            />
                        </Form.Group>

                        <Button
                            size="sm"
                            variant="primary"
                            type="submit"
                            onClick={ onSendMessage }
                            className="chat-button--send"
                        >
                            Send
                        </Button>
                    </Form>
                </Row>
            </Container>
        );
};

export default Chat
