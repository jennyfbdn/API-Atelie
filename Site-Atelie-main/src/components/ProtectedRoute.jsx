import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, adminOnly = false }) => {
    const userJson = localStorage.getItem("user");
    const user = JSON.parse(userJson || '{}');
    const isAdmin = user.nivelAcesso == 'ADMIN';
    
    if (adminOnly && !isAdmin) {
        return <Navigate to="/home" replace />;
    }
    
    return children;
};

export default ProtectedRoute;