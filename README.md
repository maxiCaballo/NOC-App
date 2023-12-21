# NOC-App

NOC(Network Operation Center) o sistema de notificaciones hecho en Node usando Typescript

# dev

1. Clonar el archivo .env.template a .env
2. Configurar variables de entorno

```
PORT=3000

MAILER_SERVICE=
MAILER_EMAIL=
MAILER_SECRET_KEY=

PROD=false
```

3. Ejecutar el comando `npm  install`
4. Levantar la base de datos con el comando

```
docker compose up -d
```

5. Ejecutar

```
npx prisma dev
```

5. Ejecutar el comando `npm run dev`

## Obtener Gmail Key

[Google AppPassowrds](https://myaccount.google.com/u/0/apppasswords)
