const { getPool } = require("./connection");
const db = getPool();

function category() {
  return new Promise((resolve) => {
    db.any(`SELECT * FROM category`).then((result) => {
      resolve({
        header: ["ID категорії", "Показник"],
        data: result,
      });
    });
  });
}

function measured_unit() {
  return new Promise((resolve) => {
    db.any(`SELECT * FROM measured_unit`).then((result) => {
      resolve({
        header: ["ID одиниці", "Назва", "Вимірюється в"],
        data: result,
      });
    });
  });
}

function station() {
  return new Promise((resolve) => {
    db.any(
      `SELECT s.id_station, city, name, status, id_server, id_saveecobot, location FROM station as s inner join coordinates as c ON s.id_station = c.id_station`
    ).then((result) => {
      resolve({
        header: [
          "ID станції",
          "Місто",
          "Вулиця",
          "Статус",
          "ID сервера",
          "ID saveecobot",
          "Координати",
        ],
        data: result,
      });
    });
  });
}

function mqtt_server() {
  return new Promise((resolve) => {
    db.any(`SELECT * FROM mqtt_server`).then((result) => {
      resolve({
        header: ["ID сервера", "URL", "Статус"],
        data: result,
      });
    });
  });
}

function optimal_value() {
  return new Promise((resolve) => {
    db.any(
      `
    SELECT
        c.Designation AS Category_Designation,
        mu.Title AS Measured_Unit_Title,
        ov.Bottom_Border AS Optimal_Bottom_Border,
        ov.Upper_Border AS Optimal_Upper_Border
    FROM Category c
        INNER JOIN Optimal_Value ov ON c.ID_Category = ov.ID_Category
        INNER JOIN Measured_Unit mu ON ov.ID_Measured_Unit = mu.ID_Measured_Unit;`
    ).then((result) => {
      resolve({
        header: [
          "Стан",
          "Назва",
          "Оптимальне верхнє значення",
          "Оптимальне нижнє значення",
        ],
        data: result,
      });
    });
  });
}

function mqtt_unit() {
  return new Promise((resolve) => {
    db.any(
      `SELECT name, title, message FROM mqtt_unit AS mq INNER JOIN station AS s ON  mq.id_station = s.id_station INNER JOIN measured_unit AS m ON m.id_measured_unit = mq.id_measured_unit`
    ).then((result) => {
      resolve({
        header: ["Назва станції", "Показник", "Повідомлення"],
        data: result,
      });
    });
  });
}

function measurement(offset) {
  return new Promise((resolve) => {
    if (!offset) offset = 0;
    else offset = offset * 1000;
    db.any(
      `SELECT ROW_NUMBER() OVER (ORDER BY m.time ASC) AS row_number,
      s.city,
      s.name,
      mu.title,
      m.value,
      mu.unit,
      m.time
      FROM measurement m
      INNER JOIN measured_unit AS mu ON mu.id_measured_unit = m.id_measured_unit
      INNER JOIN station s ON s.id_station = m.id_station
      ORDER BY m.time ASC
      LIMIT 1000 OFFSET ${offset};
`
    ).then((result) => {
      resolve({
        header: [
          "№",
          "Місто",
          "Вулиця",
          "Показчик",
          "Значення",
          "Вимірюється в",
          "Час",
        ],
        data: result,
      });
    });
  });
}

function measurement_pagination() {
  return new Promise((resolve) => {
    db.any(`SELECT COUNT(*) FROM measurement;`).then((result) => {
      resolve(result);
    });
  });
}

module.exports = {
  station,
  category,
  measured_unit,
  mqtt_server,
  optimal_value,
  mqtt_unit,
  measurement,
  measurement_pagination,
};
