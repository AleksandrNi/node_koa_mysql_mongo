const config = require('config');

// paste MySQL params
const mysql = require('mysql');
const pool = mysql.createPool(config.get('dbConfigMysql'));
const util = require('util');
pool.query = util.promisify(pool.query);

exports.get = async function(ctx, next) {

	try {

/*	  const dropbooksTable = await pool.query("DROP TABLE books");*/
	  const createBooksTable = await pool.query("CREATE TABLE IF NOT EXISTS books (id serial, title VARCHAR(255) NOT NULL, date VARCHAR(100) NOT NULL, author VARCHAR(100) NOT NULL, description VARCHAR(255) NOT NULL, isbn bigint, image VARCHAR(255) NOT NULL, PRIMARY KEY (id), UNIQUE (isbn));");
/*	  const createRawsCount = await pool.query("SELECT COUNT(*) FROM books");*/
/*		await pool.query("DROP INDEX title_idx;");*/
//create index your_index_name on your_table_name(your_column_name) using BTREE;
		await pool.query("CREATE INDEX title_BTREE ON books (title) using BTREE;");
		await pool.query("CREATE INDEX author_BTREE ON books (author) using BTREE;");
		await pool.query("CREATE INDEX description_BTREE ON books (description) using BTREE;");


	  console.log('db books created');

	} catch (err) { 
		console.error( err );
		console.error('sth wrong with creating db and uploading data');
	  ctx.status = 500;
	  ctx.body = 'Intermal server error';    
	}  


	await next();
};