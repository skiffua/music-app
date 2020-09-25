import React, { useEffect, useRef, useState } from "react";
import { subscribeToMessages, sendMessage } from '../../utils/socket';

import './chat.scss';
import { Container } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { CHAT_USERS_FUNNY_NAMES } from './nick-names.constants';

import ChatMessageComponent from './chat-message.js';

const Chat = () => {
    const [message, setMessage] = useState('');
    const [userName, setUsername] = useState('');
    const [messagesFromServer, setMessageFromServer] = useState([]);

    const test = useRef(null);

    useEffect(() => {
        subscribeToMessages((err, message) => {
            // setUsername(message.userName);
            return printNewMessage(message);
        });
    }, []);

    useEffect(() => {
        scrollToBottom()
    }, [messagesFromServer]);

    const scrollToBottom = () => {
        test.current.scrollIntoView({ behavior: "smooth" })
    };

    const printNewMessage = (message) => {
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

        setMessage('');
        sendMessage(userNickName, message);
    };

    const generateFunnyUserName = () => {
        return CHAT_USERS_FUNNY_NAMES[Math.floor(Math.random() * Math.floor(CHAT_USERS_FUNNY_NAMES.length - 1))];
    };

     return (
            <Container
                fluid
                className="d-flex flex-column justify-content-between chat-container p-0"
            >
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
                        className="flex-grow-1 mb-0 mr-2"
                    >
                        <Form.Control
                            placeholder="назвись..."
                            type="text"
                            autoComplete="off"
                            value={ userName }
                            onChange={ (e) => { setUsername(e.target.value); }}
                            className="chat-input--user"
                        />
                        <Form.Control
                            value={ message }
                            type="text"
                            autoComplete="off"
                            onChange={ (e) => { setMessage(e.target.value); }}
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
            </Container>
        );
};

export default Chat
