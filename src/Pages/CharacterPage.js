import { useEffect, useState } from "react";
import axios from "axios";
import Poster from "../Components/Poster";
import IsLoading from "../Components/IsLoading";
import Pagination from "../Components/Pagination";

const Character = (props) => {
  const { authToken, favoredAddCharacterClick, checkPictureMissing } = props;
  //counteur for animation delay of Poster
  let delay = 0;
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const [searchCharacter, setSearchCharacter] = useState("");
  const [limitCharacter, setLimitCharacter] = useState(100);
  const [skipCharacter, setSkipCharacter] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `http://localhost:3100/characters?name=${searchCharacter}&limit=${limitCharacter}&skip=${
          skipCharacter * 100
        }`
      );
      setData(response.data);
      setIsLoading(false);
    };
    fetchData();
  }, [limitCharacter, searchCharacter, skipCharacter]);

  return (
    <>
      {isLoading ? (
        <IsLoading></IsLoading>
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
          ></Pagination>
          {data.results.map((poster, index) => {
            const src = `${poster.thumbnail.path}.${poster.thumbnail.extension}`;
            delay += 0.17;
            return (
              <Poster
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
              ></Poster>
            );
          })}
        </div>
      )}
    </>
  );
};
export default Character;
