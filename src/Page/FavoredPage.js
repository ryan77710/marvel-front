import { useHistory, Redirect } from "react-router-dom";
import pictureMini from "../pictureMini.json";
import IsLoading from "../Components/IsLoading";
import { useState, useEffect } from "react";

const FavoredPage = ({ authToken }) => {
  const [result, setResult] = useState("");
  const [result1, setResult1] = useState("");

  useEffect(() => {
    const numberHazard1 = (result, result1) => {
      result = pictureMini[Math.floor(Math.random() * pictureMini.length)];
      result1 = pictureMini[Math.floor(Math.random() * pictureMini.length)];
      setResult(result);
      setResult1(result1);
    };
    setInterval(() => {
      numberHazard1();
    }, 3500);
  }, []);

  let history = useHistory();
  return (
    <>
      {authToken ? (
        <>
          {result && result1 ? (
            <div className="FavoredPage">
              <img src={result} alt="wallpaper" />
              <div>
                <button onClick={() => history.push("/favoredComic")}>
                  Comics
                </button>
                <button onClick={() => history.push("/favoredCharacter")}>
                  Personnage
                </button>
              </div>

              <img
                src={result1}
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
