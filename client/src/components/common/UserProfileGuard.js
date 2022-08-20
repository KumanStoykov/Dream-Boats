import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Spinner from '../ui/Spinner/Spinner';

const UserProfileGuard = () => {
    const user = useSelector(state => state.auth.userData);
    const appIsLoad = useSelector(state => state.app.appIsLoad);

    if (appIsLoad) {
        return <Spinner size={'large'} />

    } else if (!appIsLoad && !user?.email) {

        return <Navigate to={'/'} replace />;

    } else if (!appIsLoad && user?.email) {
        return <Outlet />;
    }

};


export default UserProfileGuard;