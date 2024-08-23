import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Posts from "./pages/Posts";
import About from "./pages/About";
import { UserProvider } from "./context/UserContext";
import UserContext from "./context/UserContext"; 
import "./App.css";

function App() {
  return (
    <UserProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/posts" element={<PrivateRoute element={<Posts />} />} />
          <Route path="/about" element={<PrivateRoute element={<About />} />} />
          <Route path="/" element={<PrivateRoute element={<Home />} />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}


function PrivateRoute({ element, ...rest }) {
  const { user } = useContext(UserContext);

  return user ? element : <Navigate to="/login" />;
}

export default App;
