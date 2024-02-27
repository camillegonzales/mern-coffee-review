import { Routes, Route } from "react-router-dom";
import './App.css';
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import Register from './forms/Register';
import Login from './forms/Login';
import Search from './pages/Search';
import ShopProfile from './pages/ShopProfile';
import UserProfile from './pages/Profile/UserProfile';
import AddReview from './forms/AddReview';
import EditReview from './forms/EditReview';
import { Toaster } from "react-hot-toast";


function App() {
  return (
    <>
      <Header />
      <Navbar />
      <Toaster position='bottom-right' toastOptions={{duration: 4000}} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/search" element={<Search />} />
        <Route path="/shop/:id" element={<ShopProfile />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/add-review" element={<AddReview />} />
        <Route path="/edit-review/:id" element={<EditReview />} />
      </Routes>
      </>
  );
};

export default App;
