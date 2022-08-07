import './SearchField.css';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

const SearchField = ({
  searchText = '',
  handleSubmitSearch,
  setSearchText,
}) => {
  return (
    <Paper
      component='form'
      sx={{
        p: '0.125rem 0.25rem',
        display: 'flex',
        alignItems: 'center',
        width: 450,
      }}>
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        placeholder='Search here..'
        inputProps={{ 'aria-label': 'search google maps' }}
      />
      <IconButton
        onClick={(e) => handleSubmitSearch(e)}
        type='submit'
        sx={{ p: '0.6rem' }}
        aria-label='search'>
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};

export default SearchField;
