async function thaiNative(connection) {
  try {
    const result = await connection.execute(`
    SELECT COUNT( p.hn) 
      FROM opds o, PATIENTS p
      WHERE o.pat_run_hn = p.run_hn
        AND o.pat_year_hn = p.year_hn
        AND o.opd_date = TRUNC(SYSDATE)
				AND p.native_id = 99
     
  `);
  

    const data = result.rows;

    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

module.exports = { thaiNative };
  