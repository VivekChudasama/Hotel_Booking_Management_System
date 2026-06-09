import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/layout/header/Header.jsx';
import Footer from './components/layout/footer/footer.jsx';
import LoginForm from './components/authentication/components/login/login.jsx';
import RegisterForm from './components/authentication/components/register/register.jsx';
import HomePage from './components/pages/homePage/homePage.jsx';
import HotelDetailsPage from './components/pages/hotelDetails/hotelDetailsPage.jsx';
import HotelsSearchPage from './components/pages/hotelsSearchPage/hotelsSearchPage.jsx';
import ProtectedRoute from './components/route/ProtectedRoute.jsx';
import './App.css';
import './assets/css/variables.css';

function App() {
  const location = useLocation();
  const hideHeaderRoutes = ['/login', '/register'];

  return (
    <>
      {!hideHeaderRoutes.includes(location.pathname) && <Header />}
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/hotel/:hotelId" element={<HotelDetailsPage />} />
        <Route path="/hotels" element={<HotelsSearchPage />} />

        {/* Protected Routes (Customer & Admin) */}
        <Route element={<ProtectedRoute />}>
          <Route path="/bookings" element={<div style={{ minHeight: '60vh', padding: '50px' }}><h2>Bookings Page Placeholder</h2></div>} />
        </Route>

        {/* Admin Only Routes */}
        <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
          <Route path="/admin" element={<div style={{ minHeight: '60vh', padding: '50px' }}><h2>Admin Dashboard Placeholder</h2></div>} />
        </Route>

      </Routes>
      {!hideHeaderRoutes.includes(location.pathname) && <Footer />}
    </>
  )
}

export default App