import './footer.css';



const Footer = () => {


  return (
    <footer className='footerContainer'>
      <div className='aboutMeContainer'>
        <h4 className='developer'>Developed by: </h4>
        <h3 className='developerName'>Grant Christopherson</h3>
        <a href={"https://github.com/GrantChristopherson"} target="_blank" rel="noopener noreferrer">
        <i className="fa-brands fa-github gitHubicon"></i></a>
        <a className = {"userLinkedInLink"} href={"https://www.linkedin.com/in/GrantChristopherson-SF"} target="_blank" rel="noopener noreferrer">
        <i className="fa-brands fa-linkedin-in linkedInIcon"></i>
        </a>
      </div>
    </footer>
  );
};


export default Footer;