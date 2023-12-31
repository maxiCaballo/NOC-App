import { CheckService } from '../domain/use-cases/checks/check-service';
import { FileSystemDatasource } from '../infrastructure/datasources/file-system.datasource';
import { CronService } from './cron/cron-service';
import { LogRepositoryImpl } from '../infrastructure/repositories/log.repository.impl';
import { EmailService } from './email/email.service';
import { SendEmailLogs } from '../domain/use-cases/email/send-email-logs';
import { MongoLogDatasource } from '../infrastructure/datasources/mongo-log.datasource';
import { PostgresLogDatsource } from '../infrastructure/datasources/postgreSQL-log.datasource';
import { CheckServiceMultiple } from '../domain/use-cases/checks/check-service-multiple';

//Repositorios

//Este objeto recibe el data source que puede ser mongo, filesystem, postgreSql etc..
const fsLogRepository = new LogRepositoryImpl(new FileSystemDatasource());
const mongoDBLogRepository = new LogRepositoryImpl(new MongoLogDatasource());
const postgres = new LogRepositoryImpl(new PostgresLogDatsource());

const emailService = new EmailService();
export class Server {
	public static start() {
		console.log('Server started....');

		//Mandar email
		// new SendEmailLogs(emailService, fileSystemRepository).execute('caballomaxi@gmail.com');

		CronService.createJob('*/5 * * * * *', () => {
			const url = 'https://google.com';
			const localhost = 'http://localhost:3000';

			//trabajar con 1 datasource
			// new CheckService(
			// 	fsLogRepository,
			// 	() => console.log(`url is Ok! : ${url}`),
			// 	(error) => console.log(error),
			// ).execute(url);

			//trabajar con varios datasource
			new CheckServiceMultiple(
				[fsLogRepository, mongoDBLogRepository, postgres],
				() => console.log(`url is Ok! : ${url}`),
				(error) => console.log(error),
			).execute(url);
		});
	}
}

/*
La carpeta "presentation" suele contener subdirectorios relacionados con la interfaz de usuario, como 
"views" o "UI," donde se encuentran las clases y componentes que representan la interfaz gráfica, "controllers"
 o "presenters," que gestionan la lógica de presentación, y posiblemente otros subdirectorios para recursos
gráficos, estilos, plantillas, etc.
*/
