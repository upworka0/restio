'user strict';

import config from "../config";

var mysql = require('mysql')
const dbConfig = config.get('db');

const connection =  mysql.createConnection({...dbConfig})
connection.connect((err) => {
  if(err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
  console.log('connected as id ' + connection.threadId);
})

export default connection