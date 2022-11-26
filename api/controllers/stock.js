const oraCon = require('../config/oradb');

exports.getStock = async (req, res) => {
  const {poNumber} = req.params;
  //let con;  
  try {
    con = await oraCon();
    /*const data = await con.execute(`SELECT *
    FROM xxnmc.XXNMC_PO_TATMEEN_PENDING_PO_V    
    WHERE PO_NUMBER = :id`, [poNumber]);*/
    const data = await con.execute(`SELECT QUANTITY
    FROM xxnmc.XXNMC_PO_TATMEEN_PENDING_PO_V    
    WHERE PO_NUMBER = '20833600009'`);
    console.log(data);
    if(data.rows) {
      res.status(200).send(data.rows);
    }else {
      res.send(418).send({message: 'No data found'});
    }   

  }catch(err) {
    console.error(err);
  }finally {
    if (con) {
      try {
        await con.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
  
}

exports.createStock = (req, res) => {
  const {id} = req.params;  
  const {logo} = req.body;
  if (!logo) {
    res.send(418).send({message: 'We need a logo'});
  }

  res.send({
    stock: `Stock id: ${id} and logo: ${logo}`,
  });

  
}