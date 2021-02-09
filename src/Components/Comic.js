import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Comic = (props) => {
  const { src, title, description, iconOnClick } = props;

  const regex = /available/;
  let pictureMissing = regex.test(src);

  return (
    <div className="Comic">
      <p>
        <FontAwesomeIcon
          className="favored"
          icon="star"
          onClick={iconOnClick}
        />
        {!description || description === "Non autorisé" ? (
          <span>Classified</span>
        ) : (
          <span>Déclassified</span>
        )}

        {title}
      </p>
      <div>
        <img
          src={
            pictureMissing === true
              ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuBzStwoUGsRHFFvRMIouit-_UH2s8Ahim-Q&usqp=CAU"
              : src
          }
          style={
            pictureMissing === true
              ? { borderRadius: "50%" }
              : { borderRadius: 20 }
          }
          alt={title}
        />
        {!description ? (
          <p className="hidden"></p>
        ) : (
          <p className="hidden boxShadow"> {description} </p>
        )}
      </div>
    </div>
  );
};

export default Comic;
