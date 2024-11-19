import { useState } from "react";


const Message = ({ message, currentUser }) => {
    const isCurrentUser = message.senderId === currentUser.uid; // Check if the message is sent by the current user

    return (
        <div className="msg-container">
            <div className={`message ${isCurrentUser ? "sent" : "received"}`}>
            <p>{message.text}</p>
            </div>
        </div>
        
    );
};

export default Message;
