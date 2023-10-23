import 'dotenv/config';
import { Server } from './presentation/server';
import { envs } from './config/plugins/envs.plugin';

//Funcion anonima autoinvocada
(() => {
	main();
})();

function main() {
	//	Server.start();
	console.log(envs.PORT);
}
