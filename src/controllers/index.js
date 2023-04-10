const login = require('./controller-login');
const register = require('./controller-register');
const home = require('./controller-home');
const profile = require('./controller-profile');
const karyawan = require('./controller-karyawan');
const crud = require('./controller-crud');
const { request } = require('express');
require('dotenv').config();


module.exports ={
	login,
	register,
	home,
	profile,
	karyawan,
	request,
	crud
};