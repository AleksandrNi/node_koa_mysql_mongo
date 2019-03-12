const config = require('config');
const path = require('path');
const JsonToTable = require(path.join(config.get('workersRoot'), 'jsonToTable.js'));
const _ = new JsonToTable();

// paste MySQL params
const mysql = require('mysql');
const pool = mysql.createPool(config.get('dbConfigMysql'));
const util = require('util');
pool.query = util.promisify(pool.query);

exports.post = async function(ctx) {
	let resMessage = [];
	let tableCheck;
	let selector;
	let whereQuery;
	let offsetValue = '';
	let tempLimit;
	ctx.session.queryParams = ctx.session.queryParams || {};

	try {
		const request = ctx.request.body;
		for (let reqKey in request ) {

			if(reqKey == 'select2' && !request[reqKey] && !request['select1']) {

				resMessage.push({message:'You should fill block #1'});
			} else if(reqKey == 'select2' && !request[reqKey]) {

				selector = request['select1'];
			} else if (reqKey == 'select2') {

				selector = `${request['select1']}, ${request['select2']}`;
			};

			if(reqKey == 'orderBy' && request[reqKey]) {
				request[reqKey] = `ORDER BY ${request.orderBy}`;

			};

			if(reqKey == 'queryLimit' && request[reqKey]) {
				tempLimit = parseInt(request[reqKey]);
				request[reqKey] = `LIMIT ${request[reqKey]}`; 
			}

			if(reqKey == 'sorting' && request[reqKey]){
				if (!request['orderBy']){
					resMessage.push({"message": "If You wanna sort results You should fill out block #3. Or clear it"});

				};
			}
		}

		if(request.select3 == 'isbn' &&  request.select4  && request.input && parseInt(request.input)) {

			whereQuery = `WHERE ${request.select3 } ${request.select4} ${request.input.trim()}`;

		} else if(request.select3 && request.select3 != 'isbn'&& request.select4 && request.input ) {

			whereQuery = `WHERE ${request.select3 } ${request.select4} '%%${request.input.trim()}%%'`;

		} else if (!request.select3 && !request.select4 && !request.input ) { 

			whereQuery = '';
		} else {
			whereQuery = '';
			resMessage.push({"message": "You should check your data in block #3"});
		};

			const counterString = `SELECT COUNT(*) FROM books ${whereQuery};`;
			let counter = await pool.query(counterString);
console.log('=== query 72 await pool.query(counterString); ====');
console.log(	counter[0]['COUNT(*)']	);
			counter = parseInt(counter[0]['COUNT(*)']);

		// clean query without problems
		if(!resMessage.length) {
			let checkObject = selector+whereQuery+request.orderBy+request.sorting;
			if (ctx.session.queryParams.checkObject == checkObject ) {

				if(request.buttonValue === 'next' && (counter >= ctx.session.queryParams.queryCount*tempLimit) && (counter <= ctx.session.queryParams.queryCount*tempLimit + tempLimit) ) {

					++ctx.session.queryParams.queryCount;
					offsetValue = `OFFSET ${ctx.session.queryParams.queryCount}`;
					resMessage =  {message: 'Limit exceeded', table: '' };
				} else if(request.buttonValue === 'next' && (counter <= ctx.session.queryParams.queryCount*tempLimit + tempLimit) ) {
					
					offsetValue = `OFFSET ${ctx.session.queryParams.queryCount}`;
					resMessage =  {message: 'Nothing happened', table: '' };
				} else if(request.buttonValue === 'next' && (counter >= ctx.session.queryParams.queryCount*tempLimit) ) {
					
					++ctx.session.queryParams.queryCount;
					offsetValue = `OFFSET ${ctx.session.queryParams.queryCount}`;
				} else if(request.buttonValue === 'prev' && ctx.session.queryParams.queryCount > 0 ) {

					--ctx.session.queryParams.queryCount;
					offsetValue = `OFFSET ${ctx.session.queryParams.queryCount}`;

				} else if (!request.buttonValue) {

					// Means the same query. pushed button 'MAKE QUERY'
					ctx.session.queryParams.queryCount = 0;

				}

			} else {
				ctx.session.queryParams = {
					selector:selector,
					where:whereQuery,
					order:request.orderBy,
					sorting: request.sorting,
					queryLimit: tempLimit,
					buttonValue: request.buttonValue,
					counter: counter,
					queryCount:0,	
					checkObject: checkObject,				
				};
			};
			
			const queryString = `SELECT ${selector} FROM books ${whereQuery} ${request.orderBy} ${request.sorting} ${request.queryLimit} ${offsetValue};`

			const result = await pool.query(queryString);

console.log('===query 124 await pool.query(queryString); ===');
console.log(	result		);
			if(!result.length) {
				resMessage =  {message: 'Rows not found', table: '' };	
				tableCheck = true;

			} else {
				let tableString = _.jsonToTable(result);
				
				resMessage =  {
					message: resMessage.message ||'All fine', 
					counter: counter,
					page: ctx.session.queryParams.queryCount,
					pages: Math.ceil(counter/tempLimit) || 0,
					table: tableString,
				};
				tableCheck = true;	
			}
		} ;

		ctx.body =  {
			table: tableCheck,
			result: resMessage,	
		};

	} catch (err) { 
			console.error(err);
			ctx.body = 'Internal server error';
			ctx.status = 500;
		};

};


