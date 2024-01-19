async function thaiIPDdead(connection) {
    try {
        const result = await connection.execute(`
        SELECT COUNT(DISTINCT I.HN)
FROM IPDTRANS I
JOIN PATIENTS P ON I.HN = P.HN
WHERE I.DS_STATUS_ID = '9'
AND TRUNC(I.datedisch) = TRUNC(SYSDATE)
AND P.native_id = 99
    `);
        const data = result.rows;

        return data;
    } catch (error) {
        console.error('Error fetching data admit:', error);
        throw error;
    }
}

module.exports = { thaiIPDdead };
