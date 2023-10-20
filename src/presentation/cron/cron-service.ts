import { CronJob } from 'cron';

type CronTime = string | Date; //Cada cuanto tiempo
type OnTick = () => void; //Accion a ejecutar cada cierto tiempo

export class CronService {
	static createJob(crontime: CronTime, onTick: OnTick) {
		const job = new CronJob(crontime, onTick);

		job.start();
		return job;
	}
}
