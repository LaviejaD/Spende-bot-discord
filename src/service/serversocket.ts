import { createServer } from "http";
import { Server } from "socket.io";

export function ServerSocket() {


	const httpServer = createServer();
	const io = new Server(httpServer, {
		// options
	});


	io.on("connection", (socket) => {
		// ...
		console.log('connected');

		socket.on("message", (message) => {
			console.log(message)
		})
		socket.on("hello", (arg) => {
			console.log(arg); // world
		});
	});

	httpServer.listen(3000);
} 