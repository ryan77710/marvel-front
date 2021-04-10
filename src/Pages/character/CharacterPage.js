import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

import Poster from "../../Components/Poster";
import IsLoading from "../../Components/IsLoading";
import Pagination from "../../Components/pagination/Pagination";

import axios from "axios";

const Character = (props) => {
  const { authToken, checkPictureMissing } = props;

  //delay for animation delay of Poster
  let delay = 0;

  const [data, setData] = useState();
  const [posterData, setPosterData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [searchCharacter, setSearchCharacter] = useState("");
  const [searchCharacterDebounced] = useDebounce(searchCharacter, 1000);
  const [limitCharacter, setLimitCharacter] = useState(100);
  const [skipCharacter, setSkipCharacter] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `${
          process.env.REACT_APP_API_URL
        }characters?name=${searchCharacterDebounced}&limit=${limitCharacter}&skip=${
          searchCharacterDebounced ? 0 : skipCharacter * 100
        }&token=${authToken || ""}`
      );

      setData(response.data);
      setPosterData(response.data.results);
      setIsLoading(false);
    };
    fetchData();
  }, [limitCharacter, searchCharacterDebounced, skipCharacter, authToken]);

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
        console.log("on click");
        const response = await axios.get(
          `${
            process.env.REACT_APP_API_URL
          }character-favored?id=${id}&token=${token}&name=${name}&src=${src}&description=${
            description ? description : "Non autorisé"
          }&extension=${gif}`
        );
        const tab = [...posterData];
        tab.map((poster, index) => {
          if (poster._id === id) {
            const favored = tab[index].favored;
            tab[index].favored = !favored;
          }
          return "";
        });
        setPosterData(tab);
        console.log(response.data);
      } catch (error) {
        alert("Une erreur est survenue");
      }
    } else alert("Authentifiez-vous !");
  };

  return (
    <>
      {isLoading ? (
        <IsLoading />
      ) : (
        <div className="CharacterPage">
          <Pagination
            type="Characters"
            text={"Nom"}
            searchCharacter={searchCharacter}
            setSearchCharacter={setSearchCharacter}
            limitCharacter={limitCharacter}
            setLimitCharacter={setLimitCharacter}
            skipCharacter={skipCharacter}
            setSkipCharacter={setSkipCharacter}
            count={data.count}
          />
          {posterData.map((poster) => {
            const src = `${poster.thumbnail.path}.${poster.thumbnail.extension}`;
            delay += 0.17;

            return (
              <Poster
                favored={poster.favored}
                delay={delay}
                checkPictureMissing={checkPictureMissing}
                src={src}
                token={authToken}
                key={poster._id}
                id={poster._id}
                name={poster.name}
                description={poster.description}
                gif={poster.thumbnail.extension}
                iconOnClick={() =>
                  favoredAddCharacterClick(
                    poster._id,
                    authToken,
                    poster.name,
                    src,
                    poster.description,
                    poster.thumbnail.extension
                  )
                }
              />
            );
          })}
        </div>
      )}
    </>
  );
};
export default Character;
