const oracledb = require('oracledb');
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
async function fun() {
    let con;
    try {
        con = await oracledb.getConnection({

            user: "itktk",
            password: "1659",
            connectString: "172.16.190.9:1521/MSH"

        });
        const data = await con.execute(`SELECT * FROM UTABLES WHERE rownum <= 1`,);
        console.log(data.rows);
        I
    } catch (err) {
        console.error(err);
    }
}
fun();

