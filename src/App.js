import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import CreateInterview from "./pages/CreateInterview";
import SavedInterviews from "./pages/SavedInterviews";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes className='routes'>
          <Route path="/" element={<Home />} />
          <Route path="/create-interview" element={<CreateInterview />} />
          <Route path="/saved-interviews" element={<SavedInterviews />} />
          <Route path="/auth" element={<Auth />} />
          
        </Routes>
      </Router>
    </div>
  );
}

export default App;
