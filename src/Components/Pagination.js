const Pagination = (props) => {
  // props for page CharacterPage
  const { search1, skip1, limit1, setSearch1, setLimit1, setSkip1 } = props;
  // props for ComicPage
  const { search2, skip2, limit2, setSearch2, setLimit2, setSkip2 } = props;

  const { text, count } = props;
  const handleSearch1Change = (event) => setSearch1(event.target.value);
  const handleLimit1Change = (event) => setLimit1(event.target.value);
  const handleSkip1Change = (event) => setSkip1(event.target.value);

  const handleSearch2Change = (event) => setSearch2(event.target.value);
  const handleLimit2Change = (event) => setLimit2(event.target.value);
  const handleSkip2Change = (event) => setSkip2(event.target.value);

  let countPage;
  if (props.for === "Characters") {
    countPage = count / limit1;
  }
  if (props.for === "Comics") {
    countPage = count / limit2;
  }
  countPage = countPage.toFixed(0);
  return (
    <div className="Pagination">
      {props.for === "Characters" ? (
        <div>
          <div>
            <label>{text} : </label>
            <input type="text" value={search1} onChange={handleSearch1Change} />
          </div>
          <div>
            <label>Page : </label>
            <input
              type="number"
              value={skip1}
              onChange={handleSkip1Change}
              min="0"
            />
          </div>
          <div title="Nombre de fiche par page ">
            <label>Limit : </label>
            <input
              type="number"
              value={limit1}
              onChange={handleLimit1Change}
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

      {props.for === "Comics" ? (
        <div>
          <div>
            <label>{text} : </label>
            <input type="text" value={search2} onChange={handleSearch2Change} />
          </div>
          <div>
            <label>Page : </label>
            <input
              type="number"
              value={skip2}
              onChange={handleSkip2Change}
              min="0"
            />
          </div>
          <div title="Nombre de fiche par page ">
            <label>Limit : </label>
            <input
              type="number"
              value={limit2}
              onChange={handleLimit2Change}
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
    </div>
  );
};

export default Pagination;
