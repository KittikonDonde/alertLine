async function thaiIPDdead(connection) {
    try {
        const result = await connection.execute(`
        SELECT COUNT(DISTINCT I.HN)
FROM IPDTRANS I
JOIN PATIENTS P ON I.HN = P.HN
WHERE I.DS_STATUS_ID = '9'
  AND I.DATEADMIT = TRUNC(SYSDATE) 
  AND P.NATIVE_ID = '99'
    `);
        const data = result.rows;

        return data;
    } catch (error) {
        console.error('Error fetching data admit:', error);
        throw error;
    }
}

module.exports = { thaiIPDdead };
