import Pagination from "react-js-pagination";
import PropTypes from "prop-types";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

const PaginationPage = ({ resPerPage, filteredProductsCount }) => {
  let [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);

  const page = Number(searchParams.get("page") || 1);

  useEffect(() => {
    setCurrentPage(page);
  }, [page]);

  const setCurrentPageNo = (pageNumber) => {
    setCurrentPage(pageNumber);

    if (searchParams.has("page")) {
      searchParams.set("page", pageNumber);
    } else {
      searchParams.append("page", pageNumber);
    }
    const path = window.location.pathname + "?" + searchParams.toString();
    navigate(path);
  };
  return (
    <div className="pagination">
      <Pagination
        activePage={currentPage}
        itemsCountPerPage={resPerPage}
        totalItemsCount={filteredProductsCount}
        pageRangeDisplayed={5}
        onChange={setCurrentPageNo}
      />
    </div>
  );
};

PaginationPage.propTypes = {
  itemsCountPerPage: PropTypes.number,
  activePage: PropTypes.number,
  resPerPage: PropTypes.number,
  filteredProductsCount: PropTypes.number,
};

export default PaginationPage;
