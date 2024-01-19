async function referoutOPD(connection) {
    try {
        const result = await connection.execute(`
        SELECT COUNT(*) AS opdipd_count
FROM PATIENTS_REFER_HX
WHERE opdipd = 'O'
AND refer_out_datetime IS NOT NULL
AND TRUNC(refer_out_datetime) = TRUNC(SYSDATE)
    `);
        const data = result.rows;

        return data;
    } catch (error) {
        console.error('Error fetching data admit:', error);
        throw error;
    }
}

module.exports = { referoutOPD };
