const { connectDb, closeConnection } = require('./dbConnector');
const { fetchData } = require('./dataFetcher');
const axios = require('axios');

const LINE_NOTIFY_TOKEN = 'OVXf49cca6TBXLhGpQe4KNNrFM8peQOmuV8WpUn5nw0'; // แทนที่ด้วย Line Notify token ของคุณ

async function sendLineNotify(message) {
  const url = 'https://notify-api.line.me/api/notify';

  try {
    const response = await axios.post(url, `message=${message}`, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Bearer ${LINE_NOTIFY_TOKEN}`
      }
    });

    if (response.status === 200) {
      console.log('Line Notify sent successfully');
    } else {
      console.error('Error sending Line Notify. Status:', response.status);
    }
  } catch (error) {
    console.error('Error sending Line Notify:', error.message);
  }
}

async function main() {
  let connection;

  try {
    connection = await connectDb();
    const data = await fetchData(connection);

    console.log('Fetched data:', data);

    // ส่งข้อมูลไปแจ้งเตือนผ่าน Line Notify
    await sendLineNotify(`ผู้มารับบริการ(รวม) ${data} ราย`);
  } catch (error) {
    console.error('Error in main function:', error);
  } finally {
    await closeConnection(connection);
  }
}

main();
