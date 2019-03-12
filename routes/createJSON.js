const fs = require('fs');
const stream = require('stream');
const path = require('path');
const config = require('config');
const streamTransform = require(path.join(config.get('workersRoot'), '02createJSONstreamTransform.js'));

exports.get = async function(ctx, next) {
// creat 300 files with 400 objects each.
ctx.session = ctx.session || {};
ctx.session.file = ctx.session.file || {};
ctx.session.file.number = ctx.session.file.number++ || 0;

let name = `filtered.${ctx.session.file.number}.json`;

ctx.session.file.name = name;

      // open raw json, transform, and save as filtered.json
      const fileIn = await fs.createReadStream(path.join(config.get('publicRoot'), 'rawJsonFile.json'));
      const jsonObject = new streamTransform();
      const fileOut = await fs.createWriteStream(path.join(config.get('publicRoot'),'filtered', name));


      stream.pipeline(
        fileIn, jsonObject, fileOut, 
        (err) => {
          if (err) console.log(err);
          else console.log('filtered.json saved!');
          
        }
      );

  await next();

};


