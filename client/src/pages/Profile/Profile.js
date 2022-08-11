import { Route, Routes } from 'react-router-dom';

import ProfileNavbar from '../../components/profile/ProfileNavbar/ProfileNavbar';
import BoatForm from '../../components/boat/BoatForm/BoatForm';
import MyBoats from '../../components/profile/MyBoats/MyBoats';
import ProfileCard from '../../components/profile/ProfileCard/ProfileCard';

import WatchList from '../../components/profile/WatchList/WatchList';

import OwnerGuard from '../../components/common/OwnerGuard';


const Profile = () => {

    
    return (
        <>
            <ProfileNavbar />
            <Routes>
                <Route path='/profile' element={<ProfileCard />} />
                <Route path='/owner-boats' index element={<MyBoats />} />
                <Route path='/:boatId/sell-boat' element={<BoatForm />} />
                <Route path='/:userId/watch-list' element={<WatchList />} />

                <Route element={<OwnerGuard />}>              
                    <Route path='/boat/:boatId/edit' element={<BoatForm />} />
                </Route>
                
                <Route path='*' element={<ProfileCard />} />
            </Routes>
        </>
    );
};

export default Profile;