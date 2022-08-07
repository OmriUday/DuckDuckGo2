import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './SearchPage.css';
import logo from '../assets/duckduckgo-icon-13.jpg';
import Pagination from '@mui/material/Pagination';
import { fetchDataAction } from '../store/actions/DataAction';
import SearchField from '../components/SearchField/SearchField';
import LastQueries from '../components/LastQueries/LastQueries';
import SearchResults from '../components/SearchResults/SearchResults';

const SearchPage = () => {
  const LIMIT = 7;
  const [searchText, setSearchText] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [offset, setOffset] = useState((currentPage - 1) * LIMIT);
  const [lastSearchQueries, setLastSearchQueries] = useState([]);

  const resultData = useSelector((state) => state.data);

  const dispatch = useDispatch();

  useEffect(() => {
    try {
      const getQueryHistory = async () => {
        const response = await fetch(
          'http://localhost:5000/api/search-history',
        );
        const data = await response.json();
        await setLastSearchQueries(JSON.parse(data).queries);
      };
      getQueryHistory();
    } catch (error) {
      console.log(error);
    }
  }, [resultData, currentPage]);

  const saveHistory = async () => {
    try {
      await fetch('http://localhost:5000/api/search-history', {
        method: 'POST',
        body: JSON.stringify({ queries: lastSearchQueries }),
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const paginate = async (pageNumber) => {
    if (pageNumber === currentPage) return;

    await dispatch(
      fetchDataAction({
        searchText: searchText,
        limit: LIMIT,
        offset: (pageNumber - 1) * LIMIT,
      }),
    );
  };

  const updateSearchField = async (value) => {
    setCurrentPage(1);
    await setSearchText(value);
    await dispatch(
      fetchDataAction({
        searchText: value,
        limit: LIMIT,
        offset,
      }),
    );
  };

  const handleSubmitSearch = async (e) => {
    e.preventDefault();
    await saveHistory();
    if (lastSearchQueries.includes(searchText)) {
      await lastSearchQueries.splice(lastSearchQueries.indexOf(searchText), 1);
    }
    await lastSearchQueries.push(searchText);

    setCurrentPage(1);

    await dispatch(
      fetchDataAction({
        searchText: searchText,
        limit: LIMIT,
        offset,
      }),
    );
    await saveHistory();
  };

  return (
    <div className='searchPage'>
      <header>
        <img className='logo' src={logo} alt='Logo' />
        <h1>DuckDuckGo</h1>
        <SearchField
          searchText={searchText}
          setSearchText={setSearchText}
          handleSubmitSearch={handleSubmitSearch}
        />
        <p className='numberOfResults'>
          {resultData
            ? `Total search results found: (${resultData.originalResultSize})`
            : ' '}
        </p>
      </header>
      <main>
        {lastSearchQueries.length > 0 && (
          <LastQueries
            updateSearchField={updateSearchField}
            lastQueries={lastSearchQueries}
          />
        )}
        {resultData && <SearchResults data={resultData.result} />}
      </main>
      <footer>
        {resultData && searchText !== '' && (
          <Pagination
            count={Math.ceil(resultData.originalResultSize / LIMIT) || 1}
            page={currentPage}
            siblingCount={0}
            boundaryCount={2}
            onChange={(event, number) => {
              event.preventDefault();
              setCurrentPage(number);
              paginate(number);
            }}
            shape='rounded'
            variant='outlined'
            color='primary'
          />
        )}
      </footer>
    </div>
  );
};

export default SearchPage;
