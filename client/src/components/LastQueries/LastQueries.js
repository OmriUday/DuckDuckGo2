import './LastQueries.css';

const LastQueries = ({ lastQueries, updateSearchField }) => {
  return (
    <div className='lastQueries'>
      <h2>
        Search <br />
        History
      </h2>
      <ul>
        {lastQueries &&
          lastQueries.map((query, i) => (
            <li key={i}>
              <button
                className='queriesHistoryBtn'
                onClick={() => updateSearchField(query)}>
                {query}
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default LastQueries;
