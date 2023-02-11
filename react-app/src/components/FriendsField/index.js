import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMyFieldThunk } from '../../store/friends';
import Navigation from '../Navigation';
import Sidebar from '../Sidebar';
import Footer from '../Footer';
import './friendsField.css';




const FriendsField = () => {

  const dispatch = useDispatch();
  const user = useSelector((state) => state?.session?.user);
  const friends = useSelector((state) => Object.values(state.fields.friends))
  const [haveFriends, setHaveFriends] = useState(false);

  
  useEffect(() => {
    dispatch(getMyFieldThunk(user.id)).then(() => setHaveFriends(true));
  }, [dispatch, user.id])


  return (
    <>
      <Navigation />
      <Sidebar />
      <div className='my_field_container'>
        <div className='field_list_container'>
          <div className='field_title'>{friends?.length} Friends In Your Field</div>
          <div className='field_list'>
            {haveFriends && friends?.map((friend) => {return (
              <div key={user?.id}>
                
              </div>
            )})}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};


export default FriendsField;