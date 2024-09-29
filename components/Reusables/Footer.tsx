import React from 'react'
import { RiPhoneLine } from 'react-icons/ri'

const Footer = () => {
  return (
    <footer className="footer px-[5%]">
  <div className="container">
    <div className="footer-columns">
      <div className="footer-column">
        <h4 className='!text-[36px]'>About Us</h4>
        <p className='text-white/80'>SkyGuide provides real-time weather data and flight planning tools for paragliders and aviation enthusiasts.</p>
      </div>
      <div className="footer-column">
        <h4>Quick Links</h4>
        <ul className='text-white/80'>
          <li><a href="/">Weather</a></li>
          <li><a href="/flight-planning">Flight Planning</a></li>
          <li><a href="#">Contact Us</a></li>
          <li><a href="#">Privacy Policy</a></li>
        </ul>
      </div>
      <div className="footer-column">
        <h4>Contact Us</h4>
        <div className="flex gap-3 items-center p-3 bg-white shadow-lg text-black w-full">
          <RiPhoneLine />
          <p>+44-23920932</p>
        </div>
      </div>
    </div>
    <div className="footer-bottom">
      <p>&copy; 2024 SkyGuide. All Rights Reserved.</p>
    </div>
  </div>
</footer>
  )
}

export default Footer