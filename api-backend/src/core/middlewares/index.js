const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');

export const initialMiddlewares = async (app) => {
	if (process.env.NODE_ENV == 'development') app.use(morgan('dev'));
	app.use(helmet());
	app.use(cookieParser());
	app.use('/api/upload', express.static(path.resolve(process.env.BASE_DIR, '../', 'public')));
	app.use(express.urlencoded({ extended: true }));
	app.use(express.json());
	app.use(
		cors({
			credentials: true,
			origin: true,
			methods: 'GET,HEAD,PUT,POST,DELETE',
			optionsSuccessStatus: 200,
			allowedHeaders: ['Content-Type', 'cache-control'],
		}),
	);

	return true;
};
