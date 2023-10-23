import { CheckService } from '../domain/use-cases/checks/check-service';
import { FileSystemDatasource } from '../infrastructure/datasources/file-system.datasource';
import { CronService } from './cron/cron-service';
import { LogRepositoryImpl } from '../infrastructure/repositories/log.repository.impl';

//Repositorios

//Este objeto recibe el data source que puede ser mongo, filesystem, postgreSql etc..
const fileSystemRepository = new LogRepositoryImpl(new FileSystemDatasource());

export class Server {
	public static start() {
		console.log('Server started....');

		CronService.createJob('*/2 * * * * *', () => {
			const url = 'https://google.com';

			new CheckService(
				fileSystemRepository,
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
