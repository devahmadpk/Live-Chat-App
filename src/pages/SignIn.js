import React, { useState } from 'react';
import { auth } from '../firebase/firebaseConfig'; // Import Firebase auth instance
import { signInWithEmailAndPassword } from 'firebase/auth'; // Firebase auth methods
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import '../stylesheets/signin.css';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null); // initially null to track auth state
  const navigate = useNavigate();


  // Handle form submission
  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await signInWithEmailAndPassword(auth, email, password);
      setUser(auth.currentUser); // update the user state
      navigate('/home')
    } catch (err) {
      console.error('Error signing in:', err);
      alert('Error signing in')

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
        <p>Don't have an account? <span><Link to={'/signup'}>Sign Up</Link></span></p>
      </div>
    </div>
  );
};

export default SignIn;
