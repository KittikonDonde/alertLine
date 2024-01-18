async function thaiforward(connection) {
    try {
        const result = await connection.execute(`
        SELECT COUNT(DISTINCT I.HN)
FROM IPDTRANS I
JOIN PATIENTS P ON I.HN = P.HN
WHERE I.DATEADMIT = TRUNC(SYSDATE) 
AND I.DS_STATUS_ID IS NOT NULL 
AND p.native_id = 99
    `);
        const data = result.rows;

        return data;
    } catch (error) {
        console.error('Error fetching data admit:', error);
        throw error;
    }
}

module.exports = { thaiforward };
