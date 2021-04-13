import { useHistory } from "react-router-dom";

import Cookies from "js-cookie";
import { toast } from "react-toastify";

const Header = (props) => {
  const { authToken, setAuthToken, userData, setUserData } = props;
  let history = useHistory();

  const userLogOut = () => {
    Cookies.remove("Token");
    setAuthToken(null);
    setUserData(null);
    history.push("/");
    toast.warn("Déconecxions");
    toast("au revoir a bientôt");
  };
  return (
    <header>
      <img
        onClick={() => history.push("/")}
        src="https://wallpaperaccess.com/full/1112426.jpg"
        alt="logo-marvel"
      />
      <div>
        {userData &&
        userData.picture !== undefined &&
        userData.picture !== null ? (
          <img src={userData.picture.url} alt="user" />
        ) : (
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjFpg0P1tvjnU8sGPcwqyTueZ65utmvegb5w&usqp=CAU"
            alt="anonyme"
          />
        )}
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
      <button className="cyan" onClick={() => history.push("/favored")}>
        Favori
      </button>
    </header>
  );
};

export default Header;
