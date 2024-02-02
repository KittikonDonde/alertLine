async function thaiadmit(connection) {
    try {
        const result = await connection.execute(`
        SELECT COUNT( I.HN)
FROM IPDTRANS I
JOIN PATIENTS P ON I.HN = P.HN
WHERE I.DATEDISCH IS NULL
AND p.native_id = 99
    `);
        const data = result.rows;

        return data;
    } catch (error) {
        console.error('Error fetching data admit:', error);
        throw error;
    }
}

module.exports = { thaiadmit };
