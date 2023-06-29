import { useEffect, useState } from "react";
import robot from "../../assets/robot.gif";
import "./Welcome.scss";

const Welcome = () => {
  const [username, setUsername] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const loadUsername = async () => {
      const data = await JSON.parse(localStorage.getItem("chat-app-user"));
      if (data) {
        setUsername(data.username);
        setIsLoaded(true);
      }
    };
    loadUsername();
  }, []);

  return (
    <>
      { isLoaded && (
        <div className="welcome-container">
          <img src={ robot } alt="robot"/>
          <h1>Welcome, <span>{ username }</span>!</h1>
          <h3>Please select a chat to start messaging.</h3>
        </div>
      ) }
    </>
  );
};

export default Welcome;
