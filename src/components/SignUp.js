import React, { useState } from 'react';
import { auth, firestore } from '../firebase/firebaseConfig'; // Import Firebase auth instance
import { collection, doc, setDoc, serverTimestamp } from 'firebase/firestore'; // Firestore methods
import { createUserWithEmailAndPassword } from 'firebase/auth'; // Firebase auth method
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import firebase from 'firebase/compat/app';
import { useNavigate } from 'react-router-dom';
import '../stylesheets/signup.css';

const SignUp = () => {
  // State variables for input fields
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handle form submission
  const handleSignUp = async (e) => {
    e.preventDefault();  // Prevent the default form submission behavior
    setLoading(true);     // Set loading to true while the signup process is in progress
    setError('');         // Clear any previous errors
  
    // Check if the passwords match
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      setLoading(false);
      return;
    }
  
    try {
      // Create a new user using Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      // Save additional data (e.g., name, email) to Firestore
      await setDoc(doc(collection(firestore, 'users'), user.uid), {
        userName, // Store username
        email, // Store email
        password, // Store password
        createdAt: serverTimestamp() // Store account creation timestamp
      });
  
      console.log('User signed up and data saved to Firestore');
      alert('Account created successfully');
      setUserName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      
      // Redirect or show success message here
    } catch (err) {
      console.error('Error signing up:', err);
      if (err.code === 'auth/email-already-in-use') {
        setError('This email is already in use. Please login.');
      } else {
        setError(err.message);
      }
    }
    setLoading(false);  // Set loading to false after the process is complete
  };
  ;

  return (
    <div className='signup-div'>
      <div className="greet-div">
        <h2>Sign Up</h2>
        <p>Create Your Account</p>
      </div>

      <form onSubmit={handleSignUp} className="form-div">
        {/* User input */}
        <div className='form-element'>
          <FontAwesomeIcon icon={faUser} className='icon' />
          <input
            type="text"
            placeholder="Username"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
          />
        </div>

        {/* Email input */}
        <div className='form-element'>
          <FontAwesomeIcon icon={faEnvelope} className='icon' />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {/* Password input */}
        <div className='form-element'>
          <FontAwesomeIcon icon={faLock} className='icon' />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {/* Confirm Password input */}
        <div className='form-element'>
          <FontAwesomeIcon icon={faLock} className='icon' />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        {/* Submit button */}
        <button type="submit" disabled={loading}>
          {loading ? 'Signing Up...' : 'Sign Up'}
        </button>

        {/* Display error message if there's an error */}
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>

      <div className="bottom-div">
        <p>Already have an account? <span><a href='/'>Login</a></span></p>
      </div>
    </div>
  );
};

export default SignUp;
