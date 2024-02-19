import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Login from "./components/Forms/Login";
import HomePage from "./components/HomePage";
import Register from "./components/Forms/Register";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
