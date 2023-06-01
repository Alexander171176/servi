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
import Calendar from './admin/pages/Calendar/Calendar';
import FormElements from './admin/pages/Form/FormElements';
import FormLayout from './admin/pages/Form/FormLayout';
import Tables from './admin/pages/Tables/Tables';
import Settings from './admin/pages/Settings/Settings';
import Chart from './admin/pages/Chart/Chart';
import Alerts from './admin/pages/UIElements/Alerts';
import Buttons from './admin/pages/UIElements/Buttons';
import SignIn from './admin/pages/Auth/SignIn';
import SignUp from './admin/pages/Auth/SignUp';
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
          <Route path="/admin/calendar" element={<RequireAuth><Calendar /></RequireAuth>} />
          <Route path="/admin/forms/form-elements" element={<RequireAuth><FormElements /></RequireAuth>} />
          <Route path="/admin/forms/form-layout" element={<RequireAuth><FormLayout /></RequireAuth>} />
          <Route path="/admin/tables" element={<RequireAuth><Tables /></RequireAuth>} />
          <Route path="/admin/settings" element={<RequireAuth><Settings /></RequireAuth>} />
          <Route path="/admin/chart" element={<RequireAuth><Chart /></RequireAuth>} />
          <Route path="/admin/ui/alerts" element={<RequireAuth><Alerts /></RequireAuth>} />
          <Route path="/admin/ui/buttons" element={<RequireAuth><Buttons /></RequireAuth>} />
          <Route path="/admin/auth/signin" element={<RequireAuth><SignIn /></RequireAuth>} />
          <Route path="/admin/auth/signup" element={<RequireAuth><SignUp /></RequireAuth>} />
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
