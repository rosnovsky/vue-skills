const cors = require('cors');
const morgan = require('morgan');
const express = require('express');
const bodyParser = require('body-parser');
const { sequelize } = require('./models');
const config = require('./config/config');

const app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());

require('./routes')(app);

sequelize.sync().then(() => {
  app.listen(config.port);
  // We console.log the fact that the server is running and on what port.
  // Linter will complain about console.log unless we disable lint for the next line.
  // Remove next 2 lines if you don't need server status/port information in the console anymore.
  // eslint-disable-next-line
  console.log(`Server is running on ${config.port}`);
});
