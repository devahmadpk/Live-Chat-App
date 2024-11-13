import React, { useState, useEffect } from 'react';
import { firestore, auth } from '../firebase/firebaseConfig'; // Firebase imports
import { doc, getDoc } from 'firebase/firestore';
import Search from './Search';
import Banner from './Banner';
import '../stylesheets/chatroom.css';
import { useNavigate } from 'react-router-dom';
import ChatCard from './ChatCard';
import ChatWrapper from './ChatWrapper';

const ChatRoom = () => {
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const getUserData = async () => {
      const user = auth.currentUser;

      if (user) {
        const docRef = doc(firestore, 'users', user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setUsername(docSnap.data().userName); // Set username from Firestore
        } else {
          console.log('No such document!');
        }
      } else {
        navigate('/'); // If no user is logged in, redirect to login
      }

      setLoading(false); // Set loading to false after the data fetch
    };

    getUserData();
  }, [navigate]);

  return (
    <div className="chat-room">
          <Banner username={username} /> {/* Pass username to Banner */}
          <Search />
          <ChatWrapper />

    </div>
  );
};

export default ChatRoom;
