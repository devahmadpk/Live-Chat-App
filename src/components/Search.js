import '../stylesheets/search.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useState, useRef, useContext } from 'react';
import { collection, query, where, getDocs, limit, setDoc, getDoc, doc, serverTimestamp } from "firebase/firestore";
import { db } from '../firebase/firebaseConfig';
import { AuthContext } from '../contexts/AuthContext';

const Search = ({ onSelectUser }) => {
    const [userName, setUserName] = useState('');
    const [userResults, setUserResults] = useState([]);
    const dropdownRef = useRef(null);
    const inputRef = useRef(null);
    const { currentUser } = useContext(AuthContext);

    // Handle the search logic
    const handleSearch = async () => {
        const usersRef = collection(db, "users");

        // Trim spaces and capitalize the first letter
        const formattedUserName = userName.trim();
        const capitalizedUserName = formattedUserName.charAt(0).toUpperCase() + formattedUserName.slice(1).toLowerCase();

        const q = query(usersRef, where("userName", "==", capitalizedUserName), limit(10));

        const querySnapshot = await getDocs(q);
        const usersArray = [];

        querySnapshot.forEach((doc) => {
            usersArray.push({ ...doc.data(), uid: doc.id }); // Add uid for later use
        });

        setUserResults(usersArray);
    };

    const handleKey = (e) => {
        if (e.code === 'Enter') handleSearch();
    };

    const handleSelect = async (usr) => {
        const combinedId = currentUser.uid > usr.uid 
            ? currentUser.uid + usr.uid 
            : usr.uid + currentUser.uid;

        try {
            // Check if a chat already exists
            const res = await getDoc(doc(db, 'chats', combinedId));

            if (!res.exists()) {
                // Create a new chat document if it doesn't exist
                await setDoc(doc(db, 'chats', combinedId), { messages: [] });

                // Add chat metadata to userChats
                const userChatData = {
                    [combinedId + '.userInfo']: { uid: usr.uid, userName: usr.userName },
                    [combinedId + '.date']: serverTimestamp(),
                };

                await setDoc(doc(db, 'userChats', currentUser.uid), userChatData, { merge: true });
                await setDoc(doc(db, 'userChats', usr.uid), {
                    [combinedId + '.userInfo']: { uid: currentUser.uid, userName: currentUser.userName },
                    [combinedId + '.date']: serverTimestamp(),
                }, { merge: true });
            }
        } catch (err) {
            console.error("Error handling user selection:", err);
        }

        // Pass selected user to parent via callback
        onSelectUser(usr);

        // Reset search bar and dropdown
        setUserResults([]);
        setUserName('');
    };

    return (
        <>
            <div className="search-bar">
                <div className="search-wrapper">
                    <FontAwesomeIcon icon={faMagnifyingGlass} className="search-icon" />
                    <input
                        className="search-box"
                        placeholder="Search"
                        onKeyDown={handleKey}
                        onChange={(e) => setUserName(e.target.value)}
                        value={userName}
                        ref={inputRef}
                    />
                </div>
            </div>

            {userResults.length > 0 && (
                <div className="user-dropdown" ref={dropdownRef}>
                    <div className="user-dropdown-wrapper">
                        {userResults.map((usr, index) => (
                            <div className="searched-user" key={index} onClick={() => handleSelect(usr)}>
                                <h3>{usr.userName}</h3>
                                <p>{usr.email}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
};

export default Search;
