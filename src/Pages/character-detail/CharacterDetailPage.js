import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import IsLoading from "../../Components/IsLoading";
import ShowComic from "../../Components/ShowComic";
import pictureDetailPage from "../../pictureDetailPage.json";

const CharacterDetailPage = ({ checkPictureMissing, user }) => {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [comicData, setComicData] = useState();
  const [showComic, setShowComic] = useState(false);
  const [randomPicture, setRandomPicture] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `https://ryan-martel-backend.herokuapp.com/character-comic/${id}`
      );
      setData(response.data);
      setIsLoading(false);
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    const randomPicture = () => {
      let picture =
        pictureDetailPage[Math.floor(Math.random() * pictureDetailPage.length)];
      setRandomPicture(picture);
    };
    setInterval(() => {
      randomPicture();
    }, 3500);
  }, []);

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
            <img src={randomPicture} alt="comic" />
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
