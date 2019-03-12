=========== NODE_KOA_MySQL_MONGO ==============

https://github.com/AleksandrNi/node_koa_mysql_mongo

routes
1. '/createjson'
//make request to different url to receive not valid json
//create valid json files from not valid json, result in.public/filtered

2.'/uploaddb' 
//create mysql table and upload data there from json files (/public/filtered)
information about created file [ name, mime type, size] saved into MongoDB for a while file content [json] will be uploaded in MySQL, then information about the file will be deleted form mongo.

3. '/'
client interface 
// form to make request with custom params
// form to make update row

4. '/query'
// compile request from ctx.request.body to db and sendback answer 

5. '/update'
//update rows in db