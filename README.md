# Prueba Técnica - Desarrollador Laravel + Node.js

Sistema completo de gestión de usuarios con notificaciones en tiempo real usando Laravel API, WebSockets con Node.js y un cliente web.

## Estructura del Proyecto
proyecto/
├── laravel/ # API REST en Laravel
├── websocket/ # Servidor Node.js + Socket.IO
    ├── index.html/ # Cliente HTML para notificaciones
└── README.md


## Requisitos Previos

- PHP 8.1+
- Composer 2.5+
- Node.js 16+
- MySQL 8.0+
- Git

## Instalación y Configuración

### 1. API Laravel

```bash
# Clona proyecto
git clone https://github.com/aldairmtzluna/promass
cd laravel

# Instala dependencias
composer install

# Configurar variables de entorno
cp .env.example .env

# Configurar .env con:
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=prueba_tecnica
DB_USERNAME=root
DB_PASSWORD=

SESSION_DRIVER=array
WEBSOCKET_URL=http://localhost:3001

# Ejecuta migraciones
php artisan migrate

# Iniciar el servidor
php artisan serve --port=8000

### EndPoint de usuarios

POST http://localhost:8000/api/usuarios
GET http://localhost:8000/api/usuarios

### 2. Websocket

cd websocket

# Instala dependencias
npm install

# Inicia el servidor
npm start

### Para el cliente web solo abre el html

http://dominio/websocket/index.html