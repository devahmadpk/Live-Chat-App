import Banner from "../components/Banner";
import Chat from "../components/Chat";
import Sidebar from "../components/Sidebar";
import '../stylesheets/home.css';


const Home = () => {
    return (
        <>
            <Banner />

            <div className="chat-container">
                <Sidebar />
                <Chat />
            </div>
        </>
    )

}

export default Home;