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

=========== NODE_KOA_POSTGRESQL ==============

Тестовое задание для Node.js:
Реализовать http-server на базе фреймворка Koa2, соответствующий следующим требованиям:

1) Работает с базой данных mysql. В субд есть табличка books(1e5 записей, забить самостоятельно случайно, у каждой книги должны быть поля title, date, autor, description, image). Реализация смежных табличек на усмотрение кандидата, архитектурные решения оцениваются.Работает на чистом SQL

2) Присутствуют три контроллера:
  2.1)  Добавляет записи в субд
  2.2)  Отдает. Сделать возможность сортировки|группировки по всем возможным полям, возможность порционного получения с оффсетом
  2.3)  Изменяет

замечание к 2.2 - приветствуются варианты кэширования
https://github.com/AleksandrNi/node_koa_mysql_mongo.git
