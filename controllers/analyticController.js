const analytic= require('./../models/analytic')


exports.getAll = async (req, res) => {
  let total = await analytic.totalWeightage(); 
  let result = await analytic.getAll()
  res.json({total : total, data : result })
};

exports.addRecord = async (req, res) => {
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
      throw '400:Parameter not Valid'
    }

    const result = await analytic.insert( req.body )
    res.json({
      message: `analytic insert successfully`,
      insert_id : result
    })
};
exports.delete = async(req, res) => {
  if(Object.keys(req.params).length === 0 && req.params.analytic_id === undefined){
    throw '400:Parameter not Valid'
  }

  const result = await analytic.delete(req.params)
  if(result === true) {
    res.json({
      message : 'record delete successfully'
    })
  }

};
exports.update = async (req,res) => {
  if(req.body.constructor === Object && Object.keys(req.body).length === 0){
    throw '400:Parameter not Valid'
  }
  const result = await analytic.update( req.body )
    res.json({
      message: `analytic updated successfully`,
      insert_id : result
    })
}
