import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import IsLoading from "../../Components/IsLoading";
import ShowComic from "../../Components/ShowComic";
import pictureDetailPage from "../../pictureDetailPage.json";
import Caroussel from "../../Components/Caroussel";

const CharacterDetailPage = ({ checkPictureMissing, user }) => {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [comicData, setComicData] = useState();
  const [showComic, setShowComic] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}character-comic/${id}`
      );
      setData(response.data);
      setIsLoading(false);
    };
    fetchData();
  }, [id]);

  // modal appers
  const handleComicClick = (comic) => {
    setComicData(comic);
    setShowComic(true);
  };
  let pictureMissing;

  return (
    <>
      {isLoading ? (
        <IsLoading />
      ) : (
        <div className="CharacterDetailPage">
          {(pictureMissing = checkPictureMissing(data.thumbnail.path))}
          <div>
            {pictureMissing === true || data.thumbnail.extension === "gif" ? (
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuBzStwoUGsRHFFvRMIouit-_UH2s8Ahim-Q&usqp=CAU"
                alt="top secret"
              ></img>
            ) : (
              <img
                src={`${data.thumbnail.path}.${data.thumbnail.extension}`}
                alt={data.name}
              />
            )}

            <p>{data.name}</p>
            {data.description === "" ? (
              <p style={{ color: "crimson" }}>
                Accreditation de niveaux 1 requise{" "}
              </p>
            ) : (
              <p>{data.description}</p>
            )}
          </div>
          <div>
            <div className="container">
              <span>Comics: {data.comics.length}</span>
              {data.comics.map((comic, index) => {
                const srcComic = `${comic.thumbnail.path}.${comic.thumbnail.extension}`;
                let pictureComicMissing = checkPictureMissing(srcComic);
                return (
                  <img
                    key={index}
                    onClick={() => handleComicClick(comic)}
                    src={
                      pictureComicMissing === true ||
                      comic.thumbnail.extension === "gif"
                        ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuBzStwoUGsRHFFvRMIouit-_UH2s8Ahim-Q&usqp=CAU"
                        : srcComic
                    }
                    className="comic"
                    title={comic.title}
                    alt={comic.title}
                  ></img>
                );
              })}
            </div>
            <div>
              <Caroussel pictures={pictureDetailPage} />
            </div>
          </div>
          {showComic ? (
            <ShowComic
              user={user}
              data={comicData}
              isLoading={isLoading}
              showComic={showComic}
              setShowComic={setShowComic}
              setComicData={setComicData}
            ></ShowComic>
          ) : (
            ""
          )}
        </div>
      )}
    </>
  );
};

export default CharacterDetailPage;
