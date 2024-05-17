import {Button} from 'antd';
import classes from './Logout.module.css';
import {LogoutOutlined} from '@ant-design/icons';
import {useNavigate} from 'react-router-dom';
const Logout = () => {
  const navigate = useNavigate();
  const handleClick = async () => {
    // eslint-disable-next-line no-undef
    localStorage.clear();
    navigate('/login');
  };
  return (
    <Button className={classes.button} onClick={handleClick}>
      <LogoutOutlined className={classes.logout} />
    </Button>
  );
};

export default Logout;
