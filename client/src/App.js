import { Routes, Route, Navigate } from 'react-router-dom';

import './App.css';

import Layout from './components/layout/Layout/Layout';
import Auth from './pages/Auth/Auth';
import Home from './pages/Home/Home';


function App() {
	return (
		<Layout>
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/auth' element={<Auth />} />
				<Route path='*' element={<Navigate to={'/'} />} />
			</Routes>
		</Layout>
	);
}

export default App;