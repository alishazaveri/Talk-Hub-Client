/* eslint-disable no-undef */
import {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import classes from './SetAvatar.module.css';
import loader from '../assets/loader.gif';
import {message} from 'antd';
import axios from 'axios';
import {setAvatarRoute} from '../utils/APIRoutes';
import {Buffer} from 'buffer';
import avatarsData from '../utils/avatarsData';

const SetAvatar = () => {
  const navigate = useNavigate();

  const [avatars, setAvatars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);

  useEffect(() => {
    if (!localStorage.getItem('chat-app-user')) {
      navigate('/login');
    }
  }, []);
  console.log(avatars, avatars[selectedAvatar]);

  const setProfilePicture = async () => {
    if (selectedAvatar === undefined) {
      message.warning('Please select an avatar');
    } else {
      const user = await JSON.parse(localStorage.getItem('chat-app-user'));

      const {data} = await axios.post(`${setAvatarRoute}/${user._id}`, {
        image: avatars[selectedAvatar],
      });

      if (data.isSet) {
        user.isAvatarImageSet = true;
        user.avatarImage = data.image;
        localStorage.setItem('chat-app-user', JSON.stringify(user));
        navigate('/');
      } else {
        message.error('Error setting avatar. Please try again');
      }
    }
  };

  useEffect( () => {
    async function fetchData() {
      const data = [];
      for (let i = 0; i < 4; i++) {
        data.push(avatarsData[i].avatarImage);
      }
      console.log({data});
      setAvatars(data);
      setIsLoading(false);
    }
    fetchData();
  }, []);

  return (
    <div>
      {
      isLoading ? ( <div className={classes.container}>
        <div className={classes.loader}><img src={loader} /></div>
      </div>) : (
        <div className={classes.container}>
          <div className={classes.title}>
            <h1>Pick an avatar as your profile picture</h1>
          </div>
          <div className={classes.avatars}>
            {
              avatarsData.map((avatar, index) => {
                return (
                  <div
                    key={avatar.id}
                    className={`${classes.avatar} ${selectedAvatar === index ? classes.selected : ''}`}
                  >

                    <img
                      src={avatar.avatarImage}
                      alt='avatar'
                      onClick={() => setSelectedAvatar(index)}
                    />
                  </div>
                );
              })
            }
          </div>
          <button className={classes.submit} onClick={setProfilePicture}>Set as Profile Picture</button>
        </div>
      )
      }
    </div>
  );
};

export default SetAvatar;
