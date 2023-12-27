import 'dotenv/config';
import * as env from 'env-var';

export const envs = {
	PORT: env.get('PORT').required().asPortNumber(),
	MAILER_SERVICE: env.get('MAILER_SERVICE').required().asString(),
	MAILER_EMAIL: env.get('MAILER_EMAIL').required().asEmailString(),
	MAILER_SECRET_KEY: env.get('MAILER_SECRET_KEY').required().asString(),
	PROD: env.get('PROD').required().asBool(),
	MONGO_URL: env.get('MONGO_URL').required().asString(),
	MONGO_DB_NAME: env.get('MONGO_DB_NAME').required().asString(),
	MONGO_USER: env.get('MONGO_USER').required().asString(),
	MONGO_PASSWORD: env.get('MONGO_PASSWORD').required().asString(),
};

//*Con este paquete lo que hago es poner reglas para mis variables de entorno
//*Importo el paquete dontenv para poder leerlas y luego le asigno mis reglas
