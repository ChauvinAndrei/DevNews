import { Navigate } from 'react-router-dom';


const ProtectedRoute = ({ label, isLoggedIn, children }) => {

  if (!isLoggedIn && label === 'Profil') {
    return <Navigate to="/Connexion" />;
  } else if (isLoggedIn && label === 'Connexion') {
    return <Navigate to="/home" />;
  }

  return children;
};

export default ProtectedRoute;