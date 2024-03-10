import React from 'react';
import Headroom from 'react-headroom';
import './header.css';

const MobileHeader = () => (
  <Headroom>
    <div className='header-main'>
        <div className='header-box'>
          <div className='header-content'>
            <img src='white-bull.png' alt='logo' className='header-logo'/>
            <h1 className='head'>Valantis</h1>
          </div>
          <p className='text'>Ювелирная мастерская</p>
        </div>
      </div>
  </Headroom>
);

const DesktopHeader = () => (
  <div className='header-main'>
        <div className='header-box'>
          <div className='header-content'>
            <img src='white-bull.png' alt='logo' className='header-logo'/>
            <h1 className='head'>Valantis</h1>
          </div>
          <p className='text'>Ювелирная мастерская</p>
        </div>
      </div>
);

const Header = () => (
  <div className='header-main'>
    <div className="mobile-header">
      <MobileHeader />
    </div>
    <div className="desktop-header">
      <DesktopHeader />
    </div>
  </div>
);

export default Header;

