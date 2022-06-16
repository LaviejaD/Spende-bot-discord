
//module import
import { red, yellow, blue, magenta, white, yellowBright, greenBright } from 'cli-color';
// logger.color('yellow').bgColor('red').reverse().log(`[Error-Loader]-[${message}]`)
// logger.color('yellow').log(`[Loader]-[${message}]`)
//logger.color('black').bgColor('yellow').log(`[warng]-[${message}]`)
//logger.reverse().color('green').log(`[Ok]-[${message}]`)
const logfuctions = {
	"error": (message: string) => red(`[${blue('Error')}]-[${yellow(message)}]`),
	"error-loader": (message: string) => red(`[${blue('Error-Loading')}]-[${yellow(message)}]`),
	"loader": (message: string) => magenta(`[${white('Loading')}]-[${yellow(message)}]`),
	"warng": (message: string) => red(`[${yellowBright('Warg')}]-[${yellow(message)}]`),
	"default": (message: string) => greenBright(`[${blue('Ok')}]-[${yellow(message)}]`),
}

type logtypes = "error" | "error-loader" | "loader" | "warng" | "default";
export function log(message: string, type: logtypes = "default") {
	console.log(logfuctions[type](message));

}