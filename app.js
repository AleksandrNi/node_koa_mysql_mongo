const Koa = require('koa');
const Router = require('koa-router');
const config = require('config');
const path = require('path');

const app = new Koa();

require('./handlers/01-favicon').init(app);
require('./handlers/02-static').init(app);
require('./handlers/03-logger').init(app);
require('./handlers/04-templates').init(app);
require('./handlers/05-errors').init(app);
require('./handlers/06-session').init(app);
require('./handlers/07-bodyParser').init(app);


const router = new Router();

//make request to different url to receive not valid json
//create valid json files from not valid json, result in.public/filtered
router.get('/createjson', require('./routes/createJSON.js').get, require(path.join(config.get('workersRoot'), 'createdJSONInfo.js')).get); // create JSON ready to upload to db

//upload data into postgresql from json files
router.get('/uploaddb', require(path.join(config.get('workersRoot'), '03createmysql.js')).get, require('./routes/uploaddb').get); // apload data from JSON to PostgreSQL

//make request with custom params
router.get('/', require('./routes/frontpage').get);

// compile request from ctx.request.body to db and sendback answer 
router.post('/query', require('./routes/query').post);

//update rows in db
router.post('/update', require('./routes/update').post);


app.use(router.routes());

module.exports = app;
