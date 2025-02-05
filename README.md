📌 Gestión de Citas Médicas - Plataforma Web
📖 Descripción del Proyecto

Este proyecto es una aplicación web diseñada para la gestión de citas médicas, enfocada principalmente en administradores. La plataforma permite:

✅ Crear, modificar y eliminar información relacionada con médicos, usuarios, tipos de citas y horarios médicos.
✅ Organizar citas según criterios como duración, precio y especialidad médica.
✅ Optimizar el proceso de gestión de citas en entornos médicos.
🏥 Funcionamiento

🔹 Administradores: Configuran la plataforma ingresando médicos, tipos de citas, horarios y demás información relevante.

🔹 Pacientes: Se registran en la aplicación, buscan citas disponibles según especialidad y fecha, y pueden agendar y pagar citas mediante Mercado Pago.

🔹 Médicos: Pueden registrar historiales médicos de sus pacientes y visualizar sus citas programadas.

🔹 Historial Médico: Los pacientes pueden revisar diagnósticos, medicamentos recetados y notas del médico.

🛠 Tecnologías Utilizadas
🚀 Frontend

    Angular: Framework para aplicaciones web dinámicas.
    Bootstrap 5: Estilos responsivos para mejorar la interfaz de usuario.
    Angular Material: Componentes UI basados en Material Design.

💾 Backend

    TypeScript: Lenguaje tipado que mejora la robustez del código.
    Node.js: Entorno de ejecución para JavaScript en el servidor.
    Express: Framework ligero para la construcción de APIs.
    Sequelize: ORM para manejar bases de datos SQL como MySQL.

⚠ IMPORTANTE: LEER ANTES DE REVISAR EL PROYECTO
1️⃣ Ejecutar Angular con conexión a Internet

Antes de ejecutar el frontend con Angular, asegúrese de estar conectado a Internet.
Esto es necesario porque el proyecto utiliza el CDN de Bootstrap, y sin conexión las interfaces se verán sin estilos.

Comandos para ejecutar Angular:

npm install
ng serve

2️⃣ Simulación de pagos con Mercado Pago

Para probar la compra de citas médicas, se debe usar ngrok para generar un enlace público, ya que el backend se ejecuta localmente.
📌 Generar un enlace público con ngrok

Una vez que el backend esté corriendo en el puerto 8000, ejecute el siguiente comando en la terminal:

.\ngrok.exe http 8000

Esto generará un enlace similar a:

https://702b-2800-150-14e-fe7-94e6-e2dd-926e-ad09.ngrok.io

🔹 Configurar la URL en Mercado Pago
Este enlace debe actualizarse en el controlador controller/mercadoPago, dentro de la variable notification_url:

notification_url: "https://702b-2800-150-14e-fe7-94e6-e2dd-926e-ad09.ngrok.io/api/mercadoPago/webhook"

⚠ Nota:
Cada vez que se cierre el backend en el puerto 8000, la URL generada por ngrok expirará. Debe repetirse este proceso cada vez que se reinicie el proyecto.
3️⃣ Acceso a Mercado Pago con un usuario de prueba

Antes de probar la compra, debe iniciar sesión en Mercado Pago con un usuario de prueba.

📌 Instrucciones

    Acceda a la página de prueba de Mercado Pago:
    🔗 Mercado Pago Developers
    Haga clic en "Ingresar" en la esquina superior derecha.
    Use las siguientes credenciales:

    Usuario: TESTUSER90381648
    Contraseña: tCfitcy8wl

📌 Ingresar tarjetas de prueba
Para realizar pagos simulados, use tarjetas de prueba.
🔗 Tarjetas de prueba de Mercado Pago

Ejemplo de tarjeta de prueba Visa:

Número: 4023 6535 2391 4373
Código de seguridad: 123
Fecha de caducidad: 11/25
Titular: "APRO" (para pagos aprobados) o "OTHE" (para pagos rechazados)

🔥 Ejecución del Proyecto
🚀 Iniciar el Frontend (Angular)

npm install
ng serve

🔧 Iniciar el Backend (Node.js)

nodemon dist/app.js

Para asegurarse de que los cambios en TypeScript se reflejen en el código JavaScript, ejecute:

tsc --watch

⚠ Importante:
Antes de cambiar la notification_url en Mercado Pago para probar la compra de una cita médica, asegúrese de ejecutar tsc --watch.
📩 Contacto

Para más información sobre el proyecto, puede contactar al desarrollador:
📧 Correo: smoralespincheira@gmail.com
🎯 Conclusión

Este README proporciona una guía detallada sobre la configuración y ejecución del proyecto, asegurando que puedas probar todas sus funcionalidades sin inconvenientes. 🚀💻
