import { Route, Routes } from 'react-router-dom';


import ProfileNavbar from '../../components/profile/ProfileNavbar/ProfileNavbar';
import BoatForm from '../../components/boat/BoatForm/BoatForm';
import MyBoats from '../../components/profile/MyBoats/MyBoats';
import CommentModal from '../../components/ui/CommentModal/CommentModal';
import Register from '../../components/auth/Register/Register';



const Profile = () => {
   

    return (
        <>
            <ProfileNavbar />
            <Routes>
                <Route index element={<MyBoats />} />
                <Route path='edit-profile' element={<Register />} />
                <Route path='sell-boat' element={<BoatForm />} />
                <Route path='message' element={<CommentModal />} />
            </Routes>
        </>
    );
};

export default Profile;