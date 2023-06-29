import { useState } from "react";
import Picker from "emoji-picker-react";
import { BsEmojiSmileFill } from "react-icons/bs";
import { IoMdSend } from "react-icons/io";
import "./Input.scss";

const Input = ({ onMessageSend }) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [message, setMessage] = useState("");

  const handleEmojiPicker = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleEmojiClick = emojiObject => {
    let msg = message;
    msg += emojiObject.emoji;
    setMessage(msg);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (message.length > 0) {
      onMessageSend(message);
      setMessage("");
    }
  };

  return (
    <div className="input-container">
      <div className="button-container">
        <div className="emoji">
          <BsEmojiSmileFill onClick={ handleEmojiPicker }/>
          { showEmojiPicker && <Picker onEmojiClick={ handleEmojiClick }/> }
        </div>
      </div>
      <form className="form-container" onSubmit={ handleSubmit }>
        <input type="text" placeholder="type your message hear" value={ message } onChange={ e => {
          setMessage(e.target.value);
        } }/>
        <button type="submit"><IoMdSend/></button>
      </form>
    </div>
  );
};

export default Input;
