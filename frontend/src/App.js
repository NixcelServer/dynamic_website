import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/web/Home';
import AdminNavbar from './components/admin/AdminNavbar';
import Navbar from './components/web/Navbar';
import AdminLeftMenu from './components/admin/AdminLeftMenu';
import AdminDashboard from './pages/AdminDashboard';
import AdminNavMenu from './pages/AdminNavMenu';
import AdminAddNavbar from './pages/admin/AdminAddNavbar';
import AdminLogin from './pages/admin/AdminLogin';
import PrivateRoute from './PrivateRoute'; // Import PrivateRoute
import { useSelector } from 'react-redux';
import UpdateNavMenu from './pages/admin/UpdateNavMenu';
import SubMenu1 from './pages/admin/SubMenu1';
import SubMenu2 from './pages/admin/SubMenu2';
import CompanyDetails from './pages/admin/CompanyDetails';
import CompanyAddress from './pages/admin/CompanyAddress';
import UpdateCompanyAddress from './pages/admin/UpdateCompanyAddress';
import AddCompanyAddress from './pages/admin/AddCompanyAddress';
import HPSliderImgs from './pages/admin/HPSliderImgs';
import AboutUs from './pages/admin/AboutUs';
import AboutUsW from './components/web/AboutUsW';
import Footer from './components/web/Footer';
import Test from './components/web/Test';
import ContactUs from './components/web/ContactUs';
import Service from './components/web/Service';
import ServiceInfo from './components/web/ServiceInfo';

function App() {
  const isAuthenticated = useSelector(state => state.authReducer.isLogin);

  // Function to handle login action
  const handleLogin = () => {
    // Perform login actions, then update localStorage
    localStorage.setItem('isAuthenticated', JSON.stringify(true));
    // Update state or dispatch action if needed
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          
          {/* Non-admin routes */}
          <Route path="/" element={<>
            <Navbar />
            <Home />
            <Footer/>
             {/* Render your admin page component */}
          </>} />

          <Route path="/web/about-us" element={<>
            <Navbar />
            <AboutUsW />
            <Footer/>
             {/* Render your admin page component */}
          </>} />

          <Route path="/web/contact-us" element={<>
            <Navbar />
            <ContactUs />
            <Footer/>
             {/* Render your admin page component */}
          </>} />
          
          <Route path="/web/services" element={<>
            <Navbar />
            <Service />
            <Footer/>
             {/* Render your admin page component */}
          </>} />

          <Route path="/web/service/info" element={<>
            <Navbar />
            <ServiceInfo />
            <Footer/>
             {/* Render your admin page component */}
          </>} />

          <Route path="/test" element={<Test />} />


          <Route path="/user-log" element={<AdminLogin />} />

          <Route path="/web-navbar" element={
          <>
            <AdminNavbar />
            <AdminLeftMenu />
             {/* Render your admin page component */}
          </>
        } />


          {/* Redirect /verify-change-content for logged-in users */}
          {isAuthenticated && <Route path="/verify-change-content" element={<Navigate to="/admin/home" />} />}

          {/* Admin login route */}
          <Route path="/verify-change-content" element={<AdminLogin onLogin={handleLogin} />} />

          {/* Admin routes */}
          <Route path="/admin/*" element={<PrivateRoute><AdminRoutes /></PrivateRoute>} />
        </Routes>
      </div>
    </Router>
  );
}

const WebRoutes = () => {
  return (
    <>
      <Navbar />
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="aboutus" element={<AboutUsW />} />
        {/* Add other non-admin routes here */}
      </Routes>
    </>
  );
}

const AdminRoutes = () => {
  return (
    <>
      <AdminNavbar />
      <AdminLeftMenu />
      <Routes>
        <Route path="/" element={<Navigate to="/admin/home" replace />} />
        <Route path="home" element={<AdminDashboard />} />
        <Route path="nav-menu" element={<AdminNavMenu />} />
        <Route path="add-navbar-menu" element={<AdminAddNavbar />} />
        <Route path="edit-navbar-menu" element={<UpdateNavMenu />} />
        <Route path="sub-menu-1" element={<SubMenu1 />} />
        <Route path="sub-menu-2" element={<SubMenu2 />} />
        <Route path="company-desc" element={<CompanyDetails/>} />
        <Route path="company-address" element={<CompanyAddress />} />
        <Route path="edit-address" element={<UpdateCompanyAddress />} />
        <Route path="add-company-address" element={<AddCompanyAddress />} />
        <Route path="hp-slider-imgs" element={<HPSliderImgs />} />
        <Route path="about-us" element={<AboutUs />} />
        

        {/* Add more admin routes here as needed */}
      </Routes>
    </>
  );
}

export default App;
