import { useEffect, useState } from "react";
import logo from "../../assets/logo.svg";
import "./Contacts.scss";

const Contacts = ({ contacts, onChatChange }) => {
  const [currentUserName, setCurrentUserName] = useState(null);
  const [currentUserImage, setCurrentUserImage] = useState(null);
  const [currentSelected, setCurrentSelected] = useState(null);

  useEffect(() => {
    const setUserInfo = async () => {
      const data = await JSON.parse(localStorage.getItem("chat-app-user"));
      if (data) {
        setCurrentUserName(data.username);
        setCurrentUserImage(data.avatarImage);
      }
    };
    setUserInfo();
  }, []);

  const changeCurrentChat = (index, item) => {
    setCurrentSelected(index);
    onChatChange(item);
  };

  return (
    <>
      { currentUserName && currentUserImage && (
        <div className="contacts-container">
          <div className="brand">
            <img src={ logo } alt="logo"/>
            <h3>snappy</h3>
          </div>
          <div className="contacts">
            { contacts.map((item, index) => {
              return (
                <div key={ item._id } className={ currentSelected === index ? "contact selected" : "contact" }
                     onClick={ () => changeCurrentChat(index, item) }>
                  <div className="avatar">
                    <img src={ `data:image/svg+xml;base64,${ item.avatarImage }` } alt="avatar"/>
                  </div>
                  <div className="username">
                    <h3>{ item.username }</h3>
                  </div>
                </div>
              );
            }) }
          </div>
          <div className="current-user">
            <div className="avatar">
              <img src={ `data:image/svg+xml;base64,${ currentUserImage }` } alt="avatar"/>
            </div>
            <div className="username">
              <h2>{ currentUserName }</h2>
            </div>
          </div>
        </div>
      ) }
    </>
  );
};

export default Contacts;
