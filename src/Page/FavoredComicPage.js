import { useEffect, useState } from "react";
import axios from "axios";
import IsLoading from "../Components/IsLoading";
import Comic from "../Components/Comic";
import { useHistory } from "react-router-dom";
const FavoredComicPage = ({ authToken, FavoredDeleteComicClick }) => {
  let history = useHistory();
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      console.log(authToken);
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
        <div className="ComicPage">
          <div>
            {data.favoredComic.map((comic, index) => {
              // const src = `${comic.thumbnail.path}.${comic.thumbnail.extension}`;
              return (
                <Comic
                  iconOnClick={() => {
                    FavoredDeleteComicClick(comic.id, authToken, comic.name);
                    history.go(0);
                  }}
                  src={comic.src}
                  key={index}
                  title={comic.title}
                  description={comic.description}
                  gif={comic.extension}
                ></Comic>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default FavoredComicPage;
