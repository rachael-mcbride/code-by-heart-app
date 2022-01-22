import React from 'react';
// import CustomButton from '../../components/custom-button/custom-button.component';
import './landing-page.styles.scss'


const LandingPage = () => (
  <div className='landing-page'>
    <h3>This is what the user will see when not signed in</h3>
    <span>More info about the app will go here, including a prompt to sign in with their Google account</span>
    {/* <div>If this is your first time, sign up here:</div>
      <CustomButton onClick={console.log("sign up")}> 
        Sign Up
      </CustomButton>
    </div> */}
  </div>
  );

export default LandingPage;