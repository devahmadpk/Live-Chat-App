import Messages from "./Messages";

const Chat = () => {
    return (
        <div className="chat">
            <div className="chat-info">
                <h3>Ahmad</h3>
            </div>

            <div className="chat-history">
                <Messages />
            </div>

            <div className="chat-controls">
                <input placeholder='Type your message...'></input>
                <button >Send</button>
            </div>
        </div>
    )

}

export default Chat;