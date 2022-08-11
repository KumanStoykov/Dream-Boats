import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const OwnerGuard = () => {
    const user = useSelector(state => state.auth.userData);
    const boat = useSelector(state => state.allBoats.boat);

    if(user._id === boat.owner) { 
        return <Outlet />;
    }
    
    return <Navigate to={'/auth/login'} replace/>;        
};


export default OwnerGuard;