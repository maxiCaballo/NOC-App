import { CronService } from './cron-service';

describe('cron-service.ts', () => {
	const mockTick = jest.fn();

	//Si le paso como parametro el done es como decirle a jest que se espere en esta prueba hasta que se mande a llamar el done()
	test('should create a job', (done) => {
		const job = CronService.createJob('* * * * * *', mockTick);

		setTimeout(() => {
			expect(mockTick).toBeCalledTimes(2);
			job.stop();

			done();
		}, 2000);
	});
});
