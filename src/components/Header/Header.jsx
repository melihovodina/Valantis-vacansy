import React from 'react';
import Headroom from 'react-headroom';
import { FiSearch } from 'react-icons/fi';
import './header.css';

const MobileHeader = ({ toggleFilter }) => (
  <Headroom>
    <div className='header-main'>
      <div className='header-box'>
      <button onClick={toggleFilter} className='header-filter-button'>
            <FiSearch size={30} />
          </button>
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

const Header = ({ toggleFilter }) => (
  <div className='header-main'>
    <div className="mobile-header">
      <MobileHeader toggleFilter={toggleFilter} />
    </div>
    <div className="desktop-header">
      <DesktopHeader />
    </div>
  </div>
);

export default Header;