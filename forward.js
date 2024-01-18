async function forward(connection) {
    try {
        const result = await connection.execute(`
        SELECT COUNT(DISTINCT HN)
FROM IPDTRANS 
WHERE DATEADMIT=TRUNC(SYSDATE) 
AND DS_STATUS_ID IS NOT NULL
    `);
        const data = result.rows;

        return data;
    } catch (error) {
        console.error('Error fetching data admit:', error);
        throw error;
    }
}

module.exports = { forward };
