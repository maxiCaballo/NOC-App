export enum LogSeverityLevel {
	low = 'low',
	medium = 'medium',
	high = 'high',
}

interface LogProps {
	level: LogSeverityLevel;
	message: string;
	origin: string;
	createdAt?: Date;
}

export class Log {
	public level: LogSeverityLevel;
	public message: string;
	public createdAt: Date;
	public origin: string;

	constructor(props: LogProps) {
		this.message = props.message;
		this.level = props.level;
		this.origin = props.origin;
		this.createdAt = props.createdAt ? props.createdAt : new Date();
	}

	static jsonParse = (json: string): Log => {
		const { message, level, createdAt } = JSON.parse(json);

		//seria conveniente hacer validaciones antes de crear la instancia...
		const log = new Log({
			message,
			level,
			origin,
			createdAt,
		});
		log.createdAt = new Date(createdAt);

		return log;
	};

	//Me transforma un obj Log ya se de mongo o postgre a un obj Log de mi dominio
	static fromObject = (object: { [key: string]: any }): Log => {
		const { message, level, origin, createdAt } = object;

		const log = new Log({
			message,
			level,
			origin,
			createdAt,
		});

		return log;
	};
}
