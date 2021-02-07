import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import IsLoading from "../Components/IsLoading";
import ShowComic from "../Components/ShowComic";

const CharacterDetailPage = (props) => {
  const { id } = useParams();
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [comicData, setComicData] = useState();
  const [showComic, setShowComic] = useState(false);

  useEffect(() => {
    const fetchdata = async () => {
      const response = await axios.get(
        `http://localhost:3100/character-comic/${id}`
      );
      setData(response.data);
      setIsLoading(false);
    };
    fetchdata();
  }, [id]);
  // modal appers
  const handleComicClick = (data) => {
    setComicData(data);
    setShowComic(true);
  };
  let src;
  if (!isLoading) {
    src = `${data.thumbnail.path}.${data.thumbnail.extension}`;
  }
  const regex = /available/;
  let pictureMissing = regex.test(src);

  return (
    <>
      {isLoading ? (
        <IsLoading />
      ) : (
        <div className="CharacterDetailPage">
          <div>
            {pictureMissing === true || data.thumbnail.extension === "gif" ? (
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuBzStwoUGsRHFFvRMIouit-_UH2s8Ahim-Q&usqp=CAU"
                alt="top secret"
              ></img>
            ) : (
              <img src={src} alt={data.name} />
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
                const regex = /available/;
                let pictureComicMissing = regex.test(srcComic);
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
            <img
              src="https://i.pinimg.com/originals/fc/36/20/fc36203a28a4b8c7bd3654dcae771645.jpg"
              alt=""
            />
          </div>
          {showComic ? (
            <ShowComic
              user={props.user}
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
