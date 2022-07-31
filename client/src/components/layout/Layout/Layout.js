import { useSelector } from 'react-redux';

import Footer from '../Footer/Footer';
import Header from '../Header/Header';

import ScrollToTopButton from '../../ui/ScrollToTopButton/ScrollToTopButton';
import ErrorModal from '../../ui/ErrorModal/ErrorModal';


const Layout = (props) => {
    const modal = useSelector(state => state.modal);

    return (
        <>
            {modal.isOpen && <ErrorModal />}
            <ScrollToTopButton />
            <Header />
            <main>{props.children}</main>
            <Footer />
        </>
    )
}

export default Layout;