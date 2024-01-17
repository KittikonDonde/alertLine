/*const oracledb = require('oracledb');

async function fetchData() {
  let connection;

  try {
    // เชื่อมต่อกับ Oracle Database โดยใช้โหมด Thin
    connection = await oracledb.getConnection({
      user: 'admin',
      password: '999',
      connectString: '172.16.190.9:1521/MSH',
    });

    // Query ข้อมูล
    const result = await connection.execute('SELECT COUNT(p.hn) AS patient_count FROM opds o JOIN PATIENTS p ON o.pat_run_hn = p.run_hn AND o.pat_year_hn = p.year_hn WHERE o.opd_date = TRUNC(SYSDATE)');
    const data = result.rows;

    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  } finally {
    // ปิดการเชื่อมต่อ
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error('Error closing connection:', err);
      }
    }
  }
}

fetchData()
  .then(data => {
    console.log('Fetched data:', data);
  })
  .catch(error => {
    console.error('Error:', error);
  });
*/