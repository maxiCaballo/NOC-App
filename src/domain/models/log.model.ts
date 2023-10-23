export enum LogSeverityLevel {
	low = 'low',
	medium = 'medium',
	high = 'high',
}

export class LogModel {
	public level: LogSeverityLevel;
	public message: string;
	public createdAt: Date;

	constructor(message: string, level: LogSeverityLevel) {
		this.message = message;
		this.level = level;
		this.createdAt = new Date();
	}

	static jsonParse = (json: string): LogModel => {
		const { message, level, createdAt } = JSON.parse(json);

		//seria conveniente hacer validaciones antes de crear la instancia...
		const log = new LogModel(message, level);
		log.createdAt = new Date(createdAt);

		return log;
	};
}
