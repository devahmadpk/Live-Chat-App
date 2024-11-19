import '../stylesheets/banner.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { auth } from '../firebase/firebaseConfig'; // Import Firebase auth instance
import { signOut, getAuth } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { useState, useEffect } from 'react';

const Banner = () => {
    const [userName, setUserName] = useState('');
    const auth = getAuth();
    const db = getFirestore();
    const navigate = useNavigate();

    useEffect(() => {
        const getUserName = async () => {
            if (auth.currentUser) {
                try {
                    const userDoc = doc(db, "users", auth.currentUser.uid);
                    const userSnapshot = await getDoc(userDoc);
                    if (userSnapshot.exists()) {
                        setUserName(userSnapshot.data().userName);
                    } else {
                        console.log("No such user document!");
                    }
                } catch (err) {
                    console.error("Error fetching user data:", err);
                }
            }
        };

        getUserName();
    }, [auth, db]);

    const signOutIcon = <FontAwesomeIcon icon={faRightFromBracket} />;

    // Function to handle sign out
    const handleSignOut = async () => {
        try {
            await signOut(auth);
            console.log('User signed out successfully');
            navigate('/'); // Redirect to the sign-in page
        } catch (err) {
            console.error('Error signing out:', err);
        }
    };

    return (
        <div className='banner'>
            <h3>Welcome, {userName ? userName : 'Guest'}</h3>
            <div className='button-div'>
                <button className="signout" onClick={handleSignOut}>{signOutIcon}</button>
            </div>
        </div>
    );
};

export default Banner;
