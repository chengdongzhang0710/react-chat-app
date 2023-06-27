import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Buffer } from "buffer";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { avatarRoute } from "../../utils/APIRoutes";
import loader from "../../assets/loader.gif";
import "./index.scss";

const Avatar = () => {
  const api = "https://api.multiavatar.com/4645646";
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [avatars, setAvatars] = useState([]);
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const toastOptions = {
    position: "bottom-right",
    autoClose: 3000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  useEffect(() => {
    if (!localStorage.getItem("chat-app-user")) {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    const loadAvatars = async () => {
      const data = [];
      for (let i = 0; i < 4; i++) {
        const image = await axios.get(`${ api }/${ Math.round(Math.random() * 1000) }`);
        const buffer = new Buffer(image.data);
        data.push(buffer.toString("base64"));
      }
      setAvatars(data);
      setIsLoading(false);
    };
    loadAvatars();
  }, []);

  const handleSubmit = async () => {
    if (selectedAvatar === null) {
      toast.error("Please select an avatar.", toastOptions);
    } else {
      const user = await JSON.parse(localStorage.getItem("chat-app-user"));
      const { data } = await axios.post(`${ avatarRoute }/${ user._id }`, { image: avatars[selectedAvatar] });
      if (data.isSet) {
        user.isAvatarImageSet = true;
        user.avatarImage = data.image;
        localStorage.setItem("chat-app-user", JSON.stringify(user));
        navigate("/");
      } else {
        toast.error("Error setting avatar. Please try again.", toastOptions);
      }
    }
  };

  return (
    <>
      { isLoading ? (
        <div className="avatar-container">
          <img src={ loader } alt="loader" className="loader"/>
        </div>
      ) : (
        <div className="avatar-container">
          <div className="title-container">
            <h1>Pick an Avatar as your profile picture</h1>
          </div>
          <div className="avatars">
            { avatars.map((item, index) => {
              return (
                <div className={ selectedAvatar === index ? "avatar selected" : "avatar" }>
                  <img src={ `data:image/svg+xml;base64,${ item }` } alt="avatar" key={ item }
                       onClick={ () => setSelectedAvatar(index) }/>
                </div>
              );
            }) }
          </div>
          <button className="submit-button" onClick={ handleSubmit }>Set as Profile Picture</button>
          <ToastContainer/>
        </div>
      ) }
    </>
  );
};

export default Avatar;
