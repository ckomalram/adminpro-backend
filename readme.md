https://github.com/expressjs/serve-index

var serveIndex = require('serve-index');
app.use(express.static(__dirname + '/'))
app.use('/uploads', serveIndex(__dirname + '/uploads'));



## Seccion 12
Esta sección esta especializada en implementar el Google Sign-in en nuestro backend server:

Crear una aplicación en Google Developer Console
Generar el ID de nuestra aplicación y un ID Secreto de servidor
Crear un login básico de pruebas usando el API de Google
Generar un Token desde el front-end
Validar el Token en nuestro back-end
Tip para generar la documentación de nuestros servicios automáticamente

* (URL de docu oficial)[https://developers.google.com/identity/gsi/web]