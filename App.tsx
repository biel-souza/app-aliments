import ToastManager from 'toastify-react-native';

import { AuthProvider } from './src/context/AuthContext';
import { Routes } from './src/routes/routes';

export default function App() {
  return (
    <AuthProvider>
      <ToastManager />
      <Routes />
    </AuthProvider>
  );
}
