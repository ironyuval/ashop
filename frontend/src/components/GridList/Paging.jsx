const Paging = ({ currentPage, handleChange, lastPage }) => {
  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination justify-content-center p-0 m-0">
        <li className={`page-item ${currentPage === 1 && `disabled`}`}>
          <a
            onClick={() => handleChange(currentPage - 1)}
            className="page-link"
            href="#"
            tabIndex="-1"
          >
            Previous
          </a>
        </li>
        <li className={`page-item ${currentPage === 1 && `disabled`}`}>
          <a
            onClick={() =>
              handleChange(currentPage === 1 ? currentPage : currentPage - 1)
            }
            className="page-link"
            href="#"
          >
            {currentPage === 1 ? currentPage : currentPage - 1}
          </a>
        </li>
        <li className={`page-item ${currentPage !== 1 && `disabled`}`}>
          <a
            onClick={() => handleChange(currentPage + 1)}
            className="page-link"
            href="#"
          >
            {currentPage === 1 ? currentPage + 1 : currentPage}
          </a>
        </li>
        <li className={`page-item ${currentPage === lastPage && `disabled`}`}>
          <a
            onClick={() => handleChange(currentPage + 1)}
            className="page-link"
            href="#"
          >
            {currentPage === 1 ? currentPage + 2 : currentPage + 1}
          </a>
        </li>
        <li className={`page-item ${currentPage === lastPage && `disabled`}`}>
          <a
            className="page-link"
            onClick={() => handleChange(currentPage + 1)}
            href="#"
          >
            Next
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Paging;
