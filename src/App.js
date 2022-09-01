import Login from "./components/Login";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Chat from "./components/Chat";

function App(props) {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route name="Login" exact path="/" element={<Login />} />
          <Route name="Chat" path="/chat" element={<Chat />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
