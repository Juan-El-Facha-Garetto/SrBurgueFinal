# SrBurgueFinal

Aplicación web para gestión y pedidos de hamburguesas y bebidas, optimizada para uso en celulares.

---

## Descripción

SrBurgueFinal permite a los usuarios navegar productos, agregar al carrito, personalizar pedidos, elegir método de pago y enviar el pedido por WhatsApp. El administrador puede gestionar productos, categorías y pedidos desde un panel protegido.

---

## Estructura del proyecto

- **backend/**  
  - API-REST en Node.js y Express  
  - Controladores, rutas, middlewares y conexión a PostgreSQL  
  - Acceso a la base de datos mediante consultas SQL directas

- **src/**  
  - Frontend en Vue 3  
  - Componentes reutilizables, diseño responsive y optimizado para móviles  
  - Vue Router para navegación  
  - Carrito global con provide/inject

---

## Instalación

1. Clona el repositorio:
   ```
   git clone https://github.com/Juan-El-Facha-Garetto/SrBurgueFinal.git
   ```
2. Instala dependencias en backend y frontend:
   ```
   cd backend
   npm install
   cd ../src
   npm install
   ```
3. Configura las variables de entorno en el backend (`.env`):
   ```
   DATABASE_URL=tu_url_de_postgresql
   PORT=3000
   ```
4. Inicia el backend:
   ```
   npm start
   ```
5. Inicia el frontend:
   ```
   npm run dev
   ```

---

## Uso

- Los usuarios pueden:
  - Ver productos y categorías
  - Agregar productos al carrito
  - Personalizar pedidos (observaciones, medallón extra)
  - Elegir método de pago (efectivo o transferencia)
  - Enviar el pedido por WhatsApp

- El administrador puede:
  - Crear, editar y eliminar productos y categorías
  - Ver y gestionar pedidos

---

## Seguridad y roles

- Autenticación de usuarios y administradores
- Rutas protegidas para el panel de administración
- Validación de datos y protección de endpoints sensibles

---

## Base de datos

- Motor: **PostgreSQL**
- Tablas principales: productos, categorías, usuarios, pedidos, detallepedido, metodosdepago, transferencias
- Acceso mediante consultas SQL directas (sin ORM)

---

## Tecnologías utilizadas

- **Backend:** Node.js, Express, PostgreSQL
- **Frontend:** Vue 3, Vue Router
- **Otros:** Render (hosting), WhatsApp API para envío de pedidos

---

## Contribución

1. Haz un fork del repositorio
2. Crea una rama (`git checkout -b feature/nueva-funcionalidad`)
3. Haz tus cambios y commitea
4. Envía un pull request

---

## Licencia

Este proyecto está bajo la licencia MIT.