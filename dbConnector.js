/*const oracledb = require('oracledb');

async function connectDb() {
  try {
    const connection = await oracledb.getConnection({
      user: 'admin',
      password: '999',
      connectString: '172.16.190.9:1521/MSH',
    });

    return connection;
  } catch (error) {
    console.error('Error connecting to the database:', error);
    throw error;
  }
}

async function closeConnection(connection) {
  if (connection) {
    try {
      await connection.close();
      console.log('Connection closed successfully.');
    } catch (err) {
      console.error('Error closing connection:', err);
    }
  }
}

module.exports = { connectDb, closeConnection };*/
