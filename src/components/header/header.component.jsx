import PropTypes from "prop-types";
import { auth, signInWithGoogle } from '../../firebase/firebase.utils'
import { ReactComponent as Logo } from '../../assets/heart-logo.svg'
import CustomButton from '../custom-button/custom-button.component';

import './header.styles.scss'

const Header = ({ currentUser }) => {
  // change header color conditionally
  const headerSignedIn = (currentUser) ? 'signed-in' : 'not-signed-in' ;

  return (
  <div className="header">
    <div className={headerSignedIn}>
      <div className='logo-container'>
        <Logo className='logo' />
      </div>
      <div className='options'>
        {currentUser ? (
          <div>
          <CustomButton onClick={() => auth.signOut()}>
            Sign out
          </CustomButton>
          </div>
        ) : (
          <CustomButton onClick={signInWithGoogle}> 
            Sign in
          </CustomButton>
        )}
      </div>
    </div>
  </div>)
};

Header.propTypes = {
  currentUser: PropTypes.shape({
    createdAt: PropTypes.object,
    displayName: PropTypes.string,
    id: PropTypes.string,
    email: PropTypes.string
  })
};

export default Header;