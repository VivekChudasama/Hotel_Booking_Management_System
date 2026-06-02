import React, { useState, useEffect } from 'react';
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
        <header className="header-container">
            <Link to="/" className="header-logo text-decoration-none">
                <span className="logo-icon"></span>
                <span style={{ color: 'white' }}>Logoipsum</span>
            </Link>
            
            <nav className="header-nav">
                <NavLink to="/" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>HOME</NavLink>
                <NavLink to="/services" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>SERVICES</NavLink>
                <NavLink to="/bookings" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>BOOKINGS</NavLink>
                <NavLink to="/explore" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>EXPLORE</NavLink>
                <NavLink to="/membership" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>MEMBERSHIP</NavLink>
            </nav>

            <div className="header-actions">
                {isLoggedIn ? (
                    <div className="user-profile-header" style={{ display: 'flex', alignItems: 'center' }}>
                        <img src={user?.profileImage || "https://via.placeholder.com/40"} alt="Profile" className="profile-img" style={{ width: '40px', height: '40px', borderRadius: '50%', marginRight: '10px' }} />
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
