import { useState } from "react";

const ShowComic = ({ data, setShowComic, setComicData, isLoading, user }) => {
  const [check, setCheck] = useState("");

  const src = `${data.thumbnail.path}.${data.thumbnail.extension}`;
  const regex = /available/;
  let pictureMissing = regex.test(src);

  const handleCheckChange = (event) => setCheck(event.target.value);
  return (
    <>
      {isLoading ? (
        ""
      ) : (
        <div className="ShowComic slide-in-blurred-left">
          <div>
            <div>
              {pictureMissing === true || data.thumbnail.extension === "gif" ? (
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuBzStwoUGsRHFFvRMIouit-_UH2s8Ahim-Q&usqp=CAU"
                  alt="top-secret"
                ></img>
              ) : (
                <img src={src} alt={data.title} />
              )}
            </div>

            <p>{data.title}</p>
            <input
              type="text"
              placeholder="Autorisation = Utilisateur"
              value={check}
              onChange={handleCheckChange}
            />
            {check === user && check !== "" ? (
              <p>
                {data.description === null ? (
                  <p style={{ color: "crimson" }}>
                    Désolé il vous faut une accréditation de niveaux 1 😜
                  </p>
                ) : (
                  <p>{data.description}</p>
                )}
              </p>
            ) : (
              <p style={{ color: "crimson" }}>
                Non authorisé <br />
                Authentifiez-vous !
              </p>
            )}

            <span
              onClick={() => {
                setShowComic(false);
                setComicData("");
              }}
            >
              Fermer
            </span>
            {data.description === null ? (
              <b>Accreditation de niveaux 1</b>
            ) : (
              <b>Accreditation de niveaux 2</b>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ShowComic;
