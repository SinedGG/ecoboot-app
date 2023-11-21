const { getPool } = require("./connection");
const db = getPool();

function chart1(start, end) {
  return new Promise((resolve) => {
    db.any(
      `
    SELECT * FROM GetAirQualityData('${start}', '${end}');
    `
    ).then((result) => {
      resolve({
        header: ["Область", "PM 2.5", "PM 10"],
        data: result,
      });
    });
  });
}

function chart2(station) {
  return new Promise((resolve) => {
    db.any(`SELECT * FROM get_pm25_counts('${station}');`).then((result) => {
      resolve({
        header: ["Показник", "Шкідливий", "Дуже шкідливий"],
        data: result,
      });
    });
  });
}

function chart3() {
  return new Promise((resolve) => {
    db.any(`SELECT * FROM SO2_Measurement_View;`).then((result) => {
      resolve({
        header: [
          "Показник",
          "Відмінний",
          "Добрий",
          "Помірний",
          "Поганий",
          "Дуже поганий",
          "Жахливий",
        ],
        data: result,
      });
    });
  });
}
function chart4() {
  return new Promise((resolve) => {
    db.any(`SELECT * FROM СO_Measurement_View;`).then((result) => {
      resolve({
        header: [
          "Показник",
          "Відмінний",
          "Добрий",
          "Помірний",
          "Поганий",
          "Дуже поганий",
          "Жахливий",
        ],
        data: result,
      });
    });
  });
}
module.exports = { chart1, chart2, chart3, chart4 };
