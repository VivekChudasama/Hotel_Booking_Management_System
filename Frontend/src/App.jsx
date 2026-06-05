import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/layout/header/Header.jsx';
import Footer from './components/layout/footer/footer.jsx';
import LoginForm from './components/authentication/components/login/login.jsx';
import RegisterForm from './components/authentication/components/register/register.jsx';
import './App.css';
import './assets/css/variables.css';

function App() {
  const location = useLocation();
  const hideHeaderRoutes = ['/login', '/register'];

  return (
    <>
      {!hideHeaderRoutes.includes(location.pathname) && <Header />}
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
      </Routes>
      {!hideHeaderRoutes.includes(location.pathname) && <Footer/>}
    </>
  )
}

export default App