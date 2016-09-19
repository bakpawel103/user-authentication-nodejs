# Nodejs user authentication sample base on json web token #

[![Build Status](https://travis-ci.org/weihanchen/User_Authentication_Nodejs.svg?branch=master)](https://travis-ci.org/weihanchen/User_Authentication_Nodejs)
[![Dependency Status](https://david-dm.org/weihanchen/NodeJS_User_Authentication.svg)](https://david-dm.org/weihanchen/NodeJS_User_Authentication)
[![devDependencies Status](https://david-dm.org/weihanchen/NodeJS_User_Authentication/dev-status.svg)](https://david-dm.org/weihanchen/NodeJS_User_Authentication?type=dev)

A nodejs server api for user authentication
## Requirement ##
* [MongoDB](https://www.mongodb.com/) - Our Database
* [Expressjs](http://expressjs.com/zh-tw/) - API Server
* [Nodejs](https://nodejs.org/en/) - Backend Framework
* [NPM](https://www.npmjs.com/) - Package Management

## Install nodejs dependence packages ##
>1. npm install
>2. node run.js 

This is simple demo of user authentication and account registration, use node js、express、mongodb to complete.

## Config ##
>1. config/database.js - database and jwt secret configuration
>2. secret - jwt auth secret
>3. database - database connection

## Packages ##
>1. [Mongoose](http://mongoosejs.com/) - mongodb object modeling
>2. [Simple JWT](https://www.npmjs.com/package/jwt-simple) - token use
>3. [Morgan](https://github.com/expressjs/morgan) - HTTP request logger middleware for node.js
>4. [moment](http://momentjs.com/docs/) - date parse

## Routing ##
* **api** - api root

* **api/initialize**

  ` post - create roles and admin user`

* **api/users**

  ` post - create new user and password hash`


* **api/users/login**

	`post - login and get jwt token`

* **api/users/me**

	`get - get current user info`

* **api/users/:id**

	`delete - delete user`

## API Test ##
* npm install --dev
* npm run test
