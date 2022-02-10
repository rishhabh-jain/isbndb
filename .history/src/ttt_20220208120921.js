
var xlsx = require("xlsx");

var wb = xlsx.readFile('exportdata.xlsx');
var ws = wb.Sheets["exportdata"];
console.log(ws);
