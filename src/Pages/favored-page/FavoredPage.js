import { useState, useEffect } from "react";
import { useHistory, Redirect } from "react-router-dom";
import IsLoading from "../../Components/IsLoading";
import pictureFavoredPage from "../../pictureFavoredPage.json";

const FavoredPage = ({ authToken }) => {
  let history = useHistory();
  const [pictureLeft, setPictureLeft] = useState("");
  const [pictureRight, setPictureRight] = useState("");

  useEffect(() => {
    const randomPicture = () => {
      let pictureLeft =
        pictureFavoredPage[
          Math.floor(Math.random() * pictureFavoredPage.length)
        ];
      let pictureRight =
        pictureFavoredPage[
          Math.floor(Math.random() * pictureFavoredPage.length)
        ];
      setPictureLeft(pictureLeft);
      setPictureRight(pictureRight);
    };
    setInterval(() => {
      randomPicture();
    }, 3500);
  }, []);

  return (
    <>
      {authToken ? (
        <>
          {pictureLeft && pictureRight ? (
            <div className="FavoredPage">
              <img src={pictureLeft} alt="wallpaper" />
              <div>
                <button onClick={() => history.push("/favoredComic")}>
                  Comics
                </button>
                <button onClick={() => history.push("/favoredCharacter")}>
                  Personnage
                </button>
              </div>

              <img
                src={pictureRight}
                className="kenburns-top-loading "
                alt="wallpaper"
              />
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
