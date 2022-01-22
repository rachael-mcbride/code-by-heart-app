import React from 'react';
import './custom-button.styles.scss'

const CustomButton = ({ children, isGoogleSignIn, ...otherProps }) => (
  <button 
  // conditionally render the 'google-sign-in' class styling IF the 
  // isGoogleSignIn prop evaluates to True; otherwise, does "regular" custom button styling
    className={ `${isGoogleSignIn ? 'google-sign-in' : ''} custom-button` } 
    type="button"
    {...otherProps}>
    {children}
  </button>
)

export default CustomButton;