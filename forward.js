async function forward(connection) {
    try {
        const result = await connection.execute(`
        select COUNT(DISTINCT HN)
from ipdtrans
where TRUNC(datedisch) = TRUNC(SYSDATE)
    `);
        const data = result.rows;

        return data;
    } catch (error) {
        console.error('Error fetching data admit:', error);
        throw error;
    }
}

module.exports = { forward };
