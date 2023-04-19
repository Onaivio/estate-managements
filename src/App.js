import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PropTypes from "prop-types"
import { connect } from "react-redux"


import Home from './Modules/Admin/Dashboard/Dashboard';
import Dash from './Modules/Admin/Dash/Dash';
import DashPayment from './Modules/Admin/Dash/DashPayment';
import Residents from './Modules/Admin/Residents/Residents';
import Visitors from './Modules/Admin/Visitors/Visitors';
import Payments from './Modules/Admin/Payment/Payments';
import News from './Modules/Admin/News/News';
import UpdatePassword from './Authentication/UpdatePassword/UpdatePassword';
import ForgotPassword from './Authentication/ResetPassword/ForgotPassword';
import Login from './Authentication/Login/Login';
import EmailSent from './Component/EmailSent';
import Reset from './Component/Reset';
import Apartment from './Modules/Admin/Apartment/Apartment';
import ApartmentService from './Modules/Admin/Apartment/ApartmentSelect';

import Staff from './Modules/Admin/Staff/Staff';
import { useEffect } from "react";




function ScrollToTopOnMount() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return null;
}

 function App() {
  return (
    <>
      <ScrollToTopOnMount />
        <Routes>
            <Route exact path="/" element={<Login />} />

            <Route exact="true" path="/dashboard" element={<Home />} />
          <Route exact path="/residents" element={<Residents />} />
          <Route exact path="/visitors" element={<Visitors />} />
          <Route exact path="/payments" element={<Payments />} />
          <Route exact path="/news" element={<News />} />

          <Route exact path="/password-reset" element={<UpdatePassword />} />
          <Route exact path="/forgot-password" element={<ForgotPassword />} />
          <Route exact path="/email-sent" element={<EmailSent />} />
          <Route exact path="/reset" element={<Reset />} />
          <Route exact path="/apartment" element={<Apartment />} />
          <Route exact path="/dash" element={<Dash />} />
          <Route exact path="/dashpayment" element={<DashPayment />} />
          <Route exact path="/staff" element={<Staff />} />
          <Route exact path="/apartment-select" element={<ApartmentService />} />

          
        </Routes>

    </>

  )
}

const stateProps = state => ({
    layout: state.Layout,
});

export default connect(stateProps, null)(App)

