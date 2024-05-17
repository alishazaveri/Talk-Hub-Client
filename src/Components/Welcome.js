import classes from './Welcome.module.css';
import Robot from '../assets/robot.gif';
import {useEffect, useState} from 'react';

const Welcome = ({currentUser}) => {
  return (
    <div className={classes.container}>
      <img src={Robot} alt='Robot' />
      <h1>Welcome, <span>{currentUser.username}!</span></h1>
      <h3>Please select a chat to start messaging</h3>
    </div>
  );
};

export default Welcome;
