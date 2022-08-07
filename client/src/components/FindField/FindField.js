import './FindField.css';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';

const FindField = ({ onFindFieldChange, appearancesCount }) => {
  return (
    <div className='findFieldWrap'>
      <Paper
        className='findFieldBox'
        component='form'
        sx={{
          p: '0.125rem 0.25rem',
          display: 'flex',
          alignItems: 'center',
          width: 200,
          height: 20,
        }}>
        <InputBase
          className='findFieldInput'
          sx={{ ml: 2, flex: 1 }}
          placeholder='Find'
          onChange={(e) => onFindFieldChange(e.target.value)}
          inputProps={{ 'aria-label': 'search google maps' }}
        />
      </Paper>
      {appearancesCount === null ? (
        <span> </span>
      ) : (
        <span className='appearancesCount'>{appearancesCount} appearances</span>
      )}
    </div>
  );
};

export default FindField;
