import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Poster from "../../Components/Poster";
import IsLoading from "../../Components/IsLoading";
import axios from "axios";

const FavoredCharacterPage = (props) => {
  const { authToken, favoredDeleteCharacterClick, checkPictureMissing } = props;
  let history = useHistory();
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `https://ryan-martel-backend.herokuapp.com/user-read/${authToken}`
      );
      setData(response.data);
      setIsLoading(false);
    };
    fetchData();
  }, [authToken]);
  return (
    <>
      {isLoading ? (
        <IsLoading></IsLoading>
      ) : (
        <div className="CharacterPage">
          {data.favoredCharacters.map((poster, index) => {
            return (
              <Poster
                checkPictureMissing={checkPictureMissing}
                iconOnClick={() => {
                  favoredDeleteCharacterClick(
                    poster.id,
                    authToken,
                    poster.name
                  );
                  history.go(0);
                }}
                src={poster.src}
                token={authToken}
                key={poster._id}
                id={poster._id}
                name={poster.name}
                description={poster.description}
                gif={poster.extension}
              ></Poster>
            );
          })}
        </div>
      )}
    </>
  );
};

export default FavoredCharacterPage;
