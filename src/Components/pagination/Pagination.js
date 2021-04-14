import PaginationPage from "./PaginationPage";
import SelectInput from "./SelectInput";

const Pagination = (props) => {
  // props for page CharacterPage
  const {
    searchCharacter,

    limitCharacter,
    setSearchCharacter,
    setLimitCharacter,
    setSkipCharacter,
  } = props;
  // props for ComicPage
  const {
    searchComic,

    limitComic,
    setSearchComic,
    setLimitComic,
    setSkipComic,
  } = props;
  //  other props
  const { text, count, type } = props;

  const handleSearchCharacterChange = (event) =>
    setSearchCharacter(event.target.value);
  const handleLimitCharacterChange = (event) => {
    setLimitCharacter(event.value);
  };

  const handleSearchComicChange = (event) => setSearchComic(event.target.value);
  const handleLimitComicChange = (event) => {
    setLimitComic(event.value);
  };

  let countPage;
  if (type === "Characters") {
    countPage = count / limitCharacter;
  }
  if (type === "Comics") {
    countPage = count / limitComic;
  }
  countPage = countPage.toFixed(0);
  return (
    <div className="Pagination">
      {type === "Characters" ? (
        <div>
          <div>
            <label>{text} : </label>
            <input
              type="text"
              value={searchCharacter}
              onChange={handleSearchCharacterChange}
            />
          </div>

          <div title="Nombre de fiche par page ">
            <SelectInput
              limitValue={limitCharacter}
              handleSetLimit={handleLimitCharacterChange}
            />
          </div>
          <p>
            <span>page : {countPage}</span> <span>resultat : {count}</span>
          </p>
        </div>
      ) : (
        ""
      )}

      {type === "Comics" ? (
        <div>
          <div>
            <label>{text} : </label>
            <input
              type="text"
              value={searchComic}
              onChange={handleSearchComicChange}
            />
          </div>

          <div title="Nombre de fiche par page ">
            <SelectInput
              limitValue={limitComic}
              handleSetLimit={handleLimitComicChange}
            />
          </div>
          <p>
            <span>page : {countPage}</span> <span>resultat : {count}</span>
          </p>
        </div>
      ) : (
        ""
      )}
      <PaginationPage
        type={type}
        setSkipComic={setSkipComic}
        setSkipCharacter={setSkipCharacter}
        countPage={countPage}
      />
    </div>
  );
};

export default Pagination;
