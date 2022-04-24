
//module import
import logger from 'node-color-log';

const logfuctions = {
	"error": (message: string) => logger.color('red').log(`[Error]-[${message}]`).error(),
	"error-loader": (message: string) => logger.color('yellow').bgColor('red').reverse().log(`[Error-Loader]-[${message}]`),
	"loader": (message: string) => logger.color('yellow').log(`[Loader]-[${message}]`),
	"warng": (message: string) => logger.color('black').bgColor('yellow').log(`[warng]-[${message}]`),
	"default": (message: string) => logger.reverse().color('green').log(`[Ok]-[${message}]`)
}

type logtypes = "error" | "error-loader" | "loader" | "warng" | "default";
export function log(message: string, type: logtypes = "default") {
	logfuctions[type](message);

}

