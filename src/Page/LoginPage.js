import { useHistory } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

const LoginPage = ({ userLogin }) => {
  let history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (event) => setEmail(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const data = { email: email, password: password };
      const response = await axios.post(
        "http://localhost:3100/user/login",
        data
      );
      const token = response.data.token;
      const username = response.data.username;
      const picture = response.data.picture.url;
      console.log(username);
      userLogin(username, token, picture);
      history.push("/");
    } catch (error) {
      console.log(error.response.data.message);
    }
  };
  return (
    <div className="LoginPage">
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="email"
          onChange={handleEmailChange}
          value={email}
        />
        <input
          type="password"
          placeholder="Mot de passe"
          onChange={handlePasswordChange}
          value={password}
        />
        <button type="submit">Se connecter</button>
        <span onClick={() => history.push("/signup")}>Se créer un compte</span>
      </form>
    </div>
  );
};

export default LoginPage;