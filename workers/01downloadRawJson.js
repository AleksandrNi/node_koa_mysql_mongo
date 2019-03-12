const fs = require('fs');
const path = require('path');
const config = require('config');
const rp = require('request-promise');


exports.get = async function(ctx, next) {
  // save RAW JSON from the source
  let rawJson = await rp('http://www.librarything.com/api_getdata.php?userid=timspalding&showstructure=1&max=400');

  await fs.writeFile(path.join(config.get('publicRoot'), 'rawJsonFile.json'), rawJson, (err) => {  
      // throws an error, you could also catch it here
      if (err) throw err;
  });

	console.info('rawJson saved!');
  await next();
};