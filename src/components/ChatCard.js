
import '../stylesheets/chatcard.css';

const ChatCard = () => {
    return(
        <div className="chat-card">
            <div className="chat-content">
                <h3>Ahmad</h3>
                <p>Hello what's up dude</p>
            </div>
            <div className="msg-counter">
                <span>1</span>
            </div>
            
        </div>
    )
}

export default ChatCard;