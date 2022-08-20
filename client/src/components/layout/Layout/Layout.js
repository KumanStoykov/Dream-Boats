import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Footer from '../Footer/Footer';
import Header from '../Header/Header';

import Modal from '../../ui/Modal/Modal';
import NotificationModal from '../../ui/NotificationModal/NotificationModal';
import DeleteModal from '../../ui/DeleteModal/DeleteModal';
import EmailModal from '../../ui/EmailModal/EmailModal';
import CommentModal from '../../comment/CommentModal/CommentModal';

import ScrollTop from '../../ui/ScrollTop/ScrollTop';

const Layout = () => {
    const modal = useSelector(state => state.modal);
    const isNotification = ['error', 'successful'].some(x => x === modal.type);


    return (
        <>
            <Modal>
                {modal.isOpen && isNotification && <NotificationModal />}
                {modal.isOpen && modal.type === 'delete' && <DeleteModal />}
                {modal.isOpen && modal.type === 'email' && <EmailModal />}
                {modal.isOpen && modal.type === 'comment' && <CommentModal />}
            </Modal>

            <ScrollTop />
            <Header />
            <main>
                <Outlet />
            </main>
            <Footer />
        </>
    )
}

export default Layout;