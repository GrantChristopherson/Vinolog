
import Navbar from '../Navbar/Navbar';
import Sidebar from '../Sidebar/Sidebar';
import HomeBody from '../HomeBody/HomeBody';
import Footer from '../Footer/Footer';
import './home.css'



const Home = () => {

  return (
    
    <>
      <Navbar />
      <div className='home_body'>
        <Sidebar />
        <HomeBody />
      </div>
      <Footer />
    </>
  );
};


export default Home;
          
