import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

import IsLoading from "../../Components/IsLoading";
import Comic from "../../Components/Comic";
import Pagination from "../../Components/pagination/Pagination";

import axios from "axios";
import { toast } from "react-toastify";

const ComicPage = (props) => {
  const { authToken, checkPictureMissing } = props;
  const [data, setData] = useState();
  const [comics, setComics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [searchComic, setSearchComic] = useState("");
  const [searchComicDebounced] = useDebounce(searchComic, 2000);
  const [limitComic, setLimitComic] = useState(100);
  const [skipComic, setSkipComic] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `${
          process.env.REACT_APP_API_URL
        }comics?limit=${limitComic}&title=${searchComicDebounced}&skip=${
          skipComic * 100
        }&token=${authToken || ""}`
      );
      setData(response.data);
      setComics(response.data.results);
      setIsLoading(false);
    };
    fetchData();
  }, [searchComicDebounced, limitComic, authToken, skipComic]);

  const favoredAddComicClick = async (
    id,
    token,
    name,
    src,
    description,
    gif
  ) => {
    if (token) {
      try {
        const data = {
          src: src,
          description: description ? description : "Non autorisé",
          name: name,
          id: id,
          token: token,
          extension: gif,
        };
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}comic-favored`,
          data
        );
        const tab = [...comics];
        tab.map((comic, index) => {
          if (comic._id === id) {
            const favored = tab[index].favored;
            tab[index].favored = !favored;
          }
          return "";
        });
        setComics(tab);
        toast.info(response.data.message);
      } catch (error) {
        toast.error("Une erreur est survenue");
      }
    } else toast.error("Authentifiez-vous !");
  };

  return (
    <>
      {isLoading ? (
        <IsLoading></IsLoading>
      ) : (
        <div className="ComicPage">
          <div>
            <Pagination
              type="Comics"
              text="Titre"
              searchComic={searchComic}
              setSearchComic={setSearchComic}
              limitComic={limitComic}
              setLimitComic={setLimitComic}
              skipComic={skipComic}
              setSkipComic={setSkipComic}
              count={data.count}
            ></Pagination>
            {comics.map((comic, index) => {
              const src = `${comic.thumbnail.path}.${comic.thumbnail.extension}`;
              return (
                <Comic
                  src={src}
                  favored={comic.favored}
                  key={index}
                  title={comic.title}
                  description={comic.description}
                  checkPictureMissing={checkPictureMissing}
                  gif={comic.thumbnail.extension}
                  iconOnClick={() =>
                    favoredAddComicClick(
                      comic._id,
                      authToken,
                      comic.title,
                      src,
                      comic.description,
                      comic.thumbnail.extension
                    )
                  }
                ></Comic>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default ComicPage;
