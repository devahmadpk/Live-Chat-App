

import '../stylesheets/banner.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import {faPlus} from '@fortawesome/free-solid-svg-icons'
import { auth } from '../firebase/firebaseConfig'; // Import Firebase auth instance
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Banner = () => {

    const signOutIcon = <FontAwesomeIcon icon={faRightFromBracket} />
    const createNewIcon = <FontAwesomeIcon icon= {faPlus} />

    const navigate = useNavigate();

    // Function to handle sign out
    const handleSignOut = async () => {
        try {
            await signOut(auth); // Sign out the user
            console.log('User signed out successfully');
            navigate('/'); // Redirect to the sign-in page
        } catch (err) {
            console.error('Error signing out:', err);
        }
    };

    return (
        <div className='banner'>
            <h3>Your Name</h3>
            <div className='button-div'>
                <button className="create">{createNewIcon}</button>
                <button className="signout" onClick={handleSignOut}>{signOutIcon}</button>
            </div>
            

        </div>
    )

}

export default Banner;