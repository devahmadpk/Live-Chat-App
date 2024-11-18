import '../stylesheets/search.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useState, useRef, useContext } from 'react';
import { collection, query, where, getDocs, limit, setDoc, updateDoc, getDoc, doc, serverTimestamp } from "firebase/firestore";
import { db } from '../firebase/firebaseConfig';
import { AuthContext } from '../contexts/AuthContext';

const Search = () => {
    const [userName, setUserName] = useState('');
    const [user, setUser] = useState([]);
    const dropdownRef = useRef(null); // Reference for dropdown
    const inputRef = useRef(null); // Reference for the input field

    const { currentUser } = useContext(AuthContext);

    // Handle the search logic
    const handleSearch = async () => {
        const usersRef = collection(db, "users");

        // Trim spaces and capitalize the first letter
        const formattedUserName = userName.trim();
        const capitalizedUserName = formattedUserName.charAt(0).toUpperCase() + formattedUserName.slice(1).toLowerCase();

        const q = query(usersRef, where("userName", "==", capitalizedUserName), limit(10));

        const querySnapshot = await getDocs(q);
        const usersArray = []; // Array to store all matching user documents
        
        querySnapshot.forEach((doc) => {
            usersArray.push(doc.data()); // Add each user's data to the array
        });

        setUser(usersArray); // Update state with the array of user data
      
    };

    const handleKey = (e) => {
        if (e.code === 'Enter') handleSearch();
    };

    const handleSelect = async (usr) => {
        console.log(usr)
        console.log("here is login  usr");
     
        // console.log(user)
        // console.log("here is login  user");
        // console.log(currentUser)
        const combinedId =  currentUser.uid + usr.uid ;
        console.log("Combined ID:", combinedId);

        try {
            // Check if a chat already exists
            const res = await getDoc(doc(db, 'userChats', combinedId));
            console.log("Checking for existing chat:", res.exists());

            if (!res.exists()) {
                console.log("Creating new chat document...");
                await setDoc(doc(db, 'userChats', combinedId), { messages: [] });

                console.log("Chat document created in 'chats' collection");

                // Update userChats for current user
                await updateDoc(doc(db, 'userChats', currentUser.uid), {
                    [combinedId + '.userInfo']: { uid: user.uid, userName: user.userName },
                    [combinedId + '.date']: serverTimestamp(),
                });
                console.log("UserChats updated for currentUser");

                // Update userChats for selected user
                await updateDoc(doc(db, 'userChats', user.uid), {
                    [combinedId + '.userInfo']: { uid: currentUser.uid, userName: currentUser.userName },
                    [combinedId + '.date']: serverTimestamp(),
                });
                console.log("UserChats updated for selected user");
            } else {
                console.log("Chat already exists, no need to create.");
            }
        } catch (err) {
            console.error("Error creating or updating chat:", err);
        }
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
                        ref={inputRef} // Assigning the input ref
                    />
                </div>
            </div>

            {user.length >0 && (
                <div className="user-dropdown" ref={dropdownRef}> {/* Using the dropdownRef */}
                    <div className="user-dropdown-wrapper">
                        {user.length > 0 ? (
                            user.map((usr, index) => (
                                <div className="searched-user" key={index} onClick={()=>handleSelect(usr)}>
                                    <h3>{usr.userName}</h3>
                                    <p>{usr.email}</p>
                                </div>
                            ))
                        ) : null} {/* Removed the "User not found" message */}
                    </div>
                </div>
            )}
        </>
    );
};

export default Search;
