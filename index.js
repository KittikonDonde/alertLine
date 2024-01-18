const { connectDb, closeConnection } = require('./dbConnector');
const { fetchData } = require('./dataOPD');
const axios = require('axios');
const { DateData } = require('./date');
const { thaiNative } = require('./thainative')
const { otherNative } = require('./othernative')
const { admitcount } = require('./admit');
const { thaiadmit } = require('./thaiadmit')
const { otheradmit } = require('./otheradmit')
const { forward } = require('./forward')
const {thaiforward} =require('./thaiforward')
const {otherforward} = require('./otherforward')
const {dead} = require('./ipddead')
const {thaiIPDdead} = require('./thaiIPDdead')
const {otherIPDdead} = require('./otherIPDdead')
const {opddead} = require('./opddead')
  
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
    const forwardcount = await forward(connection);
    const thaiforwardcount = await thaiforward(connection);
    const otherforwardcount = await otherforward(connection);
    const ipddeadcount = await dead(connection);
    const thaiipddeadcount = await thaiIPDdead(connection);opddead
    const otheripddeadcount = await otherIPDdead(connection);
    const opddeadcount = await opddead(connection);





    // Get the current date using the DateData function
    const currentDate = await DateData();  // เพิ่ม await ที่นี่

    console.log('Service recipient', data);
    console.log('thaiNativecount', thaiNativecount);
    console.log('otherNativecount', otherNativecount);
    console.log('Inpatient Admissions:', inpatientAdmissions);
    console.log('thaiadmitcount:', thaiadmitcount);
    console.log('otheradmitcount:', otheradmitcount);
    console.log('forwardcount:', forwardcount);
    console.log('thaiforwardcount:', thaiforwardcount);
    console.log('otherforwardcount:', otherforwardcount);
    console.log('opddeadcount:', opddeadcount);




    console.log('ipddeadcount:', ipddeadcount);
    console.log('thaiipddeadcount:', thaiipddeadcount);
    console.log('otheripddeadcount:', otheripddeadcount);







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
ผู้ป่วยในจำหน่าย(รวม) ${forwardcount} ราย
ผู้ป่วยในจำหน่าย (คนไทย) ${thaiforwardcount} ราย
ผู้ป่วยในจำหน่าย(ต่างชาติ) ${otherforwardcount} ราย
ผู้ป่วยนอกเสียชีวิต(รวม) ${opddeadcount} ราย
ผู้ป่วยนอกเสียชีวิต(คนไทย)   ราย
ผู้ป่วยนอกเสียชีวิต(ต่างชาติ)   ราย
ผู้ป่วยในเสียชีวิต(รวม) ${ipddeadcount} ราย
ผู้ป่วยในเสียชีวิต(คนไทย) ${thaiipddeadcount} ราย
ผู้ป่วยในเสียชีวิต(ต่างชาติ) ${otheripddeadcount} ราย
ผู้ป่วยนอก Refer in   ราย
ผู้ป่วยนอก Refer out   ราย`);

  } catch (error) {
    console.error('Error in main function:', error);
  } finally {
    await closeConnection(connection);
  }
}


main();
