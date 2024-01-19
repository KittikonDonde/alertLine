async function thaiOPDdead(connection) {
    try {
        const result = await connection.execute(`
        SELECT COUNT(DISTINCT O.OPD_NO)
        FROM OPDS O
        JOIN PATIENTS P ON o.pat_run_hn = p.run_hn
        WHERE TRUNC(o.OPD_DATE) = TRUNC(SYSDATE)
        AND O.OPD_DISCHARGE_STATUSES IN ('04', '05', '06')
        AND P.NATIVE_ID = 99
    `);
        const data = result.rows;

        return data;
    } catch (error) {
        console.error('Error fetching data admit:', error);
        throw error;
    }
}

module.exports = { thaiOPDdead };
