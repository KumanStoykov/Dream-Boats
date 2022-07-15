import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import ScrollToTopButton from '../../ui/ScrollToTopBUtton/ScrollToTopButton';


const Layout = (props) => {
    return (
        <>
            <ScrollToTopButton />
            <Header />
            <main>{props.children}</main>
            <Footer />
        </>
    )
}

export default Layout;