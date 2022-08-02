import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AuthGuard = () => {
    const user = useSelector(state => state.auth.userData);

    if(!user?.email) {
        return <Navigate to={'/auth/login'} replace/>;        
    }

    return <Outlet />;
};


export default AuthGuard;