import { Link } from 'react-router-dom';
import { authContext } from '../context/AuthContext/AuthContext';
import { useContext } from 'react';

export default function Navbar() {
    const { logoutUserAction } = useContext(authContext);
    return (
        <nav>
            <Link to='/'>Home</Link>
            <Link to='/profile'>Profile</Link>
            <Link to='/search'>Search</Link>
            <Link to='/register'>Register</Link>
            <Link to='/login'>Login</Link>
            <button onClick={logoutUserAction}>Log out</button>
        </nav>
    );
};