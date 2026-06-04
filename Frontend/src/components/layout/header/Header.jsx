import { useState, useEffect } from 'react';
import { Nav, Navbar, Container } from 'react-bootstrap';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import './Header.css';
import logo from '../../../assets/images/Logo.svg';

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
        <Navbar collapseOnSelect expand="lg" className="header-container d-flex align-items-center position-sticky">
            <Container>
                <Navbar.Brand className="header-logo d-flex align-items-center text-decoration-none">
                    <span className="logo-icon"></span>
                    <img src={logo} alt="Hotel Logo" className="logo-image" />
                </Navbar.Brand>
                <Navbar.Collapse id="responsive-navbar-nav"></Navbar.Collapse>
                <Nav className="me-auto">
                    <div className='ms-auto d-flex align-items-lg-center'>
                        <div className="header-nav d-flex">
                            <Nav.Link to="/" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>HOME</Nav.Link>
                            <Nav.Link to="/Hotels" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>SERVICES</Nav.Link>
                            <Nav.Link to="/bookings" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>BOOKINGS</Nav.Link>
                        </div>

                        <div className="header-actions d-flex">
                            {isLoggedIn ? (
                                <div className="user-profile-header" style={{ display: 'flex', alignItems: 'center' }}>
                                    <img src={user?.profile_image || "https://via.placeholder.com/40"} alt="Profile" className="profile-img d-flex align-items-center justify-content-center" />
                                    <span style={{ color: 'white', marginRight: '15px' }}>{user.name}</span>
                                    <button onClick={handleLogout} className="btn-header btn-primary-header" style={{ border: 'none', cursor: 'pointer' }}>Logout</button>
                                </div>
                            ) : (
                                <>
                                    <Link to="/register" className="btn-header">Register</Link>
                                    <Link to="/login" className="btn-header btn-primary-header">Sign In</Link>
                                </>
                            )}
                        </div>
                    </div>
                </Nav>
            </Container>
        </Navbar>
    );
};

export default Header;
