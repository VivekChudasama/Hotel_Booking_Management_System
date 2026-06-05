import { useState, useEffect } from 'react';
import { Nav, Navbar, Container, NavbarBrand } from 'react-bootstrap';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import './Header.css';
import logo from '../../../assets/images/Logo.svg';

const Header = () => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(() => {
        const token = localStorage.getItem('token');
        const userData = localStorage.getItem('user');
        return !!(token && userData);
    });

    const [user, setUser] = useState(() => {
        const userData = localStorage.getItem('user');
        if (userData) {
            try {
                return JSON.parse(userData);
            } catch (e) {
                return null;
            }
        }
        return null;
    });

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
            <Container fluid>
                <NavbarBrand className="header-logo d-flex align-items-center text-decoration-none">
                    <Link to="/"><img src={logo} alt="Logo" className="logo-image" loading="eager" /></Link>
                </NavbarBrand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" className="border-white" />
                <Navbar.Offcanvas placement="end">
                    <Navbar.Collapse id="responsive-navbar-nav" className="btn-close-white">
                        <Nav className="ms-auto d-flex align-items-lg-center">
                            <div className="header-nav d-flex flex-column flex-lg-row">
                                <NavLink to="/" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>HOME</NavLink>
                                <NavLink to="/Hotels" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>SERVICES</NavLink>
                                <NavLink to="/bookings" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>BOOKINGS</NavLink>
                                <NavLink to="/EXPLORE" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>EXPLORE</NavLink>
                                <NavLink to="/MEMBERSHIP" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>MEMBERSHIP</NavLink>
                            </div>

                            <div className="header-actions d-flex flex-row align-items-start mt-3 mt-lg-0 ms-lg-3">
                                {isLoggedIn ? (
                                    <div className="user-profile-header d-flex flex-column flex-lg-row align-items-center">
                                        <img src={user?.profile_image || "https://via.placeholder.com/40"} alt="Profile" className="profile-img mb-2 mb-lg-0" />
                                        <span className="text-white mx-3 mb-2 mb-lg-0">{user?.name}</span>
                                        <button onClick={handleLogout} className="btn-header btn-primary-header border-0">Logout</button>
                                    </div>
                                ) : (
                                    <>
                                        <Link to="/register" className="btn-header mb-2 mb-lg-0">Register</Link>
                                        <Link to="/login" className="btn-header btn-primary-header">Sign In</Link>
                                    </>
                                )}
                            </div>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar.Offcanvas>

            </Container>
        </Navbar>
    );
};

export default Header;
