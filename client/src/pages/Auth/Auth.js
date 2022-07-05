import { useSelector } from 'react-redux';


import Login from '../../components/auth/Login/Login';
import Register from '../../components/auth/Register/Register';


const Auth = () => {

    const switchAuthState = useSelector(state => state.switchAuthForm.isLogin);

    return (
        <>{switchAuthState 
            ? <Register />
            : <Login />
        }        
            
        </>
    );
};

export default Auth;