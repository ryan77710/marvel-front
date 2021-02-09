import { useEffect, useState } from "react";
import axios from "axios";
import IsLoading from "../Components/IsLoading";
import Comic from "../Components/Comic";
import Pagination from "../Components/Pagination";

const ComicPage = ({ authToken, FavoredAddComicClick }) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const [search2, setSearch2] = useState("");
  const [limit2, setLimit2] = useState(100);
  const [skip2, setSkip2] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `http://localhost:3100/comics?limit=${limit2}&title=${search2}&skip=${
          skip2 * 100
        }`
      );
      setData(response.data);
      setIsLoading(false);
    };
    fetchData();
  }, [search2, limit2, skip2]);
  console.log(data);

  return (
    <>
      {isLoading ? (
        <IsLoading></IsLoading>
      ) : (
        <div className="ComicPage">
          <div>
            <Pagination
              for="Comics"
              text="Titre"
              search2={search2}
              setSearch2={setSearch2}
              limit2={limit2}
              setLimit2={setLimit2}
              skip2={skip2}
              setSkip2={setSkip2}
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
                  gif={comic.thumbnail.extension}
                  iconOnClick={() =>
                    FavoredAddComicClick(
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
