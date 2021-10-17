const axios = require("axios");
const moment = require("moment");
const mysql = require("mysql");
require('dotenv').config();
//連線資料庫
var connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

connection.connect();

function insertStockData(stockData) {
  // 1. 建立 new Promise 物件
  // 2. 建構式傳入執行者 (本身也是一個函式，而且有兩個參數 (resolve, reject))
  return new Promise((resolve, reject) => {
    // 3. 搬入非同步工作
    connection.query(
      // IGNORE 要使用時，要先判斷是不是需要
      "INSERT IGNORE INTO stock_data (stock_no, date, deal, amount, count) VALUES(?, ?, ?, ?, ?);", //sql語法
      stockData,
      (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      }
    );
  });
}




async function getStockData() {
  let today = moment().format("YYYYMMDD"); // 自動給當天的日期
  let format = "json";
  let stockCode = "0056";

  try {
    // 使用讀檔方式來存 stockCode

    let res = await axios.get(
      "https://www.twse.com.tw/exchangeReport/STOCK_DAY",
      {
        params: {
          response: format,
          date: today,
          stockNo: stockCode,
        },
      }
    );
    // console.log(res.data);
    let firstItem = res.data.data[0];
    //console.log(firstItem);
    // 0 1 2 8

    let stockData = [
      stockCode,
      firstItem[0],
      firstItem[1],
      firstItem[2],
      firstItem[8],
    ];

    let results = await insertStockData(stockData);
    console.log(results);
  } catch (err) {
    console.error(err);
  } finally {
    connection.end();
  }
}


getStockData();
