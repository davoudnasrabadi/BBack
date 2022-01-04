const { createLogger, format, transports, config } = require('winston');


const transactionLogger = createLogger({
   transports: [
        new transports.File({ filename: 'transaction.log' })
     ]
});

module.exports = {
    usersLogger: usersLogger,
    transactionLogger: transactionLogger
};