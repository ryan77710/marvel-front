import { useEffect, useState } from "react";
import Poster from "../../Components/Poster";
import IsLoading from "../../Components/IsLoading";
import axios from "axios";

const FavoredCharacterPage = (props) => {
  const { authToken, checkPictureMissing } = props;
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}user-read/${authToken}`
      );
      setData(response.data.favoredCharacters);
      setIsLoading(false);
    };
    fetchData();
  }, [authToken]);
  const favoredDeleteCharacterClick = async (id, token, name) => {
    if (token) {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}character-favored-delete?id=${id}&token=${token}&name=${name}`
        );

        setData(response.data.favoredCharacters);
      } catch (error) {
        alert("Une erreur est survenue");
      }
    } else alert("Authentifiez-vous !");
  };
  return (
    <>
      {isLoading ? (
        <IsLoading></IsLoading>
      ) : (
        <div className="CharacterPage">
          {data
            ? data.map((poster, index) => {
                return (
                  <Poster
                    checkPictureMissing={checkPictureMissing}
                    favored={poster.favored}
                    iconOnClick={() => {
                      favoredDeleteCharacterClick(
                        poster.id,
                        authToken,
                        poster.name
                      );
                    }}
                    src={poster.src}
                    token={authToken}
                    key={poster.id}
                    id={poster._id}
                    name={poster.name}
                    description={poster.description}
                    gif={poster.extension}
                  />
                );
              })
            : ""}
        </div>
      )}
    </>
  );
};

export default FavoredCharacterPage;
