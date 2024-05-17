import {useState, useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import Logo from '../assets/logo.svg';
import classes from './RegisterLogin.module.css';
import {message} from 'antd';
import axios from 'axios';
import {registerRoute} from '../utils/APIRoutes';

const Register = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
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
      const {password, username, email} = values;

      const {data} = await axios.post(registerRoute, {
        username, email, password,
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
    const {password, confirmPassword, username, email} = values;

    if (username.length < 3) {
      message.warning('Username should be greater than 3 characters');
      return false;
    } else if (password !== confirmPassword) {
      message.warning('Password and Confirm Password should be same.');
      return false;
    } else if (password.length < 8) {
      message.warning('Password should be equal or greater than 8 characters');
      return false;
    } else if (email === '') {
      message.warning('Email is required');
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
        />
        <input
          type='email'
          placeholder='Email'
          name='email'
          onChange={(e) => handleChange(e)}
        />
        <input
          type='password'
          placeholder='Password'
          name='password'
          onChange={(e) => handleChange(e)}
        />
        <input
          type='password'
          placeholder='Confirm Password'
          name='confirmPassword'
          onChange={(e) => handleChange(e)}
        />
        <button type='submit' onClick={handleSubmit}>Create User</button>
        <span>Already have an account ? <Link to="/login">Login</Link></span>
      </form>
    </div>
  );
};


export default Register;
