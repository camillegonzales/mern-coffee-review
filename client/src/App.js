import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Login from "./pages/Login";
import HomePage from "./pages/HomePage";
import Register from "./pages/Register";
import Header from "./components/Header";
import Navbar from "./components/Navbar";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
