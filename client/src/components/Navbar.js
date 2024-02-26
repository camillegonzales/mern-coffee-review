import { Link } from 'react-router-dom';
import { authContext } from '../context/AuthContext/AuthContext';
import { useContext } from 'react';

export default function Navbar() {
    const { logoutUserAction, token } = useContext(authContext);
    return (
        <nav>
            <Link to='/'>Home</Link>
            <Link to='/search'>Search</Link>
            {!token && <>
                <Link to='/register'>Register</Link>
                <Link to='/login'>Login</Link>
            </>}
            {token && <>
                <Link to='/profile'>Profile</Link>
                <button onClick={logoutUserAction}>Log out</button>
            </>}
        </nav>
    );
};