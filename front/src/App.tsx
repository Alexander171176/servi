import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './user/pages/Home/Home';
import Contacts from './user/pages/Contacts/Contacts';
import Faq from './user/pages/Faq/Faq';
import Agreement from './user/pages/Agreement/Agreement';
import Contract from './user/pages/Contract/Contract';
import Register from './user/pages/Register/Register';
import Login from './user/pages/Login/Login';
import Forgot from './user/pages/Forgot/Forgot';
import Profile from './user/pages/Profile/Profile';
import NotFound from './user/pages/NotFound/NotFound';
import Dashboard from './admin/pages/Dashboard/Dashboard';
import AdminProfile from './admin/pages/AdminProfile/AdminProfile';
import { AuthProvider } from './contexts/AuthProvider';
import RequireAuth from './contexts/RequireAuth';

function App() {
  const [loading, setLoading] = useState<boolean>(true);

  const preloader = document.getElementById('preloader');

  if (preloader) {
    setTimeout(() => {
      preloader.style.display = 'none';
      setLoading(false);
    }, 2000);
  }

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <p className="text-center text-danger">Загрузка ...</p>
  ) : (
    <>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/agreement" element={<Agreement />} />
          <Route path="/contract" element={<Contract />} />
          <Route path="/register" element={<Register />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot" element={<Forgot />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/profile" element={<RequireAuth><Profile /></RequireAuth>} />
          <Route path="/admin/" element={<RequireAuth><Dashboard /></RequireAuth>} />
          <Route path="/admin/profile" element={<RequireAuth><AdminProfile /></RequireAuth>} />
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
