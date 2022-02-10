
var xlsx = require("xlsx");

var wb = xlsx.readFile('exportdata.csv');
var ws = wb.Sheets("Sheet1");
console.log(ws);
