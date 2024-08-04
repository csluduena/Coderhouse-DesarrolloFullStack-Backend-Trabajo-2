# Proyecto de Backend para la Academia Coderhouse

Este proyecto es una continuación de la primera entrega para el curso de Backend en la academia Coderhouse. Para ver la primer parte del trabajo, puedes ir al siguiente README: [Primer Entrega](https://github.com/csluduena/Backend-Primer-Entrega/blob/main/README.md).

En esta segunda entrega, el proyecto ha sido ampliado para incluir funcionalidades de frontend, mejorando la gestión de productos con una interfaz de usuario interactiva y en tiempo real.

## Características del Proyecto

### Backend

- **Gestión de Productos:**
  - **Operaciones CRUD:** Realiza operaciones de Crear, Leer, Actualizar y Eliminar productos mediante una API RESTful.
  - **Endpoints Disponibles:**
    - `GET /api/products`: Lista todos los productos.
    - `GET /api/products/:pid`: Obtiene un producto por su ID.
    - `POST /api/products`: Crea un nuevo producto.
    - `PUT /api/products/:pid`: Actualiza un producto existente.
    - `DELETE /api/products/:pid`: Elimina un producto por su ID.

- **Manejo de Rutas:**
  - **Configuración de Rutas:** Las rutas están configuradas para manejar operaciones de productos, incluyendo vistas para mostrar, agregar y gestionar productos en tiempo real.

### Frontend

- **Interactividad en Tiempo Real:**
  - **Socket.io:** Utilizado para actualizar la lista de productos en tiempo real en la interfaz de usuario sin necesidad de refrescar la página.
  - **Configuración de Eventos:** Emisión de eventos de websocket dentro de las peticiones POST para la creación y eliminación de productos.

- **Plantilla Web y Vistas:**
  - **Handlebars:** Motor de plantillas para renderizar vistas en el frontend.
  - **Vistas Implementadas:**
    - **Página de Inicio:** `http://localhost:8080` - Contiene botones para acceder a las vistas de productos, productos en tiempo real, y agregar productos.
    - **Página de Productos:** `http://localhost:8080/products` - Muestra una lista de productos con opción para comprar.
    - **Página de Productos en Tiempo Real:** `http://localhost:8080/realtimeproducts` - Actualización en tiempo real de los productos.
    - **Formulario de Agregar Productos:** `http://localhost:8080/products/add` - Permite añadir nuevos productos manualmente o importando un backup de stock.

- **Estilos Personalizados:**
  - **CSS:** Estilización de la interfaz con un diseño responsivo y un footer estilizado.
  - **Fuente Personalizada:** Inclusión de una fuente personalizada llamada `Dienasty`.

## Tecnologías Utilizadas

- **Node.js:** Plataforma de desarrollo backend.
- **Express:** Framework de Node.js para construir aplicaciones web y APIs.
- **Handlebars:** Motor de plantillas para el frontend.
- **Socket.io:** Biblioteca para comunicación en tiempo real.
- **CSS:** Estilización personalizada para el diseño del proyecto.
- **Postman:** Herramienta para probar y documentar APIs.

## Ejecución del Proyecto

1. Clonar el repositorio.
2. Instalar las dependencias con `npm install`.
3. Ejecutar el servidor con `node app.js`.
4. Acceder a la interfaz web en `http://localhost:8080`.
5. Utilizar Postman u otro cliente API para probar los diferentes endpoints.

## Contribuciones

Las contribuciones son bienvenidas. Si encuentras algún problema o tienes alguna sugerencia, no dudes en abrir un issue en el repositorio.

## Autor

Sebastián Ludueña - [Linkedin](https://www.linkedin.com/in/csluduena/) - [GitHub](https://github.com/csluduena) - [Web](https://csluduena.com.ar)
