# CitaProyect

Descripcion del proyecto:
Este proyecto consiste en una aplicación web para la gestión de citas médicas, diseñada principalmente para administradores. La plataforma les permite manejar integralmente la asignación de citas, incluyendo la capacidad de crear, modificar y eliminar información relacionada con médicos, usuarios, tipos de citas, y horarios médicos. La aplicación se destaca por su flexibilidad, permitiendo a los administradores organizar las citas basándose en diversos criterios como duración, precio, y especialidad médica, entre otros, optimizando así el proceso de gestión de citas en entornos médicos.

Una vez que el administrador haya ingresado medicos, tipos de citas, horarios medicos, informacion de la clinica los usuarios o pacientes que ingresen a la aplicacion debera registrarse, una vez registrados podran 
acceder a la aplicacion podran revisar las citas medicas disponibles y buscarlas en una determinada fecha y de alguna especialidad medica en particular, una vez que hagan click en buscar cita, podran ver las citas disponibles en distintos bloques horarios que podran elegir y posteriormente comprar por mercado pago, a su vez los pacientes podran ver sus historiales medicos en donde podran revisar informacion relevantes como su diagnostico, medicamentos recetados, notas del medico etc.

los medicos podran redactar los historiales medicos y enviarselos al perfil de historial de un paciente en particular para que lo pueda revisar en su cuenta, a su vez el medico podra ver el registro de sus citas medicas agendadas y revisarlas cuando pueda.


Tecnologias utilizadas:

Frontend:

    Angular: Framework para aplicaciones web, facilita la creación de interfaces dinámicas y reactivas.
    Bootstrap 5: Librería de diseño para crear interfaces responsivas y estilizadas.
    Angular Material: Conjunto de componentes de interfaz basados en Material Design para Angular.

Backend:

    TypeScript: Lenguaje de programación tipado, superset de JavaScript, que aporta robustez y claridad al código.
    Node.js: Entorno de ejecución para JavaScript en el servidor, permite construir aplicaciones escalables.
    Express: Marco de trabajo para Node.js, simplifica la creación de servidores web y API.
    Sequelize: ORM para Node.js, facilita la interacción con bases de datos SQL como MySQL.


 IMPORTANTE POR FAVOR LEER ANTES DE REVISAR EL PROYECTO!!!

1- Antes de ejecutar el proyecto de angular con el comando ng serve  debe asegurarse de estar conectada a internet esto debido a que se utilizo el cdn de bootstrap por lo tanto si no esta conectada a internet
las interfaces se veran sin los estilos de bootstrap, esta fue la razon de que en la primera sustentacion que tuve  del proyecto se vio todo mal.
puede usar el internet del celular o cualquier otro medio pero porfavor debe revisar el proyecto conectada a internet.

2-Para simular el proceso de compra de una cita médica utilizando usuarios de prueba con Mercado Pago, fue necesario generar un enlace a 
través de ngrok.exe. Este paso es esencial porque el proyecto se ejecuta en un entorno local y no en un servidor de producción. ngrok.exe crea un enlace público temporal a nuestro
servidor local, permitiendo que Mercado Pago interactúe con el proyecto como si estuviera alojado en línea. 
el comando que se debe ejecutar para generar el enlace una vez se este ejecutando el backend en el puerto 800 es .\ngrok.exe http 8000
el enlace que devuelve ese comando una vez ejecutado en la terminal (.\ngrok.exe) es parecido a este https://702b-2800-150-14e-fe7-94e6-e2dd-926e-ad09.ngrok.io
Este enlace se debe incluir en controller/mercadoPago como en notification_url = "" como en este ejemplo notification_url: "https://702b-2800-150-14e-fe7-94e6-e2dd-926e-ad09.ngrok.io/api/mercadoPago/webhook"
Es importante tener en cuenta que la URL generado por ngrok.exe expira después de un cierto tiempo y se desactiva si es que se cierra el backend en el puerto 8000, por lo que este proceso 
debe repetirse cada vez que se inicie el proyecto en el puerto 8000.

En este enlace puede encontrar usuarios de prueba para realizar simulaciones de compra -> https://www.mercadopago.cl/developers/es/docs/checkout-api/additional-content/your-integrations/test/cards.
Por ejemplo, puede usar una tarjeta Visa con el número 4023 6535 2391 4373, código de seguridad 123, y 
fecha de caducidad 11/25. El nombre del titular puede ser "APRO" o "OTHE", dependiendo de si se aprueba o rechaza el pago.

3-para ejecutar el proyecto en angular se debe usar npm install y luego ng serve, para ejecutar el proyecto backend de nodejs se debe ejecutar nodemon dist/app.js y tsc --watch para pasar los cambios de typescript a javascript (Asegurace de ejecutar el comando tsc --watch antes de que cambie el url en notification_url para probar la compra de una cita medica en mercado pago)




