# To-Do List

Este proyecto es una aplicación de lista de tareas desarrollada como parte de una prueba técnica. Permite agregar, marcar como completadas y eliminar tareas. El backend está hecho con Node.js, Express y SQLite, y el frontend con Angular.

## ¿Cómo funciona?

- Puedes agregar una tarea escribiendo el texto y presionando "Agregar" o Enter.
- Puedes marcar una tarea como completada usando el checkbox.
- Puedes eliminar una tarea con el botón "Eliminar".

## Instalación y uso

### Backend

1. Entra a la carpeta del backend:
   ```bash
   cd backend
   ```
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Ejecuta el servidor:
   ```bash
   node server.js
   ```
   El backend quedará disponible en `http://localhost:3000`

### Frontend

1. Entra a la carpeta del frontend:
   ```bash
   cd todo-list-app
   ```
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Ejecuta la aplicación:
   ```bash
   ng serve
   ```
   El frontend estará disponible en `http://localhost:4200`

## Estructura del proyecto

```
backend/
  server.js
  (base de datos SQLite se crea automáticamente)
todo-list-app/
  src/
    app/
    environments/
    main.ts
  angular.json
  package.json
  ...
```

## Notas
- El backend guarda las tareas en un archivo SQLite local.
- El frontend consume la API REST del backend.
- No se usaron librerías externas para la UI, solo Angular y estilos básicos.

## Autor
Desarrollado por DevSebas (Sebastian Marciales). 
