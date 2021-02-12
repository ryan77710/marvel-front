import "./App.css";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import SignUpPage from "./Pages/SignUpPage";
import LoginPage from "./Pages/LoginPage";
import ComicPage from "./Pages/ComicPage";
import CharacterPage from "./Pages/CharacterPage";
import CharacterDetailPage from "./Pages/CharacterDetailPage";
import FavoredCharacterPage from "./Pages/FavoredCharacterPage";
import FavoredPage from "./Pages/FavoredPage";
import FavoredComicPage from "./Pages/FavoredComicPage";

import Header from "./Components/Header";
import PageNotFound from "./Components/PageNotFound";

import Cookies from "js-cookie";
import axios from "axios";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faStar } from "@fortawesome/free-solid-svg-icons";
library.add(faStar);

function App() {
  const [authToken, setAuthToken] = useState(Cookies.get("Token") || null);
  const [userData, setUserData] = useState();

  const checkPictureMissing = (src) => {
    const regex = /available/;
    let pictureMissing = regex.test(src);
    return pictureMissing;
  };

  const userLogin = (token) => {
    setAuthToken(token);
    Cookies.set("Token", token, { expires: 7 });
  };
  useEffect(() => {
    if (authToken !== null) {
      const fetchData = async () => {
        try {
          const response = await axios.get(
            `http://localhost:3100/user-read/${authToken}`
          );
          setUserData(response.data);
        } catch (error) {
          alert("Une erreur est survenue");
        }
      };
      fetchData();
    }
  }, [authToken]);
  const favoredAddCharacterClick = async (
    id,
    token,
    name,
    src,
    description,
    gif
  ) => {
    if (token) {
      try {
        const response = await axios.get(
          `http://localhost:3100/Character-favored?id=${id}&token=${token}&name=${name}&src=${src}&description=${
            description ? description : "Non autorisé"
          }&extension=${gif}`
        );
        alert(response.data.message);
      } catch (error) {
        alert("Une erreur est survenue");
      }
    } else alert("Authentifiez-vous !");
  };

  const favoredDeleteCharacterClick = async (id, token, name) => {
    if (token) {
      try {
        const response = await axios.get(
          `http://localhost:3100/Character-favored-delete?id=${id}&token=${token}&name=${name}`
        );
        alert(response.data.message);
      } catch (error) {
        alert("Une erreur est survenue");
      }
    } else alert("Authentifiez-vous !");
  };

  const favoredAddComicClick = async (
    id,
    token,
    name,
    src,
    description,
    gif
  ) => {
    if (token) {
      try {
        const data = {
          src: src,
          description: description ? description : "Non autorisé",
          name: name,
          id: id,
          token: token,
          extension: gif,
        };
        const response = await axios.post(
          "http://localhost:3100/Comic-favored",
          data
        );
        alert(response.data.message);
      } catch (error) {
        alert("Une erreur est survenue");
      }
    } else alert("Authentifiez-vous !");
  };
  const favoredDeleteComicClick = async (id, token, name) => {
    if (token) {
      try {
        const response = await axios.get(
          `http://localhost:3100/Comic-favored-delete?id=${id}&token=${token}&name=${name}`
        );
        alert(response.data.message);
      } catch (error) {
        alert("Une erreur est survenue");
      }
    } else alert("Authentifiez-vous !");
  };

  return (
    <div className="App">
      <Router>
        <Header
          authToken={authToken}
          userLogin={userLogin}
          userData={userData}
          setUserData={setUserData}
          setAuthToken={setAuthToken}
        />
        <Switch>
          <Route exact path="/login">
            <LoginPage authToken={authToken} userLogin={userLogin} />
          </Route>
          <Route exact path="/signup">
            <SignUpPage
              authToken={authToken}
              userLogin={userLogin}
              setAuthToken={setAuthToken}
            />
          </Route>
          <Route exact path="/Character-detail-page/:id">
            <CharacterDetailPage
              user={userData ? userData.username : ""}
              checkPictureMissing={checkPictureMissing}
            />
          </Route>
          <Route exact path="/favoredComic">
            <FavoredComicPage
              authToken={authToken}
              checkPictureMissing={checkPictureMissing}
              favoredDeleteComicClick={favoredDeleteComicClick}
            />
          </Route>
          <Route exact path="/favoredCharacter">
            <FavoredCharacterPage
              authToken={authToken}
              checkPictureMissing={checkPictureMissing}
              favoredDeleteCharacterClick={favoredDeleteCharacterClick}
            />
          </Route>
          <Route exact path="/favored">
            <FavoredPage authToken={authToken} />
          </Route>
          <Route exact path="/comic">
            <ComicPage
              authToken={authToken}
              favoredAddComicClick={favoredAddComicClick}
              checkPictureMissing={checkPictureMissing}
            />
          </Route>
          <Route exact path="/">
            <CharacterPage
              authToken={authToken}
              favoredAddCharacterClick={favoredAddCharacterClick}
              checkPictureMissing={checkPictureMissing}
            />
          </Route>
          <Route path="*">
            <PageNotFound />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
