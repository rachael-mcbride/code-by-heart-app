import React from 'react';
import { auth, signInWithGoogle } from '../../firebase/firebase.utils'
import { ReactComponent as Logo } from '../../assets/heart-logo.svg'
import CustomButton from '../custom-button/custom-button.component';

import './header.styles.scss'

const Header = ( { currentUser }) => (
  <div className='header'>
    <div className='logo-container'>
      <Logo className='logo' />
    </div>
    <div className='options'>
      {currentUser ? (
        <CustomButton  onClick={() => auth.signOut()}>
          Sign out
        </CustomButton>
      ) : (
        <CustomButton onClick={signInWithGoogle}> 
          Sign in
        </CustomButton>
      )}
    </div>
  </div>
)

export default Header;