import ExcelJS from "exceljs";
const workbook = new ExcelJS.Workbook();
const sheet = workbook.addWorksheet("Sheet1");
sheet.columns = [
  { header: "Name", key: "title" },
  { header: "ISBN13", key: "isbn13" },
  { header: "Image", key: "image" },
  { header: "Authors", key: "authors" },
  { header: "covertype", key: "binding" },
  { header: "weight", key: "weight" },
  { header: "price", key: "price" },
  { header: "inventory", key: "inventory" },
  { header: "location", key: "location" },
  { header: "ratings", key: "ratings" },
  { header: "description", key: "description" },
  { header: "genres", key: "genres" },
  { condition: "conditon", key: "condition" },
];
sheet.addRow({
  name: title,
  isbn13: isbn13,
  image: image,
  authors: authors,
  covertype: binding,
  weight: weight,
  price: price,
  inventory: inventory,
  location: location,
  rating: ratings,
  description,
  genres: genres,
  condition: condition,
});
workbook.xlsx.writeFile("testing.xlsx").then(function () {
  // Success Message
  console.log("Data Saved");
});
