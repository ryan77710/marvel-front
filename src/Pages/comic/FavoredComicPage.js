import { useEffect, useState } from "react";
import IsLoading from "../../Components/IsLoading";
import Comic from "../../Components/Comic";
import axios from "axios";

const FavoredComicPage = (props) => {
  const { authToken, checkPictureMissing } = props;
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}user-read/${authToken}`
      );

      setData(response.data.favoredComics);
      setIsLoading(false);
    };
    fetchData();
  }, [authToken]);

  const favoredDeleteComicClick = async (id, token, name) => {
    if (token) {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}comic-favored-delete?id=${id}&token=${token}&name=${name}`
        );
        setData(response.data);
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
        <div className="ComicPage">
          <div>
            {data ? (
              <>
                {data.map((comic, index) => {
                  return (
                    <Comic
                      iconOnClick={() => {
                        favoredDeleteComicClick(
                          comic.id,
                          authToken,
                          comic.name
                        );
                      }}
                      checkPictureMissing={checkPictureMissing}
                      src={comic.src}
                      favored={comic.favored}
                      key={index}
                      title={comic.name}
                      description={comic.description}
                      gif={comic.extension}
                    />
                  );
                })}
              </>
            ) : (
              ""
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default FavoredComicPage;
