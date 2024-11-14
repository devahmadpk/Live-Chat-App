
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Home from './pages/Home';


function App() {

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Define the path for each component */}
          <Route path="/" element={<SignIn />} />       {/* Default route to SignIn */}
          <Route path="/signup" element={<SignUp />} /> {/* Route for SignUp */}
          <Route path="/home" element={<Home />} /> {/* Route for Home */}
        </Routes>
      </div>
    </Router>
    
  )
}

export default App;
