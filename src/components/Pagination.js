import React from "react";

const Pagination = (props) => {
  const {
    postsPerPage,
    totalPosts,
    paginate,
    firstPage,
    prevPage,
    nextPage,
    lastPage,
    currentPage,
  } = props;

  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <nav className="pagination">
      {/* first page */}
      <li className="page-item mx-1">
        {currentPage === 1 ? (
          <button type="button" className="btn btn-secondary" disabled>
            &lt;&lt;
          </button>
        ) : (
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => firstPage()}
          >
            &lt;&lt;
          </button>
        )}
      </li>
      {/* prev page */}
      <li className="page-item mx-1">
        {currentPage === 1 ? (
          <button type="button" className="btn btn-secondary" disabled>
            &lt;
          </button>
        ) : (
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => prevPage()}
          >
            &lt;
          </button>
        )}
      </li>
      {/* list of page */}
      {pageNumbers.map((pgNum) => (
        <li key={pgNum} className="page-item mx-1">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => paginate(pgNum)}
          >
            {pgNum}
          </button>
        </li>
      ))}
      {/* next page */}
      <li className="page-item mx-1">
        {currentPage === Math.ceil(totalPosts / postsPerPage) ? (
          <button className="btn btn-secondary" disabled>
            &gt;
          </button>
        ) : (
          <button className="btn btn-primary" onClick={() => nextPage()}>
            &gt;
          </button>
        )}
      </li>
      {/* last page */}
      <li className="page-item mx-1">
        {currentPage === Math.ceil(totalPosts / postsPerPage) ? (
          <button className="btn btn-secondary" disabled>
            &gt;&gt;
          </button>
        ) : (
          <button className="btn btn-primary" onClick={() => lastPage()}>
            &gt;&gt;
          </button>
        )}
      </li>
    </nav>
  );
};

export default Pagination;
