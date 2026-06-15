import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/layout/header/Header.jsx';
import Footer from './components/layout/footer/footer.jsx';
import LoginForm from './components/authentication/components/login/login.jsx';
import RegisterForm from './components/authentication/components/register/register.jsx';
import HomePage from './components/pages/homePage/homePage.jsx';
import HotelDetailsPage from './components/pages/hotelDetails/hotelDetailsPage.jsx';
import HotelsSearchPage from './components/pages/hotelsSearchPage/hotelsSearchPage.jsx';
import ErrorRoute from './components/shared/components/error404/error404.jsx'

import ProtectedRoute from './components/route/ProtectedRoute.jsx';
import AdminRoutes from './components/route/adminRoutes.jsx';

function AppRoutes() {
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

        {/* Routes cannot access without JWT Token  */}
        <Route element={<ProtectedRoute />}>
          <Route path="/bookings" />
          <Route path="/bookings/:booking_id/cancel" />
          <Route path="/bookings/:user_id/booking_history" />
        </Route>

        {/* Admin Routes */}
        {/* <Route element{<AdminRoutes />}>
          <Route path="/hotels/:hotel_id/room" />
          <Route path="/hotels/:room_id" />
          <Route path="/hotels/inventory/:room_id" />
          <Route path="/room_inventory/:room_inventory_id" />
          <Route path='/rooms/:hotel_id/room' />
        </Route> */}
        <Route path="*" element={<ErrorRoute />} />

      </Routes >
      {!hideHeaderRoutes.includes(location.pathname) && <Footer />
      }
    </>
  )
}

export default AppRoutes