const express = require('express');
const config = require('dotenv').config();
const path = require('path');
const cookieSession = require('cookie-session');
const passport = require('passport');
const morgan = require('morgan');
const fs = require('fs');
const {bigMomentMainRouter} = require('../api/bigmoment/index');
require('../api/bigmoment/v1/auth/passport_setup_google');
require('../api/bigmoment/v1/auth/otp_template');
//const { initialMiddlewares } =require('./middlewares/index');
//const { errorHandlingMiddleware, initializingErrorMonitoring } =require('../lib/sentry');
const { mkdirSync } = require('fs');
const cors = require('cors');
// start application
 const createApp = async () => {
	//*************************************\\  Runtime ENVs  //************************************* */
	process.env.BASE_DIR = path.resolve(__dirname, '../');
	if (!process.env.NODE_ENV) process.env.NODE_ENV = 'development';
	if (!process.env.PORT) process.env.PORT = '3001';
	process.env.UNICONSOLE_MEMBERS_DIRECTORY = path.join(__dirname, '/../../public/uniconsole/members');
	process.env.UNICLIENT_USERS_PATH = 'uniclient/users';
	process.env.UPLOAD_PATH = path.join(__dirname, '/../../public');
	process.env.TEMP_UPLOAD_DIRECTORY = path.join('temp/');
	//*************************************\\  Default Directories  //************************************* */
	const { UPLOAD_PATH, TEMP_UPLOAD_DIRECTORY } = process.env;
	mkdirSync(UPLOAD_PATH, { recursive: true });
	mkdirSync(path.join(UPLOAD_PATH, TEMP_UPLOAD_DIRECTORY), { recursive: true });

	//*************************************\\  Config .env file  //************************************* */
	// let rootPath = path.resolve(process.env.BASE_DIR, '../');
	// if (process.env.NODE_ENV == 'production') config({ path: path.resolve(rootPath, `env.production`) });
	// else if (process.env.NODE_ENV == 'staging') config({ path: path.resolve(rootPath, `env.staging`) });
	// else config({ path: path.resolve(rootPath, `env.development`) });

	//*************************************\\  Initialize Express  //************************************* */
	let app = express();
    //*************************************\\  initialize Error Monitoring  //************************************* */
	//initializingErrorMonitoring(app);
	app.use(express.urlencoded({extended:true}));
	app.use(express.json())
	app.use(cookieSession({
		name:'tuto-session',
		keys:['key1','key2']
	}));
	app.use(passport.initialize());
    app.use(passport.session());
	const corsOptions ={
		origin:'*', 
		credentials:true,            //access-control-allow-credentials:true
		optionSuccessStatus:200,
	 }
	 app.use(cors(corsOptions));

	  
      
	 //***************** 
	//*************************************\\  Initialize middlewares  //************************************* */
	 //await initialMiddlewares(app);
	//************************************************ 
	process.on('unhandledRejection', (reason, promise) => {
		console.log('Unhandled Rejection at:', promise, 'reason:', reason);
	});

	//********SET MORGAN LOGGER */
	// setup the logger
	var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });
	app.use(morgan('combined', { stream: accessLogStream }));
	//*************************************\\  Routes  //************************************* */
    app.use('/api/bigmoment', bigMomentMainRouter());
  
	//*************************************\\  Error Handling Middlewares  //************************************* */
	  //errorHandlingMiddleware(app);

	  //init DATABASE here

	return { app: app };
};

module.exports = {createApp};
