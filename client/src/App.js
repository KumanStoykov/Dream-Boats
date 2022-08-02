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

import AuthGuard from './components/common/AuthGuard';

function App() {


	useScrollToTop();

	return (
		<Layout>
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/auth'>
					<Route path='login' index element={<Login />} />
					<Route path='register' element={<Register />} />
				</ Route>
				<Route path='/boats-for-sale' element={<BoatsCatalog />} />
				<Route path='/boat/details/:boatId' element={<DetailsBoat />} />
				<Route element={<AuthGuard />}>
					<Route path='/profile/*' element={<Profile />} />	
				</Route>				
				<Route path='*' element={<Navigate to={'/'} />} />
			</Routes>
		</Layout>
	);
}

export default App;