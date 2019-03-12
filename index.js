const app = require('./app');
const config = require('config');
const port = config.get('port');

app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`);
});
