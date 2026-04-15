import "./Pagination.scss";

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  const pageSize = 3;
  const currentGroup = Math.ceil(currentPage / pageSize);
  const totalGroups = Math.ceil(totalPages / pageSize);

  const start = (currentGroup - 1) * pageSize + 1;
  const end = Math.min(currentGroup * pageSize, totalPages);

  const pages = [];
  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  return (
    <div className="pagination">
      <button
        className="arrow"
        onClick={() => onPageChange(start - 1)}
        disabled={currentGroup === 1}
      >
        &lt;
      </button>

      {pages.map((page) => (
        <button
          key={page}
          className={`page ${currentPage === page ? "active" : ""}`}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}

      {currentGroup < totalGroups && (
        <>
          <span className="dots">...</span>
          <button className="page" onClick={() => onPageChange(totalPages)}>
            {totalPages}
          </button>
        </>
      )}

      <button
        className="arrow"
        onClick={() => onPageChange(end + 1)}
        disabled={currentGroup === totalGroups}
      >
        &gt;
      </button>
    </div>
  );
}
