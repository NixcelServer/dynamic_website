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
import AdminService from './pages/admin/AdminService';
import AddService from './pages/admin/AddService';
import AdminEditService from './pages/admin/AdminEditService';

import ServiceSubMenu1Page from './pages/web/ServiceSubMenu1Page';
import ServiceSubMenu2Page from './pages/web/ServiceSubMenu2Page';
import SingleService from './components/web/SingleService';
import ScrollToTop from './components/ScrollToTop';
import Products from './components/web/Products';
import ProjectExample from './components/web/ProjectExample';
import Projects from './components/web/Projects';
import ProductExample from './components/web/ProductExample';
import AdminProducts from './pages/admin/AdminProducts';
import AddProduct from './pages/admin/AddProduct';
import EditProduct from './pages/admin/EditProduct';
import SingleProduct from './components/web/SingleProduct';
import ProductSubMenu1Page from './pages/web/ProductSubMenu1Page';
import ProductSubMenu2Page from './pages/web/ProductSubMenu2Page';
import AdminProject from './pages/admin/AdminProject';
import AddProject from './pages/admin/AddProject';
import ProjectSingle from './components/web/ProjectSingle';

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
       <ScrollToTop />
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

          <Route path="/web/single-service" element={<>
            <Navbar />
            <SingleService />
            <Footer/>
             {/* Render your admin page component */}
          </>} />

          <Route path="/web/Services/submenu1" element={<>
            <Navbar />
            <ServiceSubMenu1Page />
            <Footer/>
             {/* Render your admin page component */}
          </>} />

          <Route path="/web/Services/submenu1/submenu2" element={<>
            <Navbar />
            <ServiceSubMenu2Page />
            <Footer/>
             {/* Render your admin page component */}
          </>} />

          <Route path="/web/projects" element={<>
            <Navbar />
            <Projects />
            <Footer/>
             {/* Render your admin page component */}
          </>} />

          <Route path="/web/single-project" element={<>
            <Navbar />
            <ProjectSingle />
            <Footer/>
             {/* Render your admin page component */}
          </>} />

          <Route path="/web/project-example" element={<>
            <Navbar />
            <ProjectExample />
            <Footer/>
             {/* Render your admin page component */}
          </>} />

          <Route path="/web/products" element={<>
            <Navbar />
            <Products />
            <Footer/>
             {/* Render your admin page component */}
          </>} />

          <Route path="/web/product-example" element={<>
            <Navbar />
            <ProductExample />
            <Footer/>
             {/* Render your admin page component */}
          </>} />

          <Route path="/web/single-product" element={<>
            <Navbar />
            <SingleProduct />
            <Footer/>
             {/* Render your admin page component */}
          </>} />

          <Route path="/web/Products/submenu1" element={<>
            <Navbar />
            <ProductSubMenu1Page />
            <Footer/>
             {/* Render your admin page component */}
          </>} />

          <Route path="/web/Products/submenu1/submenu2" element={<>
            <Navbar />
            <ProductSubMenu2Page />
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
        <Route path="services" element={<AdminService />} />
        <Route path="add-service" element={<AddService />} />
        <Route path="edit-service" element={<AdminEditService />} />
        <Route path="products" element={<AdminProducts />} />
        <Route path="add-product" element={<AddProduct />} />
        <Route path="edit-product" element={<EditProduct />} />
        <Route path="projects" element={<AdminProject />} />
        <Route path="add-project" element={<AddProject />} />
        

        {/* Add more admin routes here as needed */}
      </Routes>
    </>
  );
}

export default App;
