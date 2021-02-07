import { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
const SignUpPage = () => {
  let history = useHistory();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [picture, setPicture] = useState();
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const handleEmailChange = (event) => setEmail(event.target.value);
  const handleUsernameChange = (event) => setUsername(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);
  const handlePassword2Change = (event) => setPassword2(event.target.value);
  const handlePictureChange = (event) => setPicture(event.target.files[0]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== password2) {
      alert("atttention pas egale");
    } else {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("username", username);
      formData.append("picture", picture);
      formData.append("password", password);

      console.log(formData);

      try {
        const response = await axios.post(
          "http://localhost:3100/user/signUp",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log(response);
        history.push("/");
      } catch (error) {
        console.log(error.response.data.message);
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
          placeholder="username"
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
          placeholder="Mot de passe"
          value={password2}
          onChange={handlePassword2Change}
        />
        <div>
          <label htmlFor="picture">ok</label>
          <input type="file" onChange={handlePictureChange} />
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
