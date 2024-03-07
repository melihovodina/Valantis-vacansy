import React from 'react'
import './header.css'

const Header = () => {
  return (
    <div className='header-main'>
      <div className='header-box'>
        <div className='header-content'>
          <img src='white-bull.png' alt='logo' className='header-logo'/>
          <h1 className='head'>Valantis</h1>
        </div>
        <p className='text'>Ювелирная мастерская</p>
      </div>
        <p className='undertext'>Каталог ювелирных изделий</p>
    </div>
  )
}

export default Header