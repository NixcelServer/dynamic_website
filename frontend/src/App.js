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
          <Route path="/" element={<NavbarAndRoutes />} />

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

const NavbarAndRoutes = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
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

        {/* Add more admin routes here as needed */}
      </Routes>
    </>
  );
}

export default App;
