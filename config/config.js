'user strict';

const mysql = require('mysql2/promise');

//local mysql db connection
const db = mysql.createPool({
  host     : 'localhost',
  user     : 'root',
  password : '',
  connectionLimit: 50,
  database : 'stock',
  dateStrings: true,
});

const withTransaction = async ( db, callback ) => {
  const details = await db.getConnection()
  try {
    await details.beginTransaction();
    const result = await callback();
    await details.commit();
    return result;
  } catch ( err ) {
    await details.rollback();
    throw err;
  } finally {
    details.close()
  }
}

module.exports = {db, withTransaction};