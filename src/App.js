import "./App.css";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./Components/Header";
import CharacterPage from "./Page/CharacterPage";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import PageNotFound from "./Components/PageNotFound";
import SignUpPage from "./Page/SignUpPage";
import LoginPage from "./Page/LoginPage";
import ComicPage from "./Page/ComicPage";
import CharacterDetailPage from "./Page/CharacterDétailPage";
import Cookies from "js-cookie";
import axios from "axios";
import FavoredComicPage from "./Page/FavoredComicPage";
import FavoredCharacterPage from "./Page/FavoredCharacterPage";
import FavoredPage from "./Page/FavoredPage";
library.add(faStar);
function App() {
  const [authToken, setAuthToken] = useState(Cookies.get("Token") || null);
  const [userData, setUserData] = useState();

  const userLogin = (token) => {
    setAuthToken(token);
    Cookies.set("Token", token, { expires: 7 });
  };
  useEffect(() => {
    if (authToken !== null) {
      const fetchdata = async () => {
        try {
          const response = await axios.get(
            `http://localhost:3100/user-read/${authToken}`
          );
          setUserData(response.data);
        } catch (error) {
          console.log(error.message);
        }
      };
      fetchdata();
    }
  }, [authToken]);
  // function add favored for CharacterPage and Poster (click slowly on it else bug)
  const FavoredAddCharacterClick = async (
    id,
    token,
    name,
    src,
    description,
    gif
  ) => {
    if (token) {
      try {
        console.log({ src, description, name, id, token });
        const response = await axios.get(
          `http://localhost:3100/Character-favored?id=${id}&token=${token}&name=${name}&src=${src}&description=${
            description ? description : "Non autorisé"
          }&extension=${gif}`
        );
        alert(response.data.message);
      } catch (error) {
        console.log(error.message);
        alert("Une erreur est survenue");
      }
    } else alert("Authentifiez-vous !");
  };
  const FavoredDeleteCharacterClick = async (id, token, name) => {
    if (token) {
      try {
        // console.log({ id, token, name });
        const response = await axios.get(
          `http://localhost:3100/Character-favored-delete?id=${id}&token=${token}&name=${name}`
        );
        alert(response.data.message);
      } catch (error) {
        console.log(error.message);
        alert("Une erreur est survenue");
      }
    } else alert("Authentifiez-vous !");
  };

  const FavoredAddComicClick = async (
    id,
    token,
    name,
    src,
    description,
    gif
  ) => {
    if (token) {
      try {
        console.log({ src, description, name, id, token });

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
        console.log(error.message);
        alert("Une erreur est survenue");
      }
    } else alert("Authentifiez-vous !");
  };
  const FavoredDeleteComicClick = async (id, token, name) => {
    if (token) {
      try {
        // console.log({ id, token, name });
        const response = await axios.get(
          `http://localhost:3100/Comic-favored-delete?id=${id}&token=${token}&name=${name}`
        );
        alert(response.data.message);
      } catch (error) {
        console.log(error.message);
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
        ></Header>
        <Switch>
          <Route exact path="/login">
            <LoginPage authToken={authToken} userLogin={userLogin}></LoginPage>
          </Route>
          <Route exact path="/signup">
            <SignUpPage
              authToken={authToken}
              setAuthToken={setAuthToken}
            ></SignUpPage>
          </Route>
          <Route exact path="/Character-detail-page/:id">
            <CharacterDetailPage
              user={userData ? userData.username : ""}
            ></CharacterDetailPage>
          </Route>
          <Route exact path="/favoredComic">
            <FavoredComicPage
              authToken={authToken}
              FavoredDeleteComicClick={FavoredDeleteComicClick}
            ></FavoredComicPage>
          </Route>
          <Route exact path="/favoredCharacter">
            <FavoredCharacterPage
              authToken={authToken}
              FavoredDeleteCharacterClick={FavoredDeleteCharacterClick}
            ></FavoredCharacterPage>
          </Route>
          <Route exact path="/favored">
            <FavoredPage authToken={authToken}></FavoredPage>
          </Route>
          <Route exact path="/comic">
            <ComicPage
              authToken={authToken}
              FavoredAddComicClick={FavoredAddComicClick}
            ></ComicPage>
          </Route>
          <Route exact path="/">
            <CharacterPage
              authToken={authToken}
              FavoredAddCharacterClick={FavoredAddCharacterClick}
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
