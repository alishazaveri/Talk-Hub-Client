import classes from './ChatInput.module.css';
import Picker from 'emoji-picker-react';
import {SendOutlined, SmileOutlined} from '@ant-design/icons';
import {Button} from 'antd';
import {useState} from 'react';
const ChatInput = ({handleSendMsg}) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [msg, setMsg] = useState('');
  const [textInputClass, setTextInputClass] = useState(`${classes.inputContainer}`);

  // const handleEmojiPickerHideShow = () => {
  //   setShowEmojiPicker(!showEmojiPicker);
  //   (textInputClass === `${classes.inputContainer}`) ?
  //   (setTextInputClass(`${classes.downContainer} ${classes.inputContainer}`)) :
  //   (setTextInputClass(`${classes.inputContainer}`));
  // };
  // const handleEmojiClick = (emojiObj, event) => {
  //   let message = msg;
  //   message += emojiObj.emoji;
  //   setMsg(message);
  // };

  const sendChat = (event) => {
    event.preventDefault();
    if (msg.length > 0) {
      handleSendMsg(msg);
      setMsg('');
    }
  };
  return (
    <div className={classes.container}>
      <form className={textInputClass} onSubmit={(e) => sendChat(e)}>
        <input
          type='text'
          placeholder='Type your message here'
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
        />
        <button type='submit'>
          <SendOutlined />
        </button>
      </form>
    </div>
  );
};

export default ChatInput;
