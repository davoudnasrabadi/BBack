import * as Sentry from '@sentry/node';
import { ErrorRequestHandler, Express, Request, RequestHandler, Response } from 'express';
import { respUnsuccess } from '../utility/httpHelpers';
const Tracing = require('@sentry/tracing');

export const initializingErrorMonitoring = (app) => {
	Sentry.init({
		dsn: '',
		tracesSampleRate: 1.0,
		release: 'bm@' + process.env.npm_package_version,
		integrations: [
			new Sentry.Integrations.Http({ tracing: process.env.NODE_ENV !== 'test' ? true : false }),
			new Tracing.Integrations.Express({
				app,
			}),
			new Tracing.Integrations.Mysql(),
		],
	});
	app.use(Sentry.Handlers.requestHandler());
	app.use(Sentry.Handlers.tracingHandler());
};

export const errorHandlingMiddleware = (app) => {
	// The error handler must be before any other error middleware and after all controllers
	app.use(
		Sentry.Handlers.errorHandler({
			shouldHandleError(error) {
				// Capture all  \errors
				if (error.status === 400) return false;
				else return true;
			},
		}))

	app.use((err, req, res, next) => {
		if (err && process.env.NODE_ENV == 'development') console.error(err);
		respUnsuccess([{ msg: (res).sentry }], res, 500);
	});
};

export const logError = (error, msg) => {
	if (process.env.NODE_ENV == 'development') console.log(msg, error);
	else Sentry.captureException(error, {});
};

export const captureMessage = (msg)=> {
	Sentry.captureMessage(msg);
};
