const moduleAlias = require('module-alias');
const {join , resolve} = require('path');
const websockets =require('./ws/index');
moduleAlias.addAliases({
	'@app': __dirname,
});
let {createApp} = require('../src/core/baseApplication.js');

//*************************************\\  Runtime ENVs  //************************************* */
process.env.BASE_DIR = resolve(__dirname);
if (!process.env.NODE_ENV)
{ 
	console.log('-----------------------------------');
	console.log(`**DEVELOPMENT MODE**`);
	console.log('-----------------------------------');
	process.env.NODE_ENV = 'development';
}
if (!process.env.PORT) process.env.PORT = '5000';
process.env.UNICONSOLE_MEMBERS_DIRECTORY = join(__dirname, '/../../public/uniconsole/members');
process.env.UNICLIENT_USERS_PATH = 'uniclient/users';
process.env.UPLOAD_PATH = join(__dirname, '/../../public');
process.env.TEMP_UPLOAD_DIRECTORY = join('temp/');
//*************************************\\  Config .env file  //************************************* */
let rootPath = resolve(process.env.BASE_DIR, '../');
if (process.env.NODE_ENV == 'production') require('dotenv').config({ path: resolve(rootPath, `env.production`) });
else if (process.env.NODE_ENV == 'staging') require('dotenv').config({ path: resolve(rootPath, `env.staging`) });
else require('dotenv').config({ path: resolve(rootPath, `env.development`) });




(async () => {
	let { app } = await createApp();

	const server = app.listen(process.env.PORT, async () => {
		console.log('Application HTTP Server Listening on Port ' + process.env.PORT);
	});
    websockets(server);
})();
