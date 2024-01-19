async function fetchData(connection) {
  try {
    const result = await connection.execute(`
      SELECT COUNT(DISTINCT p.hn) 
      FROM opds o, PATIENTS p
      WHERE o.pat_run_hn = p.run_hn
        AND o.pat_year_hn = p.year_hn
        AND o.opd_date = TRUNC(SYSDATE)
      
    `);

    const data = result.rows;

    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

module.exports = { fetchData };
