import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHistory } from "react-router-dom";

const Poster = (props) => {
  let history = useHistory();
  const { src, name, description, gif, id } = props;
  if (!name && !description) {
    // alert("name et description existe pas ");
  }
  const regex = /available/;
  let pictureMissing = regex.test(src);
  return (
    <div
      className="Poster"
      onClick={() => history.push(`Character-detail-page/${id}`)}
    >
      <div>
        <div
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
      <FontAwesomeIcon className="favored" icon="star" />
      {description ? (
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
