const  {PrismaClient} = require('@prisma/client');
const Redis = require('ioredis');

 class Database{;

    constructor(){
			let prisma = new PrismaClient({
				errorFormat: 'pretty',
			});
			this.prisma = prisma;

			//** Redis Initiate
			const { REDIS_HOST, REDIS_PASSWORD, REDIS_PORT } = process.env;
            let redis_port;
            if(REDIS_PORT !== undefined){
                redis_port = REDIS_PORT
            }else {
                redis_port = "6379";
            }
			let redisConfig= { port: parseInt(redis_port), host: REDIS_HOST};
			if (REDIS_PASSWORD) redisConfig.password = REDIS_PASSWORD;
			this.redis = new Redis(redisConfig);
		
       
    }

     getPrisma(){
		return this.prisma;
	};

	 getRedis(å) {
		return this.redis;
	};

}
module.exports = {
	Database
}