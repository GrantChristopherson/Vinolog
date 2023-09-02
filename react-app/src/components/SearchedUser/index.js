
// import { NavLink } from "react-router-dom";


const SearchedUser = ( {user} ) => {


// need to be able to click on users and see tastings
//friending possible as well
  
  return (
    <div className="listed_user_container">
      <span>
        {user.profileImage ? <img className='friend_profile_image' src={user.profileImage} alt='profile'/>
          : <i className='fa-solid fa-user default-friend-profile-image' />} 
          {user.username}
      </span>
    </div>
  );
};


export default SearchedUser;