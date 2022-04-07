const {db} = require('../config/config')

exports.getAll = async () => {
  try {
    let sql = `SELECT analytic_id, name, weightage,symbol FROM analytic`; 
    const result =  await db.query(sql)
    return result[0];
  } catch (e) {
    throw e
  }
}

exports.totalWeightage = async () => {
  try {
    let sql = `SELECT sum(weightage) as totalWeightage  FROM analytic`; 
    const result =  await db.query(sql)
    return result[0][0]['totalWeightage'];
  } catch (e) {
    throw e
  }
}

exports.delete = async (param) => {
  try {
    let sql = `DELETE FROM analytic where analytic_id=?`; 
    const result =  await db.query(sql, [param.analytic_id])
    return true;
  } catch (e) {
    throw e
  }
}

exports.insert = async ( param ) => {
  const con = await db.getConnection()
  try {
    await con.beginTransaction();
    const result =  await con.query("INSERT INTO analytic (name, weightage, symbol) VALUE ( ?, ?, ? ) ", 
      [ param.name, param.weightage, param.symbol ])
    await con.commit();
    return result[0].insertId;
  } catch ( err ) {
    await con.rollback();
    throw err;
  } finally {
    con.close()
  }
}

exports.update = async(param) =>{
  const con = await db.getConnection()
  try {

    let sql = (`UPDATE analytic set weightage = ? where analytic_id = ?`, 
    [param.weightage,param.analytic_id])
    const result =  await db.query(sql)
    return true;
  }
  catch(e){
    throw e
  }

}

// exports.findOne = async (customer_id) => {
//   try {

//     let sql = `SELECT credit_id, amount, date, remarks FROM customer_credit as credit where 
//     credit.deleted = 0 AND credit.credit_id = ?`; 
//     const result =  await db.query(sql, [customer_id])
//     return result[0];
//   } catch (e) {
//     throw e
//   }
// }

// exports.deleteRecord = async ( customer_id ) => {
//   const con = await db.getConnection()
//   try {
//     await con.beginTransaction();
//     const result =  await con.query("UPDATE customer_credit SET deleted = 1 WHERE credit_id = ? ", 
//       [ customer_id  ])
//     await con.commit();
//     return result;
//   } catch ( err ) {
//     await con.rollback();
//     throw err;
//   } finally {
//     con.close()
//   }
// }

// exports.update = async ( credit_id, param ) => {
//   const con = await db.getConnection()
//   try {
//     await con.beginTransaction();
//     const result =  await con.query("UPDATE customer_credit SET amount = ?, date = ?, remarks = ? WHERE credit_id = ? ", 
//       [param.amount, param.date, param.remarks, credit_id ])
//     await con.commit();
//     return result;
//   } catch ( err ) {
//     await con.rollback();
//     throw err;
//   } finally {
//     con.close()
//   }
// }