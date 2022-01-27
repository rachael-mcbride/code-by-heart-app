import React from 'react';
import { auth, signInWithGoogle } from '../../firebase/firebase.utils'
import { ReactComponent as Logo } from '../../assets/heart-logo.svg'
import CustomButton from '../custom-button/custom-button.component';

import './header.styles.scss'

const Header = ({ currentUser }) => {
  // change button color depending on if this is a selected deck of not 
  let headerSignedIn = 'not-signed-in';
  if (currentUser) {
    headerSignedIn = 'signed-in';
  }
  return (
  <div className="header">
    <div className={headerSignedIn}>
      <div className='logo-container'>
        <Logo className='logo' />
      </div>
      <div className='options'>
        {currentUser ? (
          <CustomButton onClick={() => auth.signOut()}>
            Sign out
          </CustomButton>
        ) : (
          <CustomButton onClick={signInWithGoogle}> 
            Sign in
          </CustomButton>
        )}
      </div>
    </div>
  </div>)
};

export default Header;