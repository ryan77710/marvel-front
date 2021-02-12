import { useEffect, useState } from "react";
import IsLoading from "../../Components/IsLoading";
import Comic from "../../Components/Comic";
import Pagination from "../../Components/pagination/Pagination";
import axios from "axios";

const ComicPage = (props) => {
  const { authToken, favoredAddComicClick, checkPictureMissing } = props;
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const [searchComic, setSearchComic] = useState("");
  const [limitComic, setLimitComic] = useState(100);
  const [skipComic, setSkipComic] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `https://ryan-martel-backend.herokuapp.com/comics?limit=${limitComic}&title=${searchComic}&skip=${
          skipComic * 100
        }`
      );
      setData(response.data);
      setIsLoading(false);
    };
    fetchData();
  }, [searchComic, limitComic, skipComic]);

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
            {data.results.map((comic, index) => {
              const src = `${comic.thumbnail.path}.${comic.thumbnail.extension}`;
              return (
                <Comic
                  src={src}
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
