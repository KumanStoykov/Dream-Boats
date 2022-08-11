import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AuthGuard = () => {
    const user = useSelector(state => state.auth.userData);

    if (!user?.email) {
        return <Outlet />;
    }

    return <Navigate to={'/'} replace />;
    
};


export default AuthGuard;