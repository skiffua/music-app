import React from "react";

import './chat-message.scss';

const ChatMessageComponent = (props) => {

     return (
         <div
             className={props.currentUser ? 'current-user' : ''}
         >
             <span className='current-user--name'>{ props.userName }</span> : <span>{ props.message }</span>
         </div>
        );
};

export default ChatMessageComponent
