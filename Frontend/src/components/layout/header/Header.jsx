import { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import './Header.css';

const Header = () => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);

    const checkAuth = () => {
        const token = localStorage.getItem('token');
        const userData = localStorage.getItem('user');
        if (token && userData) {
            setIsLoggedIn(true);
            try {
                setUser(JSON.parse(userData));
            } catch (e) {
                setUser(null);
            }
        } else {
            setIsLoggedIn(false);
            setUser(null);
        }
    };

    useEffect(() => {
        checkAuth();
        window.addEventListener('authChange', checkAuth);
        return () => window.removeEventListener('authChange', checkAuth);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setIsLoggedIn(false);
        setUser(null);
        window.dispatchEvent(new Event('authChange'));
        navigate('/login');
    };

    return (
        <header className="header-container d-flex justify-content-between align-items-center">
            <Link to="/" className="header-logo d-flex align-items-center text-decoration-none">
                <span className="logo-icon d-inline-block"></span>
                <img src={'../../../assets/images/Logo.svg'} alt="Hotel Logo" className="logo-image" />
            </Link>
            
            <nav className="header-nav d-flex">
                <NavLink to="/" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>HOME</NavLink>
                <NavLink to="/Hotels" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>SERVICES</NavLink>
                <NavLink to="/bookings" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>BOOKINGS</NavLink>
            </nav>

            <div className="header-actions d-flex">
                {isLoggedIn ? (
                    <div className="user-profile-header" style={{ display: 'flex', alignItems: 'center' }}>
                        <img src={user?.profileImage || "https://via.placeholder.com/40"} alt="Profile" className="profile-img d-flex align-items-center justify-content-center" />
                        <span style={{ color: 'white', marginRight: '15px' }}>{user?.first_name || 'User'}</span>
                        <button onClick={handleLogout} className="btn-header btn-primary-header" style={{ border: 'none', cursor: 'pointer' }}>Logout</button>
                    </div>
                ) : (
                    <>
                        <Link to="/register" className="btn-header">Register</Link>
                        <Link to="/login" className="btn-header btn-primary-header">Sign In</Link>
                    </>
                )}
            </div>
        </header>
    );
};

export default Header;
