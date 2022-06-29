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

})(); 