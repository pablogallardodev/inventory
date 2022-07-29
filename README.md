# Inventory

Este proyecto es una aplicación web, en la que puedes llevar la gestión de tus productos, ya sea la contabilidad de existencias así como moviemientos de entradas y salidas. También esta diseñado para que puedas ver un dashboard de los productos y sus movimientos.
Esta aplicación fue realizada con [React](https://reactjs.org/) y [Firebase](https://firebase.google.com/)

## Preparando la aplicación

Para ejecutar la aplicacion debes tener un proyecto de [Firebase](https://console.firebase.google.com/) para la autenticación y el guardado de información, tener instalado en tu equipo Node.js y NPM.

Descarga el repositorio:

```bash
git clone https://github.com/pablogallardodev/inventory.git
cd inventory
```

Instala las dependencias:

```bash
npm install
```

Crea un archivo `.env` a partir del archivo `.env.example`.

```bash
cp .env.example .env
```

### Variables .env

Para que el proyecto funcione correctamente debe definir la variable de entorno REACT_APP_FIREBASE_CONFIG en la cual hay que añadir la configuración de tu proyecto de firebase que puede encontrar en la [consola](https://console.firebase.google.com/) de su proyecto.

## Ejecutando la aplicación

Una vez completado lo mencionado anteriormente, puede ejecutar la aplicación con:

```bash
npm run start
```

Para visualizar la aplicacion dirijase a [localhost:3000](http://localhost:3000).