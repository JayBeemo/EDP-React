// database.js
import oracledb from 'oracledb';

export async function getConnection() {
  try {
    return await oracledb.getConnection({
      user: 'BSERP',
      password: 'BSERP2021',
      connectString: '211.217.253.230/1521',
    });
  } catch (error) {
    console.error(error);
  }
}

export async function executeQuery(connection, query) {
  try {
    return await connection.execute(query);
  } catch (error) {
    console.error(error);
  }
}

