import Login from "./components/Login";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Chat from "./components/Chat";

function App(props) {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route name="Login" exact path="/" element={<Login />} />
          <Route name="Dashboard" path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
