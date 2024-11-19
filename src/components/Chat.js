import { useState, useEffect, useContext } from "react";
import Messages from "./Messages";
import { doc, updateDoc, onSnapshot, arrayUnion, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { AuthContext } from "../contexts/AuthContext";

const Chat = ({ selectedUser }) => {
    const { currentUser } = useContext(AuthContext); // Use currentUser from AuthContext
    const [msg, setMsg] = useState(""); // Message input
    const [msgs, setMsgs] = useState([]); // Messages array
    const [combinedId, setCombinedId] = useState(null); // Chat ID

    // Set the combined ID when a user is selected
    useEffect(() => {
        if (selectedUser && currentUser) {
            const id = currentUser.uid > selectedUser.uid
                ? currentUser.uid + selectedUser.uid
                : selectedUser.uid + currentUser.uid;
            setCombinedId(id);
        }
    }, [selectedUser, currentUser]);

    // Fetch messages from Firestore in real-time
    useEffect(() => {
        if (combinedId) {
            const unsub = onSnapshot(doc(db, "chats", combinedId), (doc) => {
                if (doc.exists()) {
                    setMsgs(doc.data().messages || []);
                } else {
                    setMsgs([]); // Reset if no messages exist
                }
            });

            return () => unsub(); // Cleanup the listener on component unmount
        }
    }, [combinedId]);

    // Handle message input
    const handleMsg = (e) => {
        setMsg(e.target.value);
    };

    // Send a new message
    const sendMsg = async () => {
        if (msg.trim() === "") return; // Avoid sending empty messages
        if (!combinedId) return; // No chat ID means no active chat

        const message = {
            text: msg,
            senderId: currentUser.uid,
        };

        try {
            await updateDoc(doc(db, "chats", combinedId), {
                messages: arrayUnion(message), // Add the new message to the array
            });
            setMsg(""); // Clear the input field
        } catch (err) {
            console.error("Error sending message:", err);
        }
    };

    return (
        <div className="chat">
            <div className="chat-info">
                {selectedUser ? (
                    <h3>{selectedUser.userName}</h3> // Display selected user's name
                ) : (
                    <h3>Select a user to chat</h3> // Default message
                )}
            </div>

            <div className="chat-history">
                <Messages msgs={msgs} currentUser={currentUser} chatId={combinedId} />
            </div>

            {selectedUser && ( // Show chat controls only if a user is selected
                <div className="chat-controls">
                    <input
                        placeholder="Type your message..."
                        value={msg}
                        onChange={handleMsg}
                    />
                    <button onClick={sendMsg}>Send</button>
                </div>
            )}
        </div>
    );
};

export default Chat;
