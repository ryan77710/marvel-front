import { useState } from "react";
import { useHistory } from "react-router-dom";

import axios from "axios";
import { toast } from "react-toastify";

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
        `${process.env.REACT_APP_API_URL}user/login`,
        data
      );
      const token = response.data.token;

      userLogin(token);
      history.push("/");
      toast(`Salut ${response.data.username}`);
    } catch (error) {
      toast.error(error.response.data.message);
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
