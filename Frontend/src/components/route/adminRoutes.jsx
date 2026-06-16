import { Navigate, Outlet } from 'react-router-dom';

const AdminRoutes = () => {
    const token = localStorage.getItem('token');
    const userStr = localStorage.getItem('user');

    if (!token || !userStr) {
        return <Navigate to="/login" replace />;
    }

    try {
        const user = JSON.parse(userStr);
        if (user.role !== 'Admin') {
            return <Navigate to="/" replace />;
        }

        return <Outlet />;
    } catch (e) {
        return <Navigate to="/login" replace />;
    }
};

export default AdminRoutes;
