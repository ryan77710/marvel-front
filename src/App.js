import "./App.css";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import SignUpPage from "./Pages/login-and-signup/SignUpPage";
import LoginPage from "./Pages/login-and-signup/LoginPage";
import ComicPage from "./Pages/comic/ComicPage";
import CharacterPage from "./Pages/character/CharacterPage";
import CharacterDetailPage from "./Pages/character-detail/CharacterDetailPage";
import FavoredCharacterPage from "./Pages/character/FavoredCharacterPage";
import FavoredPage from "./Pages/favored-page/FavoredPage";
import FavoredComicPage from "./Pages/comic/FavoredComicPage";

import Header from "./Components/header/Header";
import PageNotFound from "./Components/PageNotFound";

import Cookies from "js-cookie";
import axios from "axios";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faStar } from "@fortawesome/free-solid-svg-icons";
library.add(faStar);

function App() {
  const [authToken, setAuthToken] = useState(Cookies.get("Token") || null);
  const [userData, setUserData] = useState(null);

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
            `${process.env.REACT_APP_API_URL}user-read/${authToken}`
          );
          setUserData(response.data);
        } catch (error) {
          alert("Une erreur est survenue");
        }
      };
      fetchData();
    }
  }, [authToken]);

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
          <Route exact path="/favored">
            <FavoredPage authToken={authToken} />
          </Route>
          <Route exact path="/character-detail-page/:id">
            <CharacterDetailPage
              user={userData ? userData.username : ""}
              checkPictureMissing={checkPictureMissing}
            />
          </Route>
          <Route exact path="/favoredComic">
            <FavoredComicPage
              authToken={authToken}
              checkPictureMissing={checkPictureMissing}
            />
          </Route>
          <Route exact path="/favoredCharacter">
            <FavoredCharacterPage
              authToken={authToken}
              checkPictureMissing={checkPictureMissing}
            />
          </Route>
          {/* <Route exact path="/favored">
            <FavoredPage authToken={authToken} />
          </Route> */}
          <Route exact path="/comic">
            <ComicPage
              authToken={authToken}
              checkPictureMissing={checkPictureMissing}
            />
          </Route>
          <Route exact path="/">
            <CharacterPage
              authToken={authToken}
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
