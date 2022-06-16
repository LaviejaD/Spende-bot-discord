export class Cachedata<t> {
	private map: Map<string, t> = new Map<string, t>();
	private delmap: Map<string, number> = new Map<string, number>()
	time: number;
	constructor({ time } = { time: 60 }) {
		this.time = time * 1000;
	}

	get(key: string): t | undefined {
		this.waitdelete(key);
		return this.map.get(key) ?? undefined;
	}
	set(key: string, value: t): void {
		this.waitdelete(key);
		this.map.set(key, value);
		this.delete(key);
	}
	private waitdelete(key: string): void {
		this.delmap.set(key, new Date(Date.now()).getTime() + this.time);
	}
	private delete(key: string): void {
		let del = setInterval(() => {
			const now = this.delmap.get(key) - Date.now();
			if (now <= 0) {
				this.map.delete(key);
				this.delmap.delete(key);
				clearInterval(del);
			}
		}, this.time);
	}
}