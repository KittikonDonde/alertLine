const { connectDb, closeConnection } = require('./dbConnector');
const { fetchData } = require('./dataFetcher');
const axios = require('axios');

const LINE_NOTIFY_TOKEN = 'Q2YRD3UOri3KMdsMLKDhZPUyknG6fxkpIJq4S0guayx'; // แทนที่ด้วย Line Notify token ของคุณ

async function sendLineNotify(message) {
  const url = 'https://notify-api.line.me/api/notify';
  
  try {
    await axios.post(url, `message=${message}`, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Bearer ${LINE_NOTIFY_TOKEN}`
      }
    });

    console.log('Line Notify sent successfully');
  } catch (error) {
    console.error('Error sending Line Notify:', error);
  }
}

async function fetchDataAndSendNotify() {
  let connection;

  try {
    connection = await connectDb();
    const data = await fetchData(connection);

    console.log('Fetched data:', data);

    // แสดงข้อมูลในรูปแบบที่ไม่มีวงเล็บ
    const formattedData = data[0][0];

    // ส่งข้อมูลไปแจ้งเตือนผ่าน Line Notify
    await sendLineNotify(`ผู้มารับบริการ(รวม) ${data} ราย`);
  } catch (error) {
    console.error('Error in fetchDataAndSendNotify function:', error);
  } finally {
    await closeConnection(connection);
  }
}

// กำหนดให้ทำงานทุก 13:35 น.
setInterval(async () => {
  const now = new Date();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();

  if (currentHour === 13 && currentMinute === 40) {
    console.log('Running fetchDataAndSendNotify at 13:35...');
    await fetchDataAndSendNotify();
  }
}, 60000); // 60000 มีนาทีเท่ากับ 1 นาที
