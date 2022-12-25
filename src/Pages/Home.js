import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Sidebar from '../Components/SideBar';
import Compose from '../Components/Compose';
import Sent from '../Components/sent';
import Received from '../Components/Recieved';
import { replaceMail } from '../Store/mail-action';
import { updateMail } from '../Store/mail-action';

const Home = () => {
  const state = useSelector((state) => state.show);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const firstTime = useSelector((state) => state.mail.firstTime);
  const currentMailData = useSelector((state) => state.mail.mailData);
  const dispatch = useDispatch();

  if (isLoggedIn && firstTime) {
    const loggedUserEmail = JSON.parse(localStorage.getItem('idToken')).email;
    const emailUrl = loggedUserEmail.replace('@', '').replace('.', '');
    dispatch(replaceMail(emailUrl, loggedUserEmail));
  }

  setInterval(() => {
    if (isLoggedIn) {
      const loggedUserEmail = JSON.parse(localStorage.getItem('idToken')).email;
      const emailUrl = loggedUserEmail.replace('@', '').replace('.', '');
      dispatch(updateMail(emailUrl, loggedUserEmail, currentMailData));
    }
  }, 5000);

  return (
    <React.Fragment>
      <Sidebar />
      {state.compose && <Compose />}
      {state.sent && <Sent />}
      {state.received && <Received />}
    </React.Fragment>
  );
};

export default Home;