const axios = require("axios");

let stockCode = "0056";
let today = "20211017";
let format = "json";

const doGetData = async () => {
  try {
    const res = await axios.get(
      `https://www.twse.com.tw/exchangeReport/STOCK_DAY`,
      {
        params: {
          response: format,
          data: today,
          stockNo: stockCode,
        },
      }
    );
    console.log(res.data);
  } catch (err) {
    console.error(err);
  }
};

doGetData();