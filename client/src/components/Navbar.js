import { Link } from 'react-router-dom';
import { authContext } from '../context/AuthContext/AuthContext';
import { useContext, useState } from 'react';

export default function Navbar() {
    const { logoutUserAction, token } = useContext(authContext);
    const [showMenu, setShowMenu] = useState(false);

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    return (
        <nav className="navbar">
            <h1 className="logo">Spill The Beans</h1>
            <div className={`menu ${showMenu ? 'show' : ''}`}>
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
            </div>
            <div className="hamburger" onClick={toggleMenu}>
                <div className={`bar ${showMenu ? 'open' : ''}`} />
                <div className={`bar ${showMenu ? 'open' : ''}`} />
                <div className={`bar ${showMenu ? 'open' : ''}`} />
            </div>
        </nav>
    );
};
