import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { io } from "socket.io-client";
import { contactsRoute, host } from "../../utils/APIRoutes";
import Contacts from "./Contacts";
import Welcome from "./Welcome";
import Detail from "./Detail";
import "./index.scss";

const Chat = () => {
  const navigate = useNavigate();
  const socket = useRef();
  const [contacts, setContacts] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const loadUser = async () => {
      if (!localStorage.getItem("chat-app-user")) {
        navigate("/login");
      } else {
        setCurrentUser(await JSON.parse(localStorage.getItem("chat-app-user")));
      }
    };
    loadUser();
  }, []);

  useEffect(() => {
    if (currentUser) {
      socket.current = io(host);
      socket.current.emit("add-user", currentUser._id);
    }
  })

  useEffect(() => {
    const loadContacts = async () => {
      if (currentUser) {
        if (!currentUser.isAvatarImageSet) {
          navigate("/avatar");
        } else {
          const { data } = await axios.get(`${ contactsRoute }/${ currentUser._id }`);
          setContacts(data);
        }
      }
    };
    loadContacts();
  }, [currentUser]);

  const handleChatChange = e => {
    setCurrentChat(e);
  };

  return (
    <>
      <div className="chat-container">
        <div className="container">
          <Contacts contacts={ contacts } onChatChange={ handleChatChange }/>
          { currentChat ? (
            <Detail currentUser={ currentUser } currentChat={ currentChat } socket={ socket }/>
          ) : (
            <Welcome/>
          ) }
        </div>
      </div>
    </>
  );
};

export default Chat;
