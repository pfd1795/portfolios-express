<!--

- npx express-generator --ejs --git
- npm audit fix --force
- npm i dotenv

- npm install --save-dev nodemon

C:\...\portfolios-express>npx express-generator --ejs --git  

warning: option `--ejs' has been renamed to `--view=ejs'

destination is not empty, continue? [y/N] y

create : public\
create : public\javascripts\
create : public\images\
create : public\stylesheets\
create : public\stylesheets\style.css
create : routes\
create : routes\index.js
create : routes\users.js
create : views\
create : views\error.ejs
create : views\index.ejs
create : .gitignore
create : app.js
create : package.json
create : bin\
create : bin\www

install dependencies:
    > npm install

run the app:
    > SET DEBUG=portfolios-express:* & npm start

www:
* Mejorar logging: Integrar un logger más robusto como winston o pino en lugar de usar solo debug.
* Soporte para HTTPS: Configurar el servidor para que pueda arrancar en modo HTTPS si hay certificados disponibles.
* Compatibilidad con clustering: Adaptar el archivo para usar cluster o pm2 y aprovechar múltiples núcleos de CPU.

app.js:
* Mejorar el manejo de errores: Extender el middleware de errores para devolver JSON en APIs, loguear más detalles o separar la lógica en un archivo error-handler.js.
* Agregar seguridad básica con middlewares: Incluir librerías como helmet (cabeceras seguras) y cors (control de acceso entre dominios).
* Soporte para JSON en errores: Permitir que el middleware de errores devuelva respuestas en formato JSON cuando el cliente lo acepte, además de renderizar vistas.

-->