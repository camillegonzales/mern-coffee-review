import { Link } from 'react-router-dom';

export default function Navbar() {
    return (
        <nav>
            <Link to='/'>Home</Link>
            <Link to='/profile'>Profile</Link>
            <Link to='/search'>Search</Link>
            <Link to='/register'>Register</Link>
            <Link to='/login'>Login</Link>
            <button>Logout</button>
        </nav>
    );
};