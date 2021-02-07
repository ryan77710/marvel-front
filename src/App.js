import "./App.css";
import { useState } from "react";
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
library.add(faStar);

function App() {
  // let history = useHistory();
  const [authToken, setAuthToken] = useState(Cookies.get("Token") || null);
  const [user, setUser] = useState("");
  const [picture, setPicture] = useState();

  const userLogin = (user, token, picture) => {
    setUser(user);
    setAuthToken(token);
    setPicture(picture);
    Cookies.set("Token", token, { expires: 1 });
  };

  return (
    <div className="App">
      <Router>
        <Header
          picture={picture}
          authToken={authToken}
          userLogin={userLogin}
          username={user}
          setAuthToken={setAuthToken}
          setUser={setUser}
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
            <CharacterDetailPage user={user}></CharacterDetailPage>
          </Route>
          <Route exact path="/comic">
            <ComicPage></ComicPage>
          </Route>
          <Route exact path="/">
            <CharacterPage />
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
