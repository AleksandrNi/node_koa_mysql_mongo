=========== NODE_KOA_MySQL_MONGO ==============

How to:

connect db => config/default.js

routes
1. '/createjson'
//make request to different url to receive not valid json
//create valid json files from not valid json, result in.public/filtered

2.'/uploaddb' 
//create postgresql table and upload data there from json files (/public/filtered)
information about created file saved into MongoDB for a while it'll upload in MySQL, then information about the file will be deleted.

3. '/'
client interface 
// form to make request with custom params
// form to make update row

4. '/query'
// compile request from ctx.request.body to db and sendback answer 

5. '/update'
//update rows in db
