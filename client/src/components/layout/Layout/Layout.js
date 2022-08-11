import { useSelector } from 'react-redux';

import Footer from '../Footer/Footer';
import Header from '../Header/Header';

import ScrollTop from '../../ui/ScrollTop/ScrollTop';
import NotificationModal from '../../ui/NotificationModal/NotificationModal';
import DeleteModal from '../../ui/DeleteModal/DeleteModal';
import EmailModal from '../../ui/EmailModal/EmailModal';
import CommentModal from '../../comment/CommentModal/CommentModal';


const Layout = (props) => {
    const modal = useSelector(state => state.modal);
    const isNotification = ['error', 'secssful'].some(x => x === modal.type);

    return (
        <>
            {modal.isOpen && isNotification && <NotificationModal />}
            {modal.isOpen && modal.type === 'delete' && <DeleteModal />}
            {modal.isOpen && modal.type === 'email' && <EmailModal />}
            {modal.isOpen && modal.type === 'comment' && <CommentModal />}
            
            <ScrollTop />
            <Header />
            <main>{props.children}</main>
            <Footer />
        </>
    )
}

export default Layout;