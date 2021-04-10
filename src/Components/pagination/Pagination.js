import PaginationPage from "./PaginationPage";

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
  const handleLimitCharacterChange = (event) =>
    setLimitCharacter(event.target.value);

  const handleSearchComicChange = (event) => setSearchComic(event.target.value);
  const handleLimitComicChange = (event) => setLimitComic(event.target.value);

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
            <label>Limit : </label>
            <input
              type="number"
              value={limitCharacter}
              onChange={handleLimitCharacterChange}
              min="1"
              max="100"
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
            <label>Limit : </label>
            <input
              type="number"
              value={limitComic}
              onChange={handleLimitComicChange}
              min="1"
              max="100"
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
