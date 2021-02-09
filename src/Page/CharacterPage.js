import { useEffect, useState } from "react";
import axios from "axios";
import Poster from "../Components/Poster";
import IsLoading from "../Components/IsLoading";
import Pagination from "../Components/Pagination";

const Character = ({ authToken, FavoredAddCharacterClick }) => {
  // for animation delay
  let counteur = 0;
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [search1, setSearch1] = useState("");
  const [limit1, setLimit1] = useState(100);
  const [skip1, setSkip1] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `http://localhost:3100/characters?name=${search1}&limit=${limit1}&skip=${
          skip1 * 100
        }`
      );
      setData(response.data);
      setIsLoading(false);
    };
    fetchData();
  }, [limit1, search1, skip1]);

  return (
    <>
      {isLoading ? (
        <IsLoading></IsLoading>
      ) : (
        <div className="CharacterPage">
          <Pagination
            for="Characters"
            text={"Nom"}
            search1={search1}
            setSearch1={setSearch1}
            limit1={limit1}
            setLimit1={setLimit1}
            skip1={skip1}
            setSkip1={setSkip1}
            count={data.count}
          ></Pagination>
          {data.results.map((poster, index) => {
            const src = `${poster.thumbnail.path}.${poster.thumbnail.extension}`;
            counteur += 0.17;
            return (
              <Poster
                delay={String(counteur) + "s"}
                src={src}
                token={authToken}
                key={poster._id}
                id={poster._id}
                name={poster.name}
                description={poster.description}
                gif={poster.thumbnail.extension}
                iconOnClick={() =>
                  FavoredAddCharacterClick(
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
