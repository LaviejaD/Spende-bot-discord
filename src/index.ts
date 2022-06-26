import { fork, ChildProcess } from 'child_process';
import { join } from "path";

class Customprocess {
	process: ChildProcess;
	path: string;
	constructor(path: string) {
		this.path = path;
	}
	star() {
		this.process = fork(this.path);
		this.process.send('start');
	}
	restart() {
		this.process.send('exit');
		this.star();
	}
}


(() => {

	const main = new Customprocess(join(__dirname, 'main.js'));
	// Math.floor(totalmem() / 1024 / 1024)
	// process.memoryUsage().heapUsed / 1024 / 1024

	main.star();
	setTimeout(() => { main.restart() }, 43_200_000);

	// setInterval(() => {
	// 	const time = Math.floor(process.uptime());
	// 	const second = time % 60;
	// 	const minute = Math.floor(time / 60);
	// 	const hour = Math.floor(minute / 60)
	// 	const day = Math.floor(hour / 24);



	// 	console.log(`dias: ${day}  horas: ${hour}  minutos:${minute}  segundos: ${second}`);
	// }, 1000)

})(); 