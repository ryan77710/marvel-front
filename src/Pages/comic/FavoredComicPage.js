import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import IsLoading from "../../Components/IsLoading";
import Comic from "../../Components/Comic";
import axios from "axios";

const FavoredComicPage = (props) => {
  const { authToken, favoredDeleteComicClick, checkPictureMissing } = props;
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
        <div className="ComicPage">
          <div>
            {data.favoredComics.map((comic, index) => {
              return (
                <Comic
                  iconOnClick={() => {
                    favoredDeleteComicClick(comic.id, authToken, comic.name);
                    history.go(0);
                  }}
                  checkPictureMissing={checkPictureMissing}
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
