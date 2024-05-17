import React, {useState, useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import Logo from '../assets/logo.svg';
import classes from './RegisterLogin.module.css';
import {message} from 'antd';
import axios from 'axios';
import {loginRoute} from '../utils/APIRoutes';

const Login = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username: '',
    password: '',
  });

  useEffect(() => {
    // eslint-disable-next-line no-undef
    if (localStorage.getItem('chat-app-user')) {
      navigate('/');
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      const {password, username} = values;

      const {data} = await axios.post(loginRoute, {
        username, password,
      },
      );
      if (data.status === false) {
        message.warning(data.msg);
      }
      if (data.status === true) {
        // eslint-disable-next-line no-undef
        localStorage.setItem('chat-app-user', JSON.stringify(data.user));
        navigate('/');
      }
    }
  };

  const handleValidation = () => {
    const {password, username} = values;

    if (username === '' ) {
      message.warning('Username and Password is required');
      return false;
    } else if (password === '') {
      message.warning('Username and password is required');
      return false;
    }
    return true;
  };
  const handleChange = (event) => {
    setValues({...values, [event.target.name]: event.target.value});
  };
  return (
    <div className={classes.FormContainer}>
      <form onSubmit={(event) => handleSubmit(event)} className={classes.form}>
        <div className={classes.brand}>
          <img src={Logo} alt='logo' />
          <h1>Talk Hub</h1>
        </div>
        <input
          type='text'
          placeholder='Username'
          name='username'
          onChange={(e) => handleChange(e)}
          min="3"
        />

        <input
          type='password'
          placeholder='Password'
          name='password'
          onChange={(e) => handleChange(e)}
        />

        <button type='submit' onClick={handleSubmit}>Login</button>
        <span>Don't have an account ? <Link to="/register">Register</Link></span>
      </form>
    </div>
  );
};


export default Login;
