import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ children }) => {
  const isAuthenticated = useSelector(state => state.authReducer.isLogin);

  return isAuthenticated ? children : <Navigate to="/verify-change-content" />;
};

export default PrivateRoute;
