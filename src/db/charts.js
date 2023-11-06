const { getPool } = require("./connection");
const db = getPool();

function chart1(start, end) {
  return new Promise((resolve) => {
    db.any(
      `
    SELECT
    s.City AS Область,
    MAX(CASE WHEN mu.Title = 'PM2.5' THEN m.Value END) AS PM2_5,
    MAX(CASE WHEN mu.Title = 'PM10' THEN m.Value END) AS PM10
FROM
    Measurement m
JOIN
    Station s ON m.ID_Station = s.ID_Station
JOIN
    measured_unit mu ON m.ID_Measured_Unit = mu.ID_Measured_Unit
WHERE
    m.Time BETWEEN '${start}' AND '${end}'
GROUP BY
    s.City
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
    db.any(
      `
      SELECT
      'Показник PM2.5' as title,
    COUNT(CASE WHEN avg_value BETWEEN 30 AND 55 THEN 1 ELSE NULL END) AS count_between_30_and_55,
    COUNT(CASE WHEN avg_value BETWEEN 55 AND 110 THEN 1 ELSE NULL END) AS count_between_55_and_110
FROM (
    SELECT
        DATE(Time) AS measurement_date,
        ID_Station,
        AVG(Value) AS avg_value
    FROM Measurement
    WHERE ID_Station = '${station}' AND ID_Measured_Unit = '3'
    GROUP BY measurement_date, ID_Station
) AS subquery;

      
    `
    ).then((result) => {
      resolve({
        header: ["Показник", "Шкідливий", "Дуже шкідливий"],
        data: result,
      });
    });
  });
}

function chart3() {
  return new Promise((resolve) => {
    db.any(
      `
      SELECT
      'SO2' as title, 
        SUM(CASE WHEN value BETWEEN 0 AND 20 THEN 1 ELSE 0 END) AS good,
        SUM(CASE WHEN value BETWEEN 20 AND 50 THEN 1 ELSE 0 END) AS moderate,
      SUM(CASE WHEN value BETWEEN 50 AND 100 THEN 1 ELSE 0 END) AS poor,
      SUM(CASE WHEN value BETWEEN 100 AND 200 THEN 1 ELSE 0 END) AS verypoor
    FROM Measurement
    WHERE ID_Measured_Unit = '13';
      
    `
    ).then((result) => {
      resolve({
        header: [
          "Показник",
          "Добрий",
          "Задовільний",
          "Поганий",
          "Дуже поганий",
        ],
        data: result,
      });
    });
  });
}
function chart4() {
  return new Promise((resolve) => {
    db.any(
      `
      SELECT
      'CO' as title, 
        SUM(CASE WHEN value BETWEEN 0 AND 9 THEN 1 ELSE 0 END) AS good,
        SUM(CASE WHEN value BETWEEN 9 AND 25 THEN 1 ELSE 0 END) AS moderate,
      SUM(CASE WHEN value BETWEEN 25 AND 100 THEN 1 ELSE 0 END) AS poor
    FROM Measurement
    WHERE ID_Measured_Unit = '12';
      
    `
    ).then((result) => {
      resolve({
        header: ["Показник", "Добрий", "Задовільний", "Поганий"],
        data: result,
      });
    });
  });
}
module.exports = { chart1, chart2, chart3, chart4 };
