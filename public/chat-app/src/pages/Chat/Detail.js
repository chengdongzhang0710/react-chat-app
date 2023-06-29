import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { v4 as uuid } from "uuid";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { receiveMessagesRoute, sendMessageRoute } from "../../utils/APIRoutes";
import Logout from "./Logout";
import Input from "./Input";
import "./Detail.scss";

const Detail = ({ currentUser, currentChat, socket }) => {
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const scrollRef = useRef();
  const toastOptions = {
    position: "bottom-right",
    autoClose: 3000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  useEffect(() => {
    const loadMessages = async () => {
      const { data } = await axios.post(receiveMessagesRoute, { from: currentUser._id, to: currentChat._id });
      setMessages(data);
    };
    loadMessages();
  }, [currentUser, currentChat]);

  useEffect(() => {
    if (socket.current) {
      socket.current.on("receive-msg", message => {
        setArrivalMessage({ fromSelf: false, message });
      });
    }
  }, []);

  useEffect(() => {
    arrivalMessage && setMessages([...messages, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleMessageSend = async message => {
    socket.current.emit("send-msg", { from: currentUser._id, to: currentChat._id, message });
    const { data } = await axios.post(sendMessageRoute, { from: currentUser._id, to: currentChat._id, message });
    if (!data.status) {
      toast.error("Failed to send message. Please try again.", toastOptions);
    }

    const messageList = [...messages];
    messageList.push({ fromSelf: true, message });
    setMessages(messageList);
  };

  return (
    <>
      <div className="detail-container">
        <div className="chat-header">
          <div className="user-details">
            <div className="avatar">
              <img src={ `data:image/svg+xml;base64,${ currentChat.avatarImage }` } alt="avatar"/>
            </div>
            <div className="username">
              <h3>{ currentChat.username }</h3>
            </div>
          </div>
          <Logout/>
        </div>
        <div className="chat-messages">
          { messages.map(item => {
            return (
              <div ref={ scrollRef } key={ uuid() }>
                <div className={ item.fromSelf ? "message sent" : "message received" }>
                  <div className="content"><p>{ item.message }</p></div>
                </div>
              </div>
            );
          }) }
        </div>
        <Input onMessageSend={ handleMessageSend }/>
      </div>
      <ToastContainer/>
    </>
  );
};

export default Detail;
