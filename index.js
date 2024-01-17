const { connectDb, closeConnection } = require('./dbConnector');
const { fetchData } = require('./dataOPD');
const axios = require('axios');
const { DateData } = require('./date');
const { thaiNative } = require('./thainative')
const { otherNative } = require('./othernative')
const { admitcount } = require('./admit');
const { thaiadmit } = require('./thaiadmit')
const { otheradmit } = require('./otheradmit')

const LINE_NOTIFY_TOKEN = 'OVXf49cca6TBXLhGpQe4KNNrFM8peQOmuV8WpUn5nw0'; // Replace with your Line Notify token

async function sendLineNotify(message) {
  const url = 'https://notify-api.line.me/api/notify';

  try {
    const response = await axios.post(url, `message=${message}`, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${LINE_NOTIFY_TOKEN}`,
      },
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
    const thaiNativecount = await thaiNative(connection);
    const otherNativecount = await otherNative(connection);
    const inpatientAdmissions = await admitcount(connection);
    const thaiadmitcount = await thaiadmit(connection);
    const otheradmitcount = await otheradmit(connection);




    // Get the current date using the DateData function
    const currentDate = await DateData();  // เพิ่ม await ที่นี่

    console.log('Service recipient', data);
    console.log('thaiNativecount', thaiNativecount);
    console.log('otherNativecount', otherNativecount);
    console.log('Inpatient Admissions:', inpatientAdmissions);
    console.log('thaiadmitcount:', thaiadmitcount);
    console.log('otheradmitcount:', otheradmitcount);



    // Send Line Notify message with date and service recipient count
    await sendLineNotify(`โรงบาลแม่สอด
${currentDate}
ข้อมูล ณ เวลา 16:00 น.
---------------------------------
ผู้มารับบริการ(รวม) ${data} ราย
ผู้มารับบริการ(คนไทย) ${thaiNativecount} ราย
ผู้มารับบริการ(ต่างชาติ) ${otherNativecount} ราย
ผู้ป่วยในที่นอน รพ.(รวม) ${inpatientAdmissions}  ราย
ผู้ป่วยในที่นอน รพ.(คนไทย) ${thaiadmitcount} ราย
ผู้ป่วยในที่นอน รพ.(ต่างชาติ) ${otheradmitcount} ราย
ผู้ป่วยในจำหน่าย(รวม)   ราย
ผู้ป่วยในจำหน่าย(คนไทย)   ราย
ผู้ป่วยในจำหน่าย(ต่างชาติ)   ราย
ผู้ป่วยนอกเสียชีวิต(รวม)   ราย
ผู้ป่วยนอกเสียชีวิต(คนไทย)   ราย
ผู้ป่วยนอกเสียชีวิต(ต่างชาติ)   ราย
ผู้ป่วยนอก Refer in   ราย
ผู้ป่วยนอก Refer out   ราย`);

  } catch (error) {
    console.error('Error in main function:', error);
  } finally {
    await closeConnection(connection);
  }
}


main();
