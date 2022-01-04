const { ErrorRequestHandler } =require('express');
const { respUnsuccess } = require('../../utility/httpHelpers');

export const errorHandler = () => {
	return (err, req, res, next) => {
		respUnsuccess(err?.message, res, 500);
	};
};

module.exports = errorHandler;
