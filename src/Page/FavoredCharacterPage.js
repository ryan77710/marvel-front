import { useEffect, useState } from "react";
import axios from "axios";
import Poster from "../Components/Poster";
import IsLoading from "../Components/IsLoading";
import { useHistory } from "react-router-dom";

const FavoredCharacterPage = ({ authToken, FavoredDeleteCharacterClick }) => {
  let history = useHistory();
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      console.log(authToken);
      const response = await axios.get(
        `http://localhost:3100/user-read/${authToken}`
      );
      console.log(response);
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
          {data.favoredCharacter.map((poster, index) => {
            return (
              <Poster
                iconOnClick={() => {
                  FavoredDeleteCharacterClick(
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
