import { useState } from 'react';
import './Themes.css';
import Switch from '@mui/material/Switch';

function Themes(props) {
  const [theme, setTheme] = useState('light-theme');
  function onSwitchHandler() {
    setTheme((prevTheme) => {
      if (prevTheme === 'light-theme') {
        return 'dark-theme';
      } else return 'light-theme';
    });
  }
  return (
    <div className={theme}>
      <label>Switch Theme</label>
      <Switch style={{ marginBottom: 0 }} onClick={onSwitchHandler} />
      {props.children}
    </div>
  );
}

export default Themes;
