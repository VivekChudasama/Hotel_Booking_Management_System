import { Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header/Header.jsx';
import LoginForm from './components/authentication/components/login/login.jsx';
import RegisterForm from './components/authentication/components/register/register.jsx';
import './App.css';
import './assets/css/variables.css';

function App() {

  return (
    <>
     {/* <Header /> */}
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
      </Routes>
    </>
  )
}

export default App