import { useState } from "react";
import Banner from "../components/Banner";
import Chat from "../components/Chat";
import Search from "../components/Search";
import '../stylesheets/home.css';


const Home = () => {
    const [selectedUser, setSelectedUser] = useState(null);

    const handleUserSelection = (user) => {
        setSelectedUser(user);
    };
    return (
        <>
            <Banner />
            <Search onSelectUser={handleUserSelection} />

            <div className="chat-container">
                <Chat selectedUser={selectedUser} />
            </div>
        </>
    )

}

export default Home;