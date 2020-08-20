import React from 'react';
import AuthModal from './AuthModal';

const Header=({user,setCurrentUser})=>{

   return(
       <div className="site-header">
          <img 
              className="site-header-logo"
              src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" 
              alt="insta-logo"/>

              <AuthModal user={user} setCurrentUser={setCurrentUser}/>
   
       </div>
   );

}

export default Header;