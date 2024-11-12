import React, { useState, useEffect } from 'react';
import { auth } from '../firebase/firebaseConfig'; // Import Firebase auth instance
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth'; // Firebase auth methods
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import '../stylesheets/signin.css';
// import { useNavigate } from 'react-router-dom';  Import for navigation after login

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(false);
//   const navigate = useNavigate();

  // Check if user is already logged in
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log('User is logged in:', user);
        setUser(user);
        // Redirect to home page or another page after login
        // navigate('/home');
      }
      else {
        setUser(null); // Set to null if no user is logged in
      }
    });
    return () => unsubscribe();
  }, []
//    [navigate]
);

  // Handle form submission
  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Sign in the user with Firebase Authentication
      await signInWithEmailAndPassword(auth, email, password);
      console.log('User signed in successfully');
    //   navigate('/home');  Redirect or navigate after login
    } catch (err) {
      console.error('Error signing in:', err);

      // Enhanced error handling
      switch (err.code) {
        case 'auth/user-not-found':
          setError('No account found with this email.');
          break;
        case 'auth/wrong-password':
          setError('Incorrect password. Please try again.');
          break;
        case 'auth/invalid-credential':
          setError('Invalid credentials provided. Please check your input.');
          break;
        default:
          setError('Failed to login. Please check your credentials.');
          break;
      }
    }

    setLoading(false);
};

  return (
    <div className='signin-div'>
      <div className="greet-div">
        <h2>Welcome Back</h2>
        <p>Enter your credentials for login</p>
      </div>

      <form onSubmit={handleSignIn} className="form-div">
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

        <button type="submit" disabled={loading}>
          {loading ? 'Logging In...' : 'Login Now'}
        </button>

        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>

      <div className="bottom-div">
        <p>Don't have an account? <span><a href="/signup">Sign Up</a></span></p>
      </div>
    </div>
  );
};

export default SignIn;
