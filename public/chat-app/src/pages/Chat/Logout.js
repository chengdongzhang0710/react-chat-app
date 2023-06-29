import { useNavigate } from "react-router-dom";
import { BiPowerOff } from "react-icons/bi";
import "./Logout.scss";

const Logout = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="logout-button" onClick={ handleClick }>
      <BiPowerOff/>
    </div>
  );
};

export default Logout;
