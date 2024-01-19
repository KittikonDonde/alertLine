async function opddead(connection) {
    try {
        const result = await connection.execute(`
        SELECT COUNT(DISTINCT OPD_NO)
FROM OPDS
WHERE TRUNC(OPD_DATE) = TRUNC(SYSDATE)
AND OPD_DISCHARGE_STATUSES IN ('04', '05', '06')
    `);
        const data = result.rows;

        return data;
    } catch (error) {
        console.error('Error fetching data admit:', error);
        throw error;
    }
}

module.exports = { opddead };
