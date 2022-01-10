
//module import
import logger from 'node-color-log';

export function log(message: string, type?: string) {
	let type_ = `${type}`.split(" ").join("").toLowerCase()

	switch (type_) {
		case 'error':
			logger.color('red').log(`[Error]-[${message}]`).error()
			break;
		case 'error-loader':
			logger.color('yellow').bgColor('red').reverse().log(`[Error-Loader]-[${message}]`)
			break;
		case 'loader':
			logger.color('yellow').log(`[Loader]-[${message}]`)
			break;
		case 'warng':
			logger.color('black').bgColor('yellow').log(`[warng]-[${message}]`)
			break;
		default:
			logger.reverse().color('green').log(`[Ok]-[${message}]`)
			break;
	}

}