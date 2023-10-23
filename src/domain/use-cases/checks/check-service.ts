import { LogModel, LogSeverityLevel } from '../../models/log.model';
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
			if (!req.ok) {
				throw new Error(`Error on check service: ${url}`);
			}

			const newLog = new LogModel(`Service ${url} is ok!`, LogSeverityLevel.low);

			this.logRepository.saveLog(newLog);
			this.successCallback && this.successCallback();

			return true;
		} catch (error) {
			const errorMessage = `url: ${url} - ${error}`;
			const newLog = new LogModel(errorMessage, LogSeverityLevel.high);

			this.logRepository.saveLog(newLog);
			this.errorCallback && this.errorCallback(errorMessage);

			return false;
		}
	}
}
