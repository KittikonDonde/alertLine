async function admitcount(connection) {
    try {
        const result = await connection.execute(`
        SELECT COUNT(DISTINCT HN)
        FROM IPDTRANS 
        WHERE DATEDISCH IS NULL
    `);
        const data = result.rows;

        return data;
    } catch (error) {
        console.error('Error fetching data admit:', error);
        throw error;
    }
}

module.exports = { admitcount };
