import React from 'react';
import { useSelector } from 'react-redux';

// import classes from './Home.module.css'
import Sidebar from '../Components/SideBar';
import Compose from '../Components/Compose';
import Sent from '../Components/sent';
import Received from '../Components/Recieved';

const Home = () => {
  const state = useSelector(state => state.show);

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