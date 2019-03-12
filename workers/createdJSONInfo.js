const fs = require('fs');
const path = require('path');
const config = require('config');
const mime  = require('mime-types');
const File = require('../models/file');

exports.get = async function(ctx) {

  let name = ctx.session.file.name;
  let type = mime.lookup(path.join(config.get('publicRoot'),'filtered', name));
  let size =  getFilesizeInBytes(path.join(config.get('publicRoot'),'filtered', name));

      
  console.log(   name   );
  console.log(   type   );
  console.log(   size   );

  const file = new File({
        fileName: name,
        mime: type,
        size: size
    });
  await file.save()
  .then(result => console.log(result))
  .catch(err => {
    if(err.name == 'ValidationError') {
      console.log('ERROR: '+ err.errors.fileName.message);
    } else {
      console.error(err)
    };
  });



};

// get filesize // doesn't work with for windows
function getFilesizeInBytes(filename) {
    let stats = fs.statSync(filename);
    let fileSizeInBytes = stats["size"]

    return fileSizeInBytes
};