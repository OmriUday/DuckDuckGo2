import './MyPagination.css';

const MyPagination = ({ currentPage, itemsCount, limit, paginate }) => {
  const totalPages = Math.ceil(itemsCount / limit);
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const prev = () => {
    if (currentPage === 1) return;
    paginate(currentPage - 1);
  };

  const next = () => {
    if (currentPage === totalPages) return;
    paginate(currentPage + 1);
  };
  return (
    <div className='paginationWrap'>
      <ul className='pagination'>
        <li className='prevWrap'>
          <a
            className={`prev ${currentPage === 1 ? 'unclickable' : ''}`}
            onClick={() => prev()}
            href='!#'>
            prev
          </a>
        </li>
        {pageNumbers.map((number) => (
          <li key={number} className='pageItem'>
            <a
              className={`page-link ${
                number === currentPage ? 'selected' : ''
              }`}
              onClick={() => paginate(number)}
              href='!#'>
              {number}
            </a>
          </li>
        ))}
        <li className='nextWrap'>
          <a
            className={`next ${
              currentPage === totalPages ? 'unclickable' : ''
            }`}
            onClick={() => next()}
            href='!#'>
            next
          </a>
        </li>
      </ul>
    </div>
  );
};

export default MyPagination;
