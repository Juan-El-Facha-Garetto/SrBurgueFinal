const mssql = require('mssql');

const connectionSettings = {
    user: 'ASUSMAS',       
    password: 'mati123',   
    server: 'localhost',
    database: 'BurguersFinal',
    options: {
        trustServerCertificate: true,
    }
};

  async function connectToDatabase() {
    try{
        const pool = await mssql.connect(connectionSettings);
        console.log('✅ Conexión a la base de datos exitosa');
        return pool;
    }catch (error) {
        console.error('Error connecting to the database:', error);
        throw error;
    }
  }


  module.exports = {mssql, connectionSettings, connectToDatabase};