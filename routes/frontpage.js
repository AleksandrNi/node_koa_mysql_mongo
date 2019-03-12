const config = require('config');

const bdJsonParams = config.get('bdJsonParams'); 
const qp = config.get('qp'); 


exports.get = async function(ctx) {

/*query.rows*/
try {
	let newbdJsonParams = ['','*', 'id'].concat(bdJsonParams);
  let orderByParams = [''].concat(bdJsonParams);

	ctx.body = ctx.render('welcome.pug', {
        queryParams: newbdJsonParams,
        queryOperators: qp.queryOperators,
        orderByParams: orderByParams,
        queryLimit: qp.queryLimit,
        sorting: qp.sorting,
        message: '',
        result: '',
      });
} catch (err) { 
			console.error(err)
			ctx.body = ctx.render('welcome.pug', {
        message: 'Sorry, something goes wrong'
      });
      ctx.status = 500;
	}
};

