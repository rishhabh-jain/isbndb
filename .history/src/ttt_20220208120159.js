
import xlsx from "xlsx";

var wb = xlsx.readFile('exportdata.xlsx');
var ws = wb.Sheets("Sheet1");
console.log(ws);