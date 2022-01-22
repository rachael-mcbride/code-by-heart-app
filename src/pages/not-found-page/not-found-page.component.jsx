import React from 'react';
import './not-found-page.styles.scss'
import { Link } from 'react-router-dom';


const NotFoundPage = () => (
  <div className='not-found-page'>
    <h1>This page does not exist!</h1>
    <Link className='go-home-link' to='/'>
        Return home
    </Link>
  </div>
);

export default NotFoundPage;