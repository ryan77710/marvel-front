import { useHistory } from "react-router-dom";
import Cookies from "js-cookie";

const Header = (props) => {
  const { authToken, username, setAuthToken, setUser, picture } = props;
  let history = useHistory();

  const userLogOut = () => {
    Cookies.remove("Token");
    setAuthToken(null);
    setUser(null);
    alert("deconexion");
    alert(authToken);
    history.push("/login");
  };
  return (
    <header>
      <img
        onClick={() => history.push("/")}
        src="https://res.cloudinary.com/jerrick/image/upload/fl_progressive,q_auto,w_1024/zbufnpnlrrkwl8qyle7q.png"
        alt="logo-marvel"
      />
      <div>
        <img
          src={
            picture ||
            "https://res.cloudinary.com/jerrick/image/upload/fl_progressive,q_auto,w_1024/zbufnpnlrrkwl8qyle7q.png"
          }
          alt={username}
        />
        <p>
          Bienvenue <b>{username}</b>
          <br /> Accréditation: <b>niveaux 2</b>
        </p>
      </div>
      <button onClick={() => history.push("/")}>personnage</button>
      <button onClick={() => history.push("/comic")}>comic</button>
      {!props.authToken ? (
        <button onClick={() => history.push("/login")}>Se connecter</button>
      ) : (
        <button onClick={userLogOut}>Se déconnecter</button>
      )}
      <button>favorie</button>
    </header>
  );
};

export default Header;
