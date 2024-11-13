import ChatCard from "./ChatCard";
import '../stylesheets/chatwrapper.css';
import Chat from "./Chat";

const ChatWrapper = () => {
    return (
        <div className="chat-wrapper">
            <div className="chat-scroll-panel">
                <ChatCard />
            </div>
            <div className="chat-panel">
                <Chat />
            </div>
        </div>
        
    )
}

export default ChatWrapper;