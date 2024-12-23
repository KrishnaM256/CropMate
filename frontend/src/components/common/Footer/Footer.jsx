import React from 'react'
import { Link } from 'react-router-dom'
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa'
import './Footer.css'

const Footer = () => {
  return (
    <footer className="footerContainer">
      <div className="footerContent">
        <div className="footerSection">
          <h4>Quick Links</h4>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/contractMarket">Contract Market</Link>
            </li>
            <li>
              <Link to="/liveMarket">Live Market</Link>
            </li>
            <li>
              <Link to="/learning">Learning</Link>
            </li>
          </ul>
        </div>
        <div className="footerSection">
          <h4>Contact Us</h4>
          <p>Email: support@cropmate.com</p>
          <p>Phone: +91 9356xxxxxx</p>
          <p>Address: Kondhwa, Pune, India</p>
        </div>
        <div className="footerSection">
          <h4>Follow Us</h4>
          <div className="socialIcons">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook />
            </a>
            <a
              href="https://x.com/Krishna_M256"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram />
            </a>
            <a
              href="https://www.linkedin.com/in/krishnam256"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>
      <div className="footerBottom">
        <p>
          &copy; {new Date().getFullYear()} FarmConnect. All Rights Reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer
