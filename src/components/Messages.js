import Message from './Message';

const Messages = ({ msgs, currentUser, chatId }) => {
    return (
        <div className="messages">
            {msgs.map((msg, index) => (
                <Message
                    key={index}
                    message={msg} // Pass individual message as a prop
                    currentUser={currentUser} // Pass currentUser to identify sender
                    chatId={chatId} // Optional: If you need to pass chatId to the Message component
                />
            ))}
        </div>
    );
};

export default Messages;
