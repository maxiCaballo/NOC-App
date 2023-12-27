import { Log, LogSeverityLevel } from '../../models/log.model';
import { LogRepository } from '../../repository/log.repository';

interface CheckServiceUseCase {
	execute(url: string): Promise<boolean>;
}

//Ineyeccion de dependencia, que quiero hacer en caso de que el check sea exitoso o falle
type SuccessCallback = (() => void) | undefined;
type ErrorCallback = ((error: string) => void) | undefined;

export class CheckService implements CheckServiceUseCase {
	constructor(
		private readonly logRepository: LogRepository, //Aca inyecto con que datasource quiero trabajar
		private readonly successCallback: SuccessCallback,
		private readonly errorCallback: ErrorCallback,
	) {}

	public async execute(url: string): Promise<boolean> {
		try {
			const req = await fetch(url);
			console.log({ url });

			if (!req.ok) {
				throw new Error(`Error on check service: ${url}`);
			}

			const newLog = new Log({
				message: `Service ${url} is ok!`,
				level: LogSeverityLevel.low,
				origin: 'check-service.ts',
			});

			this.logRepository.saveLog(newLog);
			this.successCallback && this.successCallback();

			return true;
		} catch (error) {
			const errorMessage = `url: ${url} - ${error}`;
			const newLog = new Log({
				message: errorMessage,
				level: LogSeverityLevel.high,
				origin: 'check-service.ts',
			});

			this.logRepository.saveLog(newLog);
			this.errorCallback && this.errorCallback(errorMessage);

			return false;
		}
	}
}
