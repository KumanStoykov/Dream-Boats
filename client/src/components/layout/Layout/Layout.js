import { useSelector } from 'react-redux';

import Footer from '../Footer/Footer';
import Header from '../Header/Header';

import ScrollToTopButton from '../../ui/ScrollToTopButton/ScrollToTopButton';
import ErrorModal from '../../ui/ErrorModal/ErrorModal';
import DeleteModal from '../../ui/DeleteModal/DeleteModal';
import EmailModal from '../../ui/EmailModal/EmailModal';


const Layout = (props) => {
    const modal = useSelector(state => state.modal);

    return (
        <>
            {modal.isOpen && modal.type === 'error' && <ErrorModal />}
            {modal.isOpen && modal.type === 'delete' && <DeleteModal />}
            {modal.isOpen && modal.type === 'email' && <EmailModal />}
            
            <ScrollToTopButton />
            <Header />
            <main>{props.children}</main>
            <Footer />
        </>
    )
}

export default Layout;