import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';

import useFetch from '../../../../hooks/useFetch';
import userRequestOptions from '../../../../services/userService';
import { authStoreActions } from '../../../../store/authStore';

const UserNavigate = ({
    styleNavLink,
    styleNavItem,
    styleIcon,
}) => {
    const navigate = useNavigate();
    const { requester } = useFetch();
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.userData);

    const logoutHandler = (e) => {
        e.preventDefault();
        dispatch(authStoreActions.logout());
        requester(userRequestOptions.logout());
        navigate('/');
    };

    return (
        <>
            <li className={styleNavItem}>
                <Link
                    to={`/profile/${user._id}/sell-boat`}
                    className={styleNavLink}
                >
                    Sell my Boat
                </Link>
            </li>
            <li className={styleNavItem}>
                <Link
                    to={`/profile/${user._id}/watch-list`}
                    className={styleNavLink}
                >Watch list
                </Link>
            </li>
            <li className={styleNavItem}>
                <Link 
                    to='/news' 
                    className={styleNavLink}
                >News
                </Link>
            </li>
            <li className={styleNavItem}>
                <Link
                    to={`/profile/${user._id}`}
                    className={styleNavLink}
                >Profile
                </Link>
            </li>
            <li className={styleNavItem}>
                <Link
                    onClick={logoutHandler}
                    to='/auth/logout'
                    className={styleNavLink}
                >
                    <FontAwesomeIcon
                        className={styleIcon}
                        icon={faArrowRightFromBracket}
                    />
                </Link>
            </li>
        </>
    );
};

export default UserNavigate;