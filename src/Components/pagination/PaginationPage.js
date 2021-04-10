import ReactPaginate from "react-paginate";

const PaginationPage = (props) => {
  const { countPage, type, setSkipComic, setSkipCharacter } = props;
  const handlePageChange = (event) => {
    if (type === "Characters") {
      setSkipCharacter(event.selected);
    } else {
      setSkipComic(event.selected);
    }
  };
  return (
    <div className="PaginationPage">
      <ReactPaginate
        previousLabel={"précedent"}
        nextLabel={"suivant"}
        breakLabel={"..."}
        breakClassName={"break-me"}
        pageCount={countPage}
        marginPagesDisplayed={3}
        initialPage={0}
        pageRangeDisplayed={2}
        onPageChange={(event) => handlePageChange(event)}
        containerClassName={"pagination"}
        activeClassName={"active"}
      />
    </div>
  );
};
export default PaginationPage;
