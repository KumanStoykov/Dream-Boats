import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Spinner from '../ui/Spinner/Spinner';

const UserProfileGuard = () => {
    const user = useSelector(state => state.auth.userData);
    const isLoad = useSelector(state => state.auth.isLoad);
   
    if (isLoad) {
        return <Spinner size={'large'} />

    } else if (!isLoad && !user?.email) {

        return <Navigate to={'/auth/login'} replace />;

    } else if (!isLoad && user?.email) {
        return <Outlet />;
    }

};


export default UserProfileGuard;