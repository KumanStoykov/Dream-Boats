import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserLock } from '@fortawesome/free-solid-svg-icons';

const GuestNavigation = ({
    styleNavLink,
    styleNavItem,
    styleIcon,
    styleSpanIcon,
}) => {

    return (
        <li className={styleNavItem}>
            <Link
                to='/auth/login'
                className={styleNavLink}
            >
                <span
                    className={styleSpanIcon}
                >
                    Log on
                </span>
                <FontAwesomeIcon
                    className={styleIcon}
                    icon={faUserLock}
                />
            </Link>
        </li>
    );
};

export default GuestNavigation;