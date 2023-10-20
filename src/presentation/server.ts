import { CronService } from './cron/cron-service';

/*
La carpeta "presentation" suele contener subdirectorios relacionados con la interfaz de usuario, como 
"views" o "UI," donde se encuentran las clases y componentes que representan la interfaz gráfica, "controllers"
 o "presenters," que gestionan la lógica de presentación, y posiblemente otros subdirectorios para recursos
gráficos, estilos, plantillas, etc.
*/

export class Server {
	public static start() {
		console.log('Server started....');

		CronService.createJob('*/2 * * * * *', () => {
			const date = new Date();
			console.log('2 seconds', date);
		});
	}
}
