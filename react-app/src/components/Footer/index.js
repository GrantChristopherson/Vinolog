import React from 'react';
import './footer.css';




const Footer = () => {

  return (
    <footer className='footer'> 
      <h5 className='dev_by'>Developed by : </h5>
      <h4 className='dev_name'>Grant Christopherson</h4>
      <div className='footer_links'>
        <a href={"https://github.com/GrantChristopherson"} target="_blank" rel="noopener noreferrer">
        <i id='git' className="fa-brands fa-github gitHubicon"></i></a>
        <a className = {"LinkedLink"} href={"https://www.linkedin.com/in/GrantChristopherson-SF"} target="_blank" rel="noopener noreferrer">
        <i id='linked' className="fa-brands fa-linkedin-in linkedInIcon"></i>
        </a>
      </div>        
    </footer>
  )
};


export default Footer;