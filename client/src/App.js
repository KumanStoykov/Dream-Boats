import { Routes, Route, Navigate } from 'react-router-dom';

import './App.css';

import Layout from './components/layout/Layout/Layout';
import Home from './pages/Home/Home';
import Login from './components/auth/Login/Login';
import Register from './components/auth/Register/Register';
import BoatsCatalog from './pages/BoatsCatalog/BoatsCatalog';
import DetailsBoat from './pages/DetailsBoat/DetailsBoat';
import Profile from './pages/Profile/Profile';

function App() {
	return (
		<Layout>
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/auth/login' element={<Login />}/>
				<Route path='/auth/register' element={<Register />} />
				<Route path='/boats-catalog' element={<BoatsCatalog />} />
				<Route path='/details' element={<DetailsBoat />} />
				<Route path='/profile' element={<Profile />} />
				<Route path='*' element={<Navigate to={'/'} />} />
			</Routes>
		</Layout>
	);
}

export default App;