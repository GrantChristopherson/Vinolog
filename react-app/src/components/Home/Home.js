
import Navbar from '../Navbar';
import Sidebar from '../Sidebar/Sidebar';
import HomeBody from '../HomeBody';
import Footer from '../Footer';
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
          
