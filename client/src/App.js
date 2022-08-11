import { useEffect, useCallback } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import './App.css';

import useScrollToTop from './hooks/useScrollToTop';

import Layout from './components/layout/Layout/Layout';
import Home from './pages/Home/Home';
import WatchList from './components/profile/WatchList/WatchList';
import Login from './components/auth/Login/Login';
import Register from './components/auth/Register/Register';
import BoatsCatalog from './pages/BoatsCatalog/BoatsCatalog';
import DetailsBoat from './pages/DetailsBoat/DetailsBoat';
import Profile from './pages/Profile/Profile';

import useFetch from './hooks/useFetch';
import userService from './services/userService';
import { authStoreActions } from './store/authStore';

import UserProfileGuard from './components/common/UserProfileGuard';
import AuthGuard from './components/common/AuthGuard';

import Spinner from './components/ui/Spinner/Spinner';

function App() {
	useScrollToTop();

	const dispatch = useDispatch();
	const { isLoading, requester } = useFetch();

	const responseData = useCallback((data) => {
		dispatch(authStoreActions.login(data));
		dispatch(authStoreActions.loadUser());
	}, [dispatch]);


	useEffect(() => {
		requester(userService.checkUser(), responseData);
	}, [dispatch, requester]);

	return (
		<Layout>
			{isLoading && <Spinner size={'large'} />}
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/watch-list' element={<WatchList />} />
				
				<Route element={<AuthGuard />}>
					<Route path='/auth'>
						<Route path='login' index element={<Login />} />
						<Route path='register' element={<Register />} />
					</ Route>
				</Route>

				<Route path='/boats-for-sale' element={<BoatsCatalog />} />
				<Route path='/boat/details/:boatId' element={<DetailsBoat />} />

				<Route element={<UserProfileGuard />}>
					<Route path='/profile/*' element={<Profile />} />
				</Route>

				<Route path='*' element={<Navigate to={'/'} />} />
			</Routes>
		</Layout>
	);
}

export default App;