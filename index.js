const express = require('express')
const oracledb = require('oracledb');

const app = express()
app.use(express.json());

oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
let result;
const port = process.env.PORT || 3000;

async function run(id,res) {

    let connection;
    try {
        connection = await oracledb.getConnection({
        user          : 'ammar_s',
        password      : '123',
        connectString : '(DESCRIPTION =(ADDRESS = (PROTOCOL = TCP)(HOST =00-ASUS-2021 )(PORT = 1521)) (CONNECT_DATA =(SERVER = DEDICATED)(SERVICE_NAME = orclpdb)))'
      // coonectString is the same in TNSname of database!
      });
  
      result = await connection.execute(
        "SELECT * FROM delegates where id = :id", { id }
      );
      console.log(result.rows);
      let response = { status: true, result:result.rows };
      res.json(response);
    } catch (err) {
      console.error(err);
    } finally {
      if (connection) {
        try {
          await connection.close();
        } catch (err) {
          console.error(err);
        }
      }
    }
  }
  
 


app.get('/:id', function (req, res) {
  var {id} = req.params;
  run(id,res);
})

app.listen(port, () => {
    console.log(`app listening on port ${port}`)
  })

  // http://localhost:3000/2