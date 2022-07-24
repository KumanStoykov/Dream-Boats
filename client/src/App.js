import { Routes, Route, Navigate } from 'react-router-dom';

import './App.css';

import useScrollToTop from './hooks/useScrollToTop';

import Layout from './components/layout/Layout/Layout';
import Home from './pages/Home/Home';
import Login from './components/auth/Login/Login';
import Register from './components/auth/Register/Register';
import BoatsCatalog from './pages/BoatsCatalog/BoatsCatalog';
import DetailsBoat from './pages/DetailsBoat/DetailsBoat';
import Profile from './pages/Profile/Profile';
import BoatForm from './components/boat/BoatForm/BoatForm';
import CommentModal from './components/ui/CommentModal/CommentModal';
import ProfileNavbar from './components/profile/ProfileNavbar/ProfileNavbar';


function App() {


	useScrollToTop();

	return (
		<Layout>
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='auth'>
					<Route path='login' index element={<Login />} />
					<Route path='register' element={<Register />} />
				</ Route>
				<Route path='/boats-for-sale' element={<BoatsCatalog />} />
				<Route path='/boat/details/:boatId' element={<DetailsBoat />} />
				<Route path='profile' element={<Profile />} >
					<Route path='sell-boat' element={<BoatForm />} />
					<Route path='message' element={<CommentModal />} />
				</Route>
				<Route path='*' element={<Navigate to={'/'} />} />
			</Routes>
		</Layout>
	);
}

export default App;