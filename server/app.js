const express = require('express');
const cors = require('cors');

const app = express();
const port = 5000;
app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const indexRouter = require('./routes/index-routes');
const queryHistoryRouter = require('./routes/queryhistory-routes');

app.use('/api/search-history', queryHistoryRouter);
app.use('/', indexRouter);

app.listen(port, () => console.log(`Server is running on port: ${port}`));
