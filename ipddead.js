async function dead(connection) {
    try {
        const result = await connection.execute(`
        SELECT  COUNT(DISTINCT HN)
FROM IPDTRANS 
WHERE DS_STATUS_ID = '9'
AND TRUNC(datedisch) = TRUNC(SYSDATE)
    `);
        const data = result.rows;

        return data;
    } catch (error) {
        console.error('Error fetching data admit:', error);
        throw error;
    }
}

module.exports = { dead };
