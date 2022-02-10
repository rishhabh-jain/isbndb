
var xlsx = require("xlsx");

var wb = xlsx.readFile('exportdata.xlsx');
var ws = wb.Sheets["exportdata"];
console.log(ws);

const csvData = [
    {
      name: 'title',
      isbn13: 'isbn13',
      image: 'image',
      authors: 'authors',
      covertype: 'binding',
      weight: 'weight',
    //   price: price,
    //   inventory: inventory,
    //   location: location,
    //   rating: ratings,
    //   description,
    //   genres: genres,
    //   condition: condition,
    },
  ];

// xlsx.writeFile(wb, 'exportdata.xlsx') 
xlsx.utils.sheet_add_json(ws, [
    ["new data", 1, 2, 3]
  ], {origin: -1});
xlsx.writeFile(wb, 'exportdata.xlsx') 
// sheet.columns = [
    //   { header: "Name", key: "title" },
    //   { header: "ISBN13", key: "isbn13" },
    //   { header: "Image", key: "image" },
    //   { header: "Authors", key: "authors" },
    //   { header: "covertype", key: "binding" },
    //   { header: "weight", key: "weight" },
    //   { header: "price", key: "price" },
    //   { header: "inventory", key: "inventory" },
    //   { header: "location", key: "location" },
    //   { header: "ratings", key: "ratings" },
    //   { header: "description", key: "description" },
    //   { header: "genres", key: "genres" },
    //   { condition: "conditon", key: "condition" },
    // ];
