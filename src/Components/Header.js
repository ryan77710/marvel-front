import { useHistory } from "react-router-dom";
import Cookies from "js-cookie";

const Header = (props) => {
  const { authToken, setAuthToken, userData, setUserData } = props;
  let history = useHistory();

  const userLogOut = () => {
    Cookies.remove("Token");
    setAuthToken(null);
    setUserData(null);
    alert("deconexion");
    history.push("/");
  };
  return (
    <header>
      <img
        onClick={() => history.push("/")}
        src="https://wallpaperaccess.com/full/1112426.jpg"
        alt="logo-marvel"
      />
      <div>
        <img
          src={
            userData
              ? userData.picture.url
              : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjFpg0P1tvjnU8sGPcwqyTueZ65utmvegb5w&usqp=CAU"
          }
          alt={userData ? userData.username : "joker-anomyme"}
        />
        <p>
          Bienvenue <b> {userData ? userData.username : "Inconnue"}</b>
          <br /> Accréditation:{" "}
          <b> {userData ? "niveaux 2" : "non accrédité"}</b>
        </p>
      </div>
      <button className="red" onClick={() => history.push("/")}>
        Personnage
      </button>
      <button className="blue" onClick={() => history.push("/comic")}>
        Comic
      </button>
      {!authToken ? (
        <button className="white" onClick={() => history.push("/login")}>
          Se connecter
        </button>
      ) : (
        <button className="white" onClick={userLogOut}>
          Se déconnecter
        </button>
      )}
      <button className="cyan" onClick={() => history.push("favored")}>
        Favorie
      </button>
    </header>
  );
};

export default Header;
