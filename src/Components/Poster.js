import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHistory } from "react-router-dom";

const Poster = (props) => {
  let history = useHistory();
  const { src, name, description, gif, id, iconOnClick } = props;

  const regex = /available/;
  let pictureMissing = regex.test(src);
  return (
    <div className="Poster">
      <div>
        <div
          onClick={() => history.push(`Character-detail-page/${id}`)}
          className="Poster-img"
          style={
            pictureMissing === true || gif === "gif"
              ? {
                  backgroundImage: `url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuBzStwoUGsRHFFvRMIouit-_UH2s8Ahim-Q&usqp=CAU)`,
                  opacity: "0.5",
                }
              : { backgroundImage: `url(${src})` }
          }
        ></div>
        <div className={description && "hiden"}>
          <p>{description}</p>
        </div>
      </div>
      <p>{name}</p>

      {/* // click slowly for avoid bug */}

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
