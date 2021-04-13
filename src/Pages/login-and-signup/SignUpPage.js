import { useState } from "react";
import { useHistory } from "react-router-dom";

import axios from "axios";
import { toast } from "react-toastify";

const SignUpPage = ({ userLogin }) => {
  let history = useHistory();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [picture, setPicture] = useState();
  const [password, setPassword] = useState("");
  const [ConfirmePassword, setConfirmePassword] = useState("");

  const handleEmailChange = (event) => setEmail(event.target.value);
  const handleUsernameChange = (event) => setUsername(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);
  const handleConfirmePasswordChange = (event) =>
    setConfirmePassword(event.target.value);
  const handlePictureChange = (event) => setPicture(event.target.files[0]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== ConfirmePassword) {
      toast.error("atttention mot de passe diférent");
    } else {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("username", username);
      formData.append("picture", picture);
      formData.append("password", password);

      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}user/signup`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        userLogin(response.data.token);
        history.push("/");
        toast.success("compte créé");
      } catch (error) {
        toast.error("Une erreur est survenue");
      }
    }
  };
  return (
    <div className="SignUpPage">
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="email"
          value={email}
          onChange={handleEmailChange}
        />
        <input
          type="text"
          placeholder="utilisateur"
          value={username}
          onChange={handleUsernameChange}
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={handlePasswordChange}
        />
        <input
          type="password"
          placeholder="Confirmé le  mot de passe"
          value={ConfirmePassword}
          onChange={handleConfirmePasswordChange}
        />
        <div>
          <label htmlFor="picture">Choisissez-une image</label>
          <input
            className="hidden"
            type="file"
            id="picture"
            name="picture"
            onChange={handlePictureChange}
          />
        </div>
        <button type="submit">Inscrivez-vous 😉</button>
        <span onClick={() => history.push("/login")}>
          Vous avez déja un compte !
        </span>
      </form>
    </div>
  );
};

export default SignUpPage;
