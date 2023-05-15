import { useContext } from 'react';

import AuthContext from '../context/AuthContext';
import { Loader } from '../components/Loader';
import AuthRoutes from './auth.routes';
import AppRoutes from './app.routes';

export const Routes = () => {
  const { user, isLoading } = useContext(AuthContext);

  return isLoading ? <Loader /> : user ? <AppRoutes /> : <AuthRoutes />;
};
