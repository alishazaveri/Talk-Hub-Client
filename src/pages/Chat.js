/* eslint-disable no-undef */
import {useEffect, useRef, useState} from 'react';
import classes from './Chat.module.css';
import {useNavigate} from 'react-router-dom';
import {allUsersRoute, host} from '../utils/APIRoutes';
import Contacts from '../Components/Contacts';
import axios from 'axios';
import Welcome from '../Components/Welcome';
import ChatContainer from '../Components/ChatContainer';
import {io} from 'socket.io-client';

const Chat = () => {
  const socket = useRef();
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    async function getCurrentUser() {
      if (!localStorage.getItem('chat-app-user')) {
        navigate('/login');
      } else {
        setCurrentUser(await JSON.parse(localStorage.getItem('chat-app-user')));
        setIsLoaded(true);
      }
    }
    getCurrentUser();
  }, []);

  useEffect(() => {
    if (currentUser) {
      socket.current = io(host);
      socket.current.emit('add-user', currentUser._id);
    }
  }, [currentUser]);

  useEffect( () => {
    async function getContacts() {
      if (currentUser) {
        if (currentUser.isAvatarImageSet) {
          const {data} = await axios.get(`${allUsersRoute}/${currentUser._id}`);

          setContacts(data);
        } else {
          navigate('/setAvatar');
        }
      }
    }
    getContacts();
  }, [currentUser],
  );
  const handleChatChange = (chat) => [
    setCurrentChat(chat),
  ];
  return (
    <div className={classes.ChatContainer}>
      <div className={classes.container}>
        { isLoaded &&
        <Contacts
          contacts={contacts}
          currentUser={currentUser}
          changeChat = {handleChatChange}
        />}
        {
          isLoaded && currentChat === undefined ?
            <Welcome currentUser={currentUser} /> :
            <ChatContainer
              currentChat={currentChat}
              currentUser={currentUser}
              socket={socket}
            />
        }
      </div>
    </div>
  );
};

export default Chat;
