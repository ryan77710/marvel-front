import { useHistory, Redirect } from "react-router-dom";
import IsLoading from "../../Components/IsLoading";
import pictureFavoredPage from "../../pictureFavoredPage.json";
import Caroussel from "../../Components/Caroussel";

const FavoredPage = ({ authToken }) => {
  let history = useHistory();

  return (
    <>
      {authToken ? (
        <>
          {authToken && authToken ? (
            <div className="FavoredPage">
              <div className="carousselContainer">
                <Caroussel pictures={pictureFavoredPage} />
              </div>

              <div>
                <button onClick={() => history.push("/favoredComic")}>
                  Comics
                </button>
                <button onClick={() => history.push("/favoredCharacter")}>
                  Personnage
                </button>
              </div>
              <div className="carousselContainer">
                <Caroussel pictures={pictureFavoredPage} index={20} />
              </div>
            </div>
          ) : (
            <IsLoading />
          )}
        </>
      ) : (
        <Redirect to="/login" />
      )}
    </>
  );
};

export default FavoredPage;
