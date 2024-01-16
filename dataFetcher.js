async function fetchData(connection) {
    try {
      const result = await connection.execute('SELECT COUNT(p.hn) AS patient_count FROM opds o JOIN PATIENTS p ON o.pat_run_hn = p.run_hn AND o.pat_year_hn = p.year_hn WHERE o.opd_date = TRUNC(SYSDATE)');
      const data = result.rows;
  
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  }
  
  module.exports = { fetchData };
  