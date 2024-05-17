import {useEffect, useRef, useState} from 'react';
import {getAllMessagesRoute, sendMessageRoute} from '../utils/APIRoutes';
import classes from './ChatContainer.module.css';
import ChatInput from './ChatInput';
import Logout from './Logout';
import axios from 'axios';
import {v4 as uuidv4} from 'uuid';

const ChatContainer = ({currentChat, currentUser, socket}) => {
  const [messages, setMessages] = useState([]);
  const [arrivalMsg, setArrivalMsg] = useState(null);
  const scrollRef = useRef();

  useEffect(() => {
    async function getMessages() {
      if (currentChat) {
        const response = await axios.post(getAllMessagesRoute, {
          from: currentUser._id,
          to: currentChat._id,
        });

        setMessages(response.data);
      }
    }
    getMessages();
  }, [currentChat]);

  const handleSendMsg = async (msg) => {
    await axios.post(sendMessageRoute, {
      from: currentUser._id,
      to: currentChat._id,
      message: msg,
    });
    socket.current.emit('send-msg', {
      to: currentChat._id,
      from: currentUser._id,
      message: msg,
    });

    const msgs = [...messages];
    msgs.push({fromSelf: true, message: msg});
    setMessages(msgs);
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on('msg-receive', (msg) => {
        setArrivalMsg({fromSelf: false, message: msg});
      });
    }
  }, [socket, messages]);

  useEffect(() => {
    arrivalMsg && setMessages((prev) => [...prev, arrivalMsg]);
  }, [arrivalMsg]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({behaviour: 'smooth'});
    }
  }, [messages]);

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {
        currentChat && (
          <div className={classes.container}>
            <div className={classes.header}>
              <div className={classes.userDetails}>
                <div className={classes.avatar}>
                  <img src={currentChat.avatarImage} alt='avatar' />

                </div>
                <div className={classes.username}>
                  <h3>{currentChat.username}</h3>
                </div>
              </div>
              <Logout />
            </div>
            {/* <Messages /> */}
            <div className={classes.chatMessages}>
              {
                messages.map((message) => {
                  return (
                    <div key={uuidv4()} ref={scrollRef}>
                      <div className={`${classes.message} ${message.fromSelf ? classes.sended : classes.received}`}>
                        <div className={classes.content}>
                          <p>
                            {message.message}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })
              }
            </div>
            <ChatInput handleSendMsg={handleSendMsg} />

          </div>
        )
      }
    </>
  );
};

export default ChatContainer;
