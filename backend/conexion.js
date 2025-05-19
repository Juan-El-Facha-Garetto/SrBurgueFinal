import mssql from 'mssql';

const connectionSettings = {
    server: 'localhost',
    database: 'BurguersFinal1',
    user: 'Juan',
    password: 'Juan123',
    options: {
        encrypt: true,
        trustServerCertificate: true,
    }
};

export async function getConnection() {
    try {
        return await mssql.connect(connectionSettings);
    }
   catch (error) {
        console.error("Error connecting to the database: ", error);
        throw error;
    }
}
export {mssql};