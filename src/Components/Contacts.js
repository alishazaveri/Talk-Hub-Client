import React, {useEffect, useState} from 'react';
import classes from './Contacts.module.css';
import logo from '../assets/logo.svg';

const Contacts = ({contacts, currentUser, changeChat}) => {
  const [curentUserName, setCurentUserName] = useState(undefined);
  const [curentUserImage, setCurentUserImage] = useState(undefined);
  const [curentSelected, setCurentSelected] = useState(undefined);

  useEffect(() => {
    if (currentUser) {
      setCurentUserImage(currentUser.avatarImage);
      setCurentUserName(currentUser.username);
    }
  }, [currentUser]);

  const changeCurrentChat = (index, contact) => {
    setCurentSelected(index);
    changeChat(contact);
  };
  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {

        curentUserName && curentUserImage && (

          <div className={classes.Container}>

            <div className={classes.brand}>
              <img src={logo} alt='logo' />
              <h3>Talk Hub</h3>
            </div>
            <div className={classes.contacts}>
              {
                contacts.map((contact, index) => {
                  return (
                    <div
                      key={contact.id}
                      className={`${classes.contact} ${index === curentSelected ? classes.selected : ''}`}
                      onClick={() => changeCurrentChat(index, contact)}
                    >
                      <div className={classes.avatar}>
                        <img
                          src={contact.avatarImage}
                          alt='avatar'
                        />
                      </div>
                      <div className={classes.username}>
                        <h3>{contact.username}</h3>
                      </div>
                    </div>
                  );
                })
              }
            </div>

            <div className={classes.currentUser}>
              <div className={classes.avatar}>
                <img
                  src={curentUserImage}
                  alt='avatar'
                />
              </div>
              <div className={classes.username}>
                <h2>{curentUserName}</h2>
              </div>
            </div>

          </div>
        )
      }
    </>
  );
};

export default Contacts;
