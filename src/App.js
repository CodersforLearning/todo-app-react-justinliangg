import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Nav from "./components/Nav";

import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

function App() {

  return (
    <>
      <Router>
        <Nav/>
        <Routes>
          <Route path="/" element={<Dashboard/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
