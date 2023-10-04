const { getPool } = require("./connection");
const db = getPool();

function station_list() {
  return new Promise((resolve) => {
    db.any(`SELECT id_station, name FROM station;`).then((result) => {
      resolve(result);
    });
  });
}

function station() {
  return new Promise((resolve) => {
    db.any(
      `SELECT
    MAX(S.Name) AS Station_Name,
    M.Time AS Connection_Date,
    STRING_AGG(U.Title, ', ') AS Provided_Parameters
FROM
    Station AS S
LEFT JOIN (
    SELECT
        ID_Station,
        MIN(Time) AS Time
    FROM
        Measurement
    GROUP BY
        ID_Station
) AS M ON S.ID_Station = M.ID_Station
LEFT JOIN (
    SELECT DISTINCT
        ID_Station,
        ID_Measured_Unit
    FROM
        Measurement
) AS MU ON S.ID_Station = MU.ID_Station
LEFT JOIN Measured_Unit AS U ON MU.ID_Measured_Unit = U.ID_Measured_Unit
GROUP BY
    S.ID_Station, M.Time
ORDER BY
    Station_Name;
`
    ).then((result) => {
      resolve({
        header: ["Станція", "Дата підключення", "Надає параметри"],
        data: result,
      });
    });
  });
}
function station2(id, start, end) {
  return new Promise((resolve) => {
    db.any(
      `SELECT
    MU.Title AS Parameter_Name,
    MAX(M.Value) AS Max_Value,
    MIN(M.Value) AS Min_Value,
    AVG(M.Value) AS Avg_Value
FROM
    Measurement M
INNER JOIN
    Station S ON M.ID_Station = S.ID_Station
INNER JOIN
    Measured_Unit MU ON M.ID_Measured_Unit = MU.ID_Measured_Unit
WHERE
    M.ID_Station = '${id}'
    AND M.Time BETWEEN '${start}' AND '${end}'
GROUP BY
    M.ID_Station, S.City, S.Name, MU.Title
ORDER BY
    M.ID_Station, MU.Title;
`
    ).then((result) => {
      resolve({
        header: [
          "Назва параметру",
          "Максимальне значення",
          "Мінімальне значення",
          "Середнє значення",
        ],
        data: result,
      });
    });
  });
}

module.exports = {
  station,
  station2,
  station_list,
};
