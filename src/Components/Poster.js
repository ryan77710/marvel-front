import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Poster = (props) => {
  let history = useHistory();
  const {
    src,
    name,
    description,
    gif,
    id,
    iconOnClick,
    delay,
    checkPictureMissing,
  } = props;

  let pictureMissing = checkPictureMissing(src);

  return (
    <div
      className="Poster bounce-in-right"
      style={{ animationDelay: `${delay}s` }}
    >
      <div>
        <div className="container">
          <div
            onClick={() => history.push(`Character-detail-page/${id}`)}
            className="Poster-img kenburns-top"
            style={
              pictureMissing === true || gif === "gif"
                ? {
                    backgroundImage: `url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuBzStwoUGsRHFFvRMIouit-_UH2s8Ahim-Q&usqp=CAU)`,
                    opacity: "0.5",
                  }
                : { backgroundImage: `url(${src})` }
            }
          ></div>
        </div>

        <div className={description && "hiden scale-in-hor-center"}>
          <p>{description}</p>
        </div>
      </div>
      <p>{name}</p>

      <FontAwesomeIcon
        className="favored"
        icon="star"
        onClick={iconOnClick}
        title="click slowly for avoid bug
        "
      />
      {description && description !== "Non autorisé" ? (
        <span title="Déclassified" className="déclassified">
          D
        </span>
      ) : (
        ""
      )}
    </div>
  );
};

export default Poster;
