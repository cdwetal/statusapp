# StatusApp Server
This is the StatusUp server. This consists of all of the backend functionality for StatusApp. 
## Installation
To install and run StatusApp server please issue the following commands on a computer that has Node.js installed.
```
npm install
npm run start:dev
```
The server app will then run at http://localhost:3000.
## Technology Summary
The server application is a NestJS application. It uses Socket.io to send and receive data in real-time from the client to the server. It also has a CRUD REST API for all database objects. The application uses a local SQLite database for storage (no setup required). This project is written in TypeScript.