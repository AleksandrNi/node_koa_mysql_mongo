const stream = require('stream');

class AddLineNumberStream extends stream.Transform {
  constructor(options) {
    super(options);
    this.buffer = '';
    this.objBody = '';
  }

  _transform(chunk, encoding, callback) {
   
    let str = this.buffer + chunk.toString('utf-8');
    
      let objBegin = str.indexOf('{"settings');

      if( ~objBegin && objBegin != 0 ) {
        str = '[' + str.slice(objBegin); 
      }

    let objEnd = str.indexOf('LibraryThing.bookAPI' , objBegin + 1);

    if( ~objEnd ) {
      str = str.slice(0, objEnd -1) + ']';
      this.objBody = str;
    };

    this.buffer = str;
    
    callback(null, Buffer.from(this.objBody));
    this.objBody = '';
  }
}

module.exports = AddLineNumberStream;
